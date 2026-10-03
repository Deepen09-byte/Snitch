import express from "express";
import {authSeller} from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.contorller.js";

const router = express.Router();

router.post("/", authSeller, createProduct);

export default router;