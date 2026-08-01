import express from "express";
import roadmap from "../data/roadmap.js";

const router = express.Router();

router.get("/", (req, res)=>{
    res.json(roadmap);
})

export default router;