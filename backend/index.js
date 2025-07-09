import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.use(
  cors({
    origin: "https://matchpulse-1.onrender.com",
  })
);

const API_URL = "https://api.football-data.org/v4/competitions";

const TOKEN = process.env.API_KEY;

app.get("/api/competitions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions",
      {
        headers: { "X-Auth-Token": TOKEN },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching competition data:", err);
    res.status(500).json({ error: "Failed to fetch competitions" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
