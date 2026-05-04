import { createBaseController } from "../Core Streak/baseController.js";
import { killerUI } from "./killerUI.js";

export const killerController = createBaseController({
    renderTable: killerUI.renderTable,
    renderStats: killerUI.renderStats
});