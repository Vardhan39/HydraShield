const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { predictStability } = require("./temporalPredictor");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Driving Stability Monitor backend" });
});

app.post("/predict-manual", (req, res) => {
  try {
    const { sequence } = req.body || {};
    if (!Array.isArray(sequence) || sequence.length === 0) {
      return res.status(400).json({ error: "sequence array is required" });
    }

    const normalizedSeq = sequence.map((s) => ({
      drift: Number(s.drift) || 0,
      speed: Number(s.speed) || 0,
      steering: Number(s.steering) || 0,
      water: Number(s.water) || 0,
    }));

    const result = predictStability(normalizedSeq);
    return res.json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error in /predict-manual:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

function simulateVideoFeatureExtraction(filePath) {
  // Advanced deterministic pseudo-feature extraction
  const stats = fs.statSync(filePath);
  const nameHash = path.basename(filePath).length;
  const sizeMB = stats.size / (1024 * 1024);
  
  // Use file metadata to simulate specific archetypes (e.g. large file = heavy data)
  const rainIntensity = (sizeMB * nameHash) % 4 === 0 ? 1 : (sizeMB % 3 === 0 ? 8 : 2);
  const speedBaseline = 3 + (sizeMB % 5);
  
  const sequence = [];
  for (let t = 0; t < 5; t += 1) {
    // Simulate temporal variance: features drift slightly over time
    sequence.push({
      drift: clamp(2 + (nameHash % 3) + Math.sin(t) * 0.5, 0, 10),
      speed: clamp(speedBaseline + Math.cos(t) * 0.8, 0, 10),
      steering: clamp(1 + (sizeMB % 4) + Math.sin(t * 0.5) * 1.2, 0, 10),
      water: clamp(rainIntensity + (t * 0.2), 0, 10),
    });
  }
  return sequence;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

app.post("/analyze-video", upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "video file is required" });
    }

    const videoPath = req.file.path;

    const sequence = simulateVideoFeatureExtraction(videoPath);
    const result = predictStability(sequence);

    // Optionally clean up the uploaded file
    fs.unlink(videoPath, () => {});

    return res.json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error in /analyze-video:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on http://localhost:${port}`);
});

