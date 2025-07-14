import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

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

let accessToken = null;

app.post("/create_link_token", async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: "user-123",
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
  const publicToken = req.body.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error("Token exchange error:", error.response.data);
    res.status(500).json({ error: error.message });
  }
});

app.get("/transactions", async (req, res) => {
  if (!accessToken) {
    return res.status(400).json({ error: "No access token!" });
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

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
