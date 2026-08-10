import "dotenv/config";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
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

const app = express();
connectDB();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/system-design", systemDesignRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/company-problems", companyProblemRoutes);
app.use("/api/oop", oopRoutes);
app.use("/api/os", osRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));