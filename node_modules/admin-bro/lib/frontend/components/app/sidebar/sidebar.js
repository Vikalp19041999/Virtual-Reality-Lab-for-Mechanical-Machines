"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _sidebarBranding = _interopRequireDefault(require("./sidebar-branding"));

var _sidebarParent = _interopRequireDefault(require("./sidebar-parent"));

var _sidebarFooter = _interopRequireDefault(require("./sidebar-footer"));

var _sidebarPages = _interopRequireDefault(require("./sidebar-pages"));

var _groupResources = _interopRequireDefault(require("./utils/group-resources"));

var _hamburger = _interopRequireDefault(require("./hamburger"));

var _sidebarLabel = _interopRequireDefault(require("./styled/sidebar-label.styled"));

var _sidebarWrapper = _interopRequireDefault(require("./styled/sidebar-wrapper.styled"));

var _sidebarSection = _interopRequireDefault(require("./styled/sidebar-section.styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Sidebar = props => {
  const {
    branding,
    resources,
    pages
  } = props;
  const [hidden, setHidden] = (0, _react.useState)(false);
  return _react.default.createElement(_sidebarWrapper.default, {
    className: hidden ? 'hidden' : 'active'
  }, _react.default.createElement(_sidebarSection.default, null, _react.default.createElement(_hamburger.default, {
    onClick: () => setHidden(!hidden)
  }), _react.default.createElement(_sidebarBranding.default, {
    branding: branding
  })), _react.default.createElement(_sidebarSection.default, {
    style: {
      flexGrow: 1
    }
  }, _react.default.createElement(_sidebarLabel.default, null, "Navigation"), _react.default.createElement("ul", null, (0, _groupResources.default)(resources).map(parent => _react.default.createElement(_sidebarParent.default, {
    parent: parent,
    key: parent.name
  })))), _react.default.createElement(_sidebarPages.default, {
    pages: pages
  }), branding.softwareBrothers && _react.default.createElement(_sidebarFooter.default, {
    hidden: hidden
  }));
};

const mapStateToProps = state => ({
  resources: state.resources,
  branding: state.branding,
  pages: state.pages
});

var _default = (0, _reactRedux.connect)(mapStateToProps)(Sidebar);

exports.default = _default;