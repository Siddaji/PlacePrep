import express from "express";
import problems from "../data/problems.js";

const router = express.Router();

router.get("/", (req,res) => {
    res.json(problems);

})

export default router;