import express from "express";
import { addGoal, getGoal } from "../controllers/Goal.js";

const router = express.Router();

router.post("/goals", addGoal);
router.get("/goals", getGoal);

export default router;
