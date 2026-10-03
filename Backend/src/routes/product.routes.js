import express from "express";
import {authSeller} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authSeller, )

export default router;