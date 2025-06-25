import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import passport from "passport";
import axios from "axios";
import cors from "cors";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import bcryptjs from "bcryptjs";

const app = express();
const port = 4000;
dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "db.zqlawsojpflqcrfyxeac.supabase.co",
  database: "postgres",
  password: "H0nuPWF0gcVLFohq",
  port: "5432",
});
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/budget", async (req, res) => {
  const total = req.body.total;
  const liabilities = req.body.liabilities;
  const targetSavings = req.body.targetSavings;
  const days = req.body.days;
  const budgetPerDay = Math.floor((total - targetSavings - liabilities) / days);
  const userId = req.body.id;
  try {
    await db.query(
      "INSERT INTO budget_infos (userid, total, liabilities, target_savings, days, budgetPerDay) VALUES ($1, $2, $3, $4, $5, $6)",
      [userid, total, liabilities, targetSavings, days, budgetPerDay]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log("Error in data input! " + err);
    res.sendStatus(400);
  }
});

app.post("/daily", async (req, res) => {
  const userid = req.body.id;
  const day = req.body.day;
  const expense = req.body.expense;
  try {
    await db.query(
      "INSERT INTO perdayexps (userid, day, expenses) VALUES ($1, $2, $3)",
      [userid, day, expense]
    );
    const result = await db.query(
      "SELECT * FROM budget_infos WHERE userid = $1",
      [userid]
    );
    if (result.rows.length == 0) {
      return res.status(404).send("Budget not found!");
    }
    const budget = result.rows[0];
    const total = budget.total - expense;
    const days = budget.days - 1;
    if (days <= 0) {
      return res.status(400).send("No more days left in budget");
    }
    const budgetPerDay = Math.floor(
      (total - budget.target_savings - budget.liabilities) / days
    );
    await db.query(
      "UPDATE budget_infos SET total = $1, liabilities = $2, target_savings = $3, days = $4, budgetPerDay = $5 WHERE userid = $6",
      [
        total,
        budget.liabilities,
        budget.target_savings,
        days,
        budgetPerDay,
        budget.userid,
      ]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log("Error in data input! " + err);
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
