import express from "express";
import systemDesignTopics from "../data/systemDesign.js";

const router = express.Router();

router.get("/", (req, res) =>{
    res.json(systemDesignTopics);
})

export default router;