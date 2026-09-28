import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).json({ message: "Snitch API is running" });
});

app.use("/api/auth", authRouter);

export default app;
