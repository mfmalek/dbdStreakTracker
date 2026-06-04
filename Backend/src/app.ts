import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import survivorRoutes from "./modules/survivors/survivors.routes";
import streakRoutes from "./modules/streak/streak.routes";

const app = express();

const groupRoutes = require("./modules/groups/groups.routes");
const presetsRoutes = require("./modules/presets/presets.routes");
const matchesRoutes = require("./modules/matches/matches.routes");
const NotFoundError = require("./errors/not.found.error");

app.get("/api/health", (req, res) => {
    console.log("Health check ping");
    res.status(200).json({ status: "ok" });
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/survivors", survivorRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/presets", presetsRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/streak", streakRoutes);

app.use((req, res, next) => {
    next(new NotFoundError("Route not found"));
});

app.use(errorMiddleware);

export default app;