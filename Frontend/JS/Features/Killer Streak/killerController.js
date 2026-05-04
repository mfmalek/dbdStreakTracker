import { createBaseController } from "../Core Streak/baseController.js";
import { sharedUI } from "../Core Streak/sharedUI.js";
import { killerUI } from "./killerUI.js";

export const killerController = createBaseController({
    renderTable: killerUI.renderTable,
    renderStats: sharedUI.renderStats
});