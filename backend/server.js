import express from "express";
import cors from "cors";
import problemRoutes from "./src/routes/problemRoutes.js";
import systemDesignRoutes from "./src/routes/systemDesignRoutes.js";
import subjectRoutes from "./src/routes/subjectRoutes.js";  

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

app.get("/", (req, res) => {
  res.send("PlacePrep backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});