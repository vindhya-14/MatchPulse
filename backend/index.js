import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const API_URL = "https://api.football-data.org/v4/matches";
const TOKEN = "10ad7c662a7f4613a914a9bbc8fd6627"; 

app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-Auth-Token": TOKEN },
      params: { status: "SCHEDULED" },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch match data" });
  }
});

app.listen(5000, () =>
  console.log(" Server running on http://localhost:5000")
);
