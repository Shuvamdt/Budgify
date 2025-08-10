import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { MongoClient } from "mongodb";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bcryptjs from "bcryptjs";
import { ObjectId } from "mongodb";
import GoogleStrategy from "passport-google-oauth2";

const FRONT_END_URL = "https://budgify-blue.vercel.app";
const API_URL = "https://budgify-hjq2.vercel.app";
dotenv.config();
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://budgify-blue.vercel.app",
  "https://budgify-hjq2.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const saltRounds = 10;

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(config);

const uri = process.env.MONGO_DB_CONN_STR;
const db_client = new MongoClient(uri);

try {
  await db_client.connect();
} catch (err) {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
}

app.get("/get-account-info", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ email: req.user.username, picture: req.user.profilePicture });
    console.log(req.user.profilePicture);
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const database = db_client.db("Budgify");
  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    const existingUser = await database
      .collection("users")
      .findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("User already exists! Please login with your credentials");
    }
    bcryptjs.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error hashing password");
      }
      await database.collection("users").insertOne({
        username,
        password: hash,
        accessToken: "",
      });
      const newUser = await database.collection("users").findOne({ username });
      req.login(newUser, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Login failed after registration");
        }
        return res.json({
          message: "Login successful",
          user: { username: newUser.username },
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: "Login successful",
        user: { username: user.username },
      });
    });
  })(req, res, next);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/dashboard",
  passport.authenticate("google", {
    successRedirect: `${FRONT_END_URL}/dashboard`,
    failureRedirect: `${FRONT_END_URL}/signup`,
  })
);

app.post("/create_link_token", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: "User123",
      },
      client_name: "My Test App",
      products: process.env.PLAID_PRODUCTS.split(","),
      country_codes: ["US"],
      language: "en",
    });
    res.json(response.data);
  } catch (error) {
    console.error("Link token error:", error.response.data);
    res.status(500).json({ error: error.message });
  }
});

app.post("/exchange_public_token", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const publicToken = req.body.public_token;
  try {
    const database = db_client.db("Budgify");
    const user = await database
      .collection("users")
      .findOne({ username: req.user.username });
    if (!user.accessToken) {
      const response = await client.itemPublicTokenExchange({
        public_token: publicToken,
      });
      const accessToken = response.data.access_token;
      const database = db_client.db("Budgify");
      await database
        .collection("users")
        .updateOne(
          { username: req.user.username },
          { $set: { accessToken: accessToken } }
        );
      res.json({ access_token: accessToken });
    } else {
      accessToken = user.accessToken;
      res.json({ access_token: accessToken });
    }
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/transactions", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  let accessToken;
  try {
    const database = db_client.db("Budgify");
    const user = await database
      .collection("users")
      .findOne({ username: req.user.username });
    if (!user || !user.accessToken) {
      return res.status(400).json({ error: "No access token!" });
    }
    accessToken = user.accessToken;
  } catch (err) {
    console.log(err);
  }
  const today = new Date();
  const start = new Date();

  start.setDate(today.getDate() - 90);
  const format = (d) => {
    return d.toISOString().split("T")[0];
  };
  try {
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: format(start),
      end_date: format(today),
    });
    res.json(response.data);
  } catch (error) {
    console.error("Transactions error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      res.status(200).send("Logged out successfully.");
    });
  });
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const database = db_client.db("Budgify");
      const user = await database
        .collection("users")
        .findOne({ username: username });
      if (user) {
        const storedPassword = user.password;
        bcryptjs.compare(password, storedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(null, false, { message: "User not found!" });
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/google/dashboard`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const database = db_client.db("Budgify");
        const result = await database
          .collection("users")
          .findOne({ username: profile.email });
        if (result) {
          cb(null, result);
        } else {
          await database.collection("users").insertOne({
            username: profile.email,
            password: "google",
            accessToken: "",
            profilePicture: profile.picture,
          });
          const newUser = await database
            .collection("users")
            .findOne({ username: profile.email });
          cb(null, newUser);
        }
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const database = db_client.db("Budgify");
    const user = await database
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});
app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
