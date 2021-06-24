"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var addons_1 = require("@storybook/addons");
var constants_1 = require("./constants");
var ViewportPanel_1 = __importDefault(require("./ViewportPanel"));
addons_1.addons.register(constants_1.ADDON_ID, function (api) {
    var channel = addons_1.addons.getChannel();
    addons_1.addons.addPanel(constants_1.PANEL_ID, {
        title: 'viewport',
        render: function (_a) {
            var active = _a.active;
            return React.createElement(ViewportPanel_1.default, { channel: channel, api: api, active: active });
        },
        paramKey: constants_1.PARAM_KEY,
    });
});
