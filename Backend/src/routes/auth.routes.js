import { Router } from "express";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { register, login, googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", validateRegister,register );

router.post("/login", validateLogin, login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }, googleCallback));


export default router;