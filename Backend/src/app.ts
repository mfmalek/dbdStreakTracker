import express from "express";
import cors from "cors";

import errorMiddleware from "./middlewares/error.middleware";

import NotFoundError from "./errors/not.found.error";

import authRoutes from "./modules/auth/auth.routes";
import groupRoutes from "./modules/groups/groups.routes";
import matchesRoutes from "./modules/matches/matches.routes";
import presetsRoutes from "./modules/presets/presets.routes";
import profileRoutes from "./modules/profile/profile.routes";
import streakRoutes from "./modules/streak/streak.routes";
import survivorRoutes from "./modules/survivors/survivors.routes";

const app = express();

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
app.use("/api/profile", profileRoutes);
app.use("/api/streak", streakRoutes);

app.use((req, res, next) => {
    next(new NotFoundError("Route not found"));
});

app.use(errorMiddleware);

export default app;