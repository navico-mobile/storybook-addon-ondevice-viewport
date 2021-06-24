"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var constants_1 = __importDefault(require("./constants"));
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
    },
    borderStyle: { borderColor: 'green', borderWidth: 1 },
});
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.onViewportChange = function (viewportString) {
            try {
                var viewport = JSON.parse(viewportString);
                console.warn("viewport changed " + JSON.stringify(viewport));
                _this.setState({ viewport: viewport });
            }
            catch (e) {
                console.error("viewport change error " + JSON.stringify(e));
            }
        };
        _this.onShowBoarderChange = function (showBoarder) {
            try {
                console.warn("viewport show boarder " + showBoarder);
                _this.setState({ showBoarder: showBoarder });
            }
            catch (e) {
                console.error("viewport boarder change error " + JSON.stringify(e));
            }
        };
        _this.hostWindow = react_native_1.Dimensions.get('window');
        var viewport = props.initialViewport || {
            name: 'default',
            styles: { width: _this.hostWindow.width, height: _this.hostWindow.height },
            type: 'other',
        };
        var showBoarder = props.showBoarder || false;
        _this.state = { viewport: viewport, showBoarder: showBoarder };
        return _this;
    }
    Container.prototype.componentDidMount = function () {
        var channel = this.props.channel;
        channel.on(constants_1.default.CHANGED, this.onViewportChange);
        channel.on(constants_1.default.SHOW_BOARDER, this.onShowBoarderChange);
    };
    Container.prototype.componentWillUnmount = function () {
        var channel = this.props.channel;
        channel.removeListener(constants_1.default.CHANGED, this.onViewportChange);
        channel.removeListener(constants_1.default.SHOW_BOARDER, this.onShowBoarderChange);
    };
    Container.prototype.render = function () {
        var _a = this.state, viewport = _a.viewport, showBoarder = _a.showBoarder;
        var children = this.props.children;
        var newWidthHeight = {
            width: Number(viewport === null || viewport === void 0 ? void 0 : viewport.styles.width),
            maxWidth: Number(viewport === null || viewport === void 0 ? void 0 : viewport.styles.width),
            height: Number(viewport === null || viewport === void 0 ? void 0 : viewport.styles.height),
            maxHeight: Number(viewport === null || viewport === void 0 ? void 0 : viewport.styles.height),
        };
        var boarderStyle = showBoarder ? styles.borderStyle : undefined;
        return react_1.default.createElement(react_native_1.View, { style: [styles.container, newWidthHeight, boarderStyle] }, children);
    };
    return Container;
}(react_1.default.Component));
exports.default = Container;
