import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import problemRoutes from "./src/routes/problemRoutes.js";
import systemDesignRoutes from "./src/routes/systemDesignRoutes.js";
import subjectRoutes from "./src/routes/subjectRoutes.js";  
import roadmapRoutes from "./src/routes/roadmapRoutes.js"; 
import companyProblemRoutes from "./src/routes/companyProblemRoutes.js";
import oopRoutes from "./src/routes/oopRoutes.js";
import osRoutes from "./src/routes/osRoutes.js";
import { OOP_MODULES } from "./src/data/oopData.js";
import { OS_MODULES } from "./src/data/osData.js";

const app = express();

// Connect Database
connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000",
    "https://place-prep-gamma.vercel.app",
    "*"
  ],
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/system-design", systemDesignRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/company-problems", companyProblemRoutes);
app.use("/api/oop-routes", oopRoutes);
app.use("/api/os-routes", osRoutes);

app.get("/", (req, res) => {
  res.send("PlacePrep backend is running");
});

app.get("/api/oop", (req, res) => {
  res.json(OOP_MODULES);
});

app.get("/api/os", (req, res) => {
  res.json(OS_MODULES);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Backend] Server running on port ${PORT}`);
});
