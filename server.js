import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ เชื่อม MongoDB Atlas (เปลี่ยน URI ของคุณเอง)
mongoose.connect("mongodb+srv://testdev:testdev@shorturldb.1knmb6t.mongodb.net/?retryWrites=true&w=majority&appName=shorturlDB");

// ✅ Schema
const UrlSchema = new mongoose.Schema({
  original_url: String,
  short_code: String,
  short_url: String,
  click_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});
const Url = mongoose.model("Url", UrlSchema);

// ✅ สร้าง Short URL
app.post("/api/shorten", async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) return res.status(400).json({ error: "กรุณากรอก URL" });

  const short_code = nanoid(6);
  const short_url = `http://localhost:3000/go/${short_code}`;
  const newUrl = await Url.create({ original_url, short_code, short_url });

  const qr = await QRCode.toDataURL(short_url);
  res.json({ short_url, qr });
});

// ✅ Redirect
app.get("/go/:code", async (req, res) => {
  const url = await Url.findOne({ short_code: req.params.code });
  if (!url) return res.status(404).send("ไม่พบ URL");
  url.click_count++;
  await url.save();
  res.redirect(url.original_url);
});

// ✅ History
app.get("/api/history", async (req, res) => {
  const all = await Url.find().sort({ created_at: -1 });
  res.json(all);
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
