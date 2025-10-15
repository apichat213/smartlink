import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
  origin: ["https://smartlink.netlify.app", "http://localhost:5500"],
  methods: ["GET", "POST"]
}));
app.use(express.json());

// ✅ เชื่อม MongoDB
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
} catch (err) {
  console.error("❌ MongoDB connection error:", err);
}

// ✅ Schema
const UrlSchema = new mongoose.Schema({
  original_url: String,
  short_code: String,
  short_url: String,
  click_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});
const Url = mongoose.model("Url", UrlSchema);

// ✅ API
app.post("/api/shorten", async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) return res.status(400).json({ error: "กรุณากรอก URL" });

  const short_code = nanoid(6);
  const short_url = `${process.env.BASE_URL}/go/${short_code}`;
  const newUrl = await Url.create({ original_url, short_code, short_url });
  const qr = await QRCode.toDataURL(short_url);
  res.json({ short_url, qr });
});

app.get("/go/:code", async (req, res) => {
  const url = await Url.findOne({ short_code: req.params.code });
  if (!url) return res.status(404).send("ไม่พบ URL");
  url.click_count++;
  await url.save();
  res.redirect(url.original_url);
});

app.get("/api/history", async (req, res) => {
  const all = await Url.find().sort({ created_at: -1 });
  res.json(all);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
