const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require("./modules/auth/auth.routes");
const survivorRoutes = require("./modules/survivors/survivors.routes");
const groupRoutes = require("./modules/groups/groups.routes");
const presetsRoutes = require("./modules/presets/presets.routes");
const matchesRoutes = require('./modules/matches/matches.routes');
const streakRoutes = require("./modules/streak/streak.routes");
const errorMiddleware = require("./middlewares/error.middleware");

app.get("/api/health", (req, res) => {
    console.log("Health check ping");
    res.status(200).json({ status: "ok" });
});

app.use(cors({origin: "*",}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/survivors", survivorRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/presets", presetsRoutes);
app.use('/api/matches', matchesRoutes);
app.use("/api/streak", streakRoutes);
app.use(errorMiddleware);

module.exports = app;