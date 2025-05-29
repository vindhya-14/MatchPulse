import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cors());

const API_URL = "https://api.football-data.org/v4/matches";
const TOKEN = process.env.API_KEY; 

app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-Auth-Token": TOKEN },
      params: { status: "SCHEDULED" },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching match data:", err);
    res.status(500).json({ error: "Failed to fetch match data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
