import express from "express";
import problemRoutes from "./src/routes/problemRoutes.js";
import systemDesignRoutes from "./src/routes/systemDesignRoutes.js"
import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://place-prep-gamma.vercel.app",  // replace with your actual Vercel URL
  ],
}));

app.use("/api/problems", problemRoutes);
app.use("/api/system-design", systemDesignRoutes); 

app.get("/", (req, res) =>{
    res.send("PlacePrep is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});