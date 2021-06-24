"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDON_ID = 'storybook/viewport';
exports.PARAM_KEY = 'viewport';
exports.PANEL_ID = exports.ADDON_ID + "/viewport-panel";
exports.default = {
    SET: exports.ADDON_ID + "/setStoryDefaultViewport",
    CHANGED: exports.ADDON_ID + "/viewportChanged",
    SHOW_BOARDER: exports.ADDON_ID + "/boarderChanged",
};
