const express = require('express');
const cors = require('cors');

const authRoutes = require("./modules/auth/auth.routes");
const survivorRoutes = require("./modules/survivors/survivors.routes");
const presetsRoutes = require("./modules/presets/presets.routes");
const matchesRoutes = require('./modules/matches/matches.routes');
const streakRoutes = require("./modules/streak/streak.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/survivors", survivorRoutes);
app.use("/api/presets", presetsRoutes);
app.use('/api/matches', matchesRoutes);
app.use("/api/streak", streakRoutes);

module.exports = app;