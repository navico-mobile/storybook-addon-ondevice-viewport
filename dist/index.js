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
var addons_1 = __importStar(require("@storybook/addons"));
var Container_1 = __importDefault(require("./Container"));
var constants_1 = __importDefault(require("./constants"));
function getInitialViewPort(parameters) {
    if (parameters.defaultViewport && parameters.viewports) {
        return parameters.viewports[parameters.defaultViewport];
    }
    return undefined;
}
exports.withViewports = addons_1.makeDecorator({
    name: 'withViewports',
    parameterName: 'viewports',
    skipIfNoParametersOrOptions: false,
    allowDeprecatedUsage: true,
    wrapper: function (getStory, context, _a) {
        var options = _a.options, parameters = _a.parameters;
        var data = parameters || options || {};
        if (data.viewports || data.showBoarder || data.defaultViewport || data.disable) {
            //if this parameter are different, set to viewport panel
            addons_1.default.getChannel().emit(constants_1.default.SET, data);
        }
        var initialViewPort = getInitialViewPort(data);
        return (React.createElement(Container_1.default, { channel: addons_1.default.getChannel(), showBoarder: data.showBoarder, initialViewport: initialViewPort }, getStory(context)));
    },
});
