import express from "express";
import problemRoutes from "./src/routes/problemRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use("/api/problems", problemRoutes);

app.get("/", (req, res) =>{
    res.send("PlacePrep is working");
});

const PORT = 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});