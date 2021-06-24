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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var constants_1 = __importDefault(require("./constants"));
var defaults_1 = require("./defaults");
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 100,
    },
    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
    },
    title: {
        fontSize: 16,
    },
});
function getValidViewports(viewportMap, defaultWindow) {
    var samllerThanWindow = Object.values(viewportMap).filter(function (v) { return v.styles.width < defaultWindow.width && v.styles.height < defaultWindow.height; });
    var defaultViewport = {
        name: defaults_1.DEFAULT_VIEWPORT_NAME,
        styles: { width: defaultWindow.width, height: defaultWindow.height },
        type: 'other',
    };
    return __spreadArrays([defaultViewport], samllerThanWindow);
}
var defaultState = {
    selected: defaults_1.DEFAULT_VIEWPORT_NAME,
    showBoarder: false,
    viewports: defaults_1.INITIAL_VIEWPORTS,
    disable: false,
};
var ViewportPanel = /** @class */ (function (_super) {
    __extends(ViewportPanel, _super);
    function ViewportPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.onSetParameters = function (parameters) {
            var selected = parameters.defaultViewport || defaultState.selected;
            var disable = parameters.disable || defaultState.disable;
            var showBoarder = parameters.showBoarder || defaultState.showBoarder;
            var viewports = parameters.viewports || defaultState.viewports;
            _this.setState({ showBoarder: showBoarder, viewports: viewports, disable: disable, selected: selected });
        };
        _this.onViewportSelect = function (viewport) {
            var channel = _this.props.channel;
            _this.setState({ selected: viewport.name });
            channel.emit(constants_1.default.CHANGED, JSON.stringify(viewport));
        };
        _this.onViewportBorderChanged = function (showBoarder) {
            var channel = _this.props.channel;
            _this.setState({ showBoarder: showBoarder });
            channel.emit(constants_1.default.SHOW_BOARDER, showBoarder);
        };
        _this.renderItem = function (_a) {
            var item = _a.item;
            var selected = _this.state.selected;
            var title = item.name + ": (" + item.styles.width + "x" + item.styles.height + ")";
            var backgroundColor = item.name === selected ? 'aquamarine' : 'ghostwhite';
            var color = item.name === selected ? 'rebeccapurple' : 'black';
            return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return _this.onViewportSelect(item); }, style: __assign(__assign({}, styles.item), { backgroundColor: backgroundColor }) },
                react_1.default.createElement(react_native_1.Text, { style: __assign(__assign({}, styles.title), { color: color }) }, title)));
        };
        _this.state = defaultState;
        return _this;
    }
    ViewportPanel.prototype.componentDidMount = function () {
        this.props.channel.on(constants_1.default.SET, this.onSetParameters);
    };
    ViewportPanel.prototype.componentWillUnmount = function () {
        this.props.channel.removeListener(constants_1.default.SET, this.onSetParameters);
    };
    ViewportPanel.prototype.render = function () {
        var active = this.props.active;
        if (!active || !this.state) {
            return null;
        }
        var _a = this.state, selected = _a.selected, showBoarder = _a.showBoarder, disable = _a.disable, viewports = _a.viewports;
        if (disable) {
            return react_1.default.createElement(react_native_1.View, null, "Viewport is disabled");
        }
        var viewportsList = getValidViewports(viewports, react_native_1.Dimensions.get('window'));
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.View, { style: styles.switchContainer },
                react_1.default.createElement(react_native_1.Text, null, 'Show viewport border: '),
                react_1.default.createElement(react_native_1.Switch, { onValueChange: this.onViewportBorderChanged, value: showBoarder })),
            react_1.default.createElement(react_native_1.FlatList, { data: viewportsList, renderItem: this.renderItem, keyExtractor: function (item) { return item.name; }, extraData: selected })));
    };
    return ViewportPanel;
}(react_1.default.Component));
exports.default = ViewportPanel;
