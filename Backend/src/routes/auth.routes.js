import { Router } from "express";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateRegister,register );

routerr.post("/login", validateLogin, login);

export default router;