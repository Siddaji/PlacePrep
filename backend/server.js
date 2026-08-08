import express from "express";
import cors from "cors";
import problemRoutes from "./src/routes/problemRoutes.js";
import systemDesignRoutes from "./src/routes/systemDesignRoutes.js";
import subjectRoutes from "./src/routes/subjectRoutes.js";  
import roadmapRoutes from "./src/routes/roadmapRoutes.js"; 
import companyProblemRoutes from "./src/routes/companyProblemRoutes.js";
import oopRoutes from "./src/routes/oopRoutes.js";
import {OOP_MODULES} from "./src/data/oopData.js";
import {OS_MODULES} from "./src/data/osData.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://place-prep-gamma.vercel.app",
  ],
}));

app.use("/api/problems", problemRoutes);
app.use("/api/system-design", systemDesignRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/company-problems", companyProblemRoutes); 

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
  console.log(`Server running on port ${PORT}`);
});