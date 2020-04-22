"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarLink = (0, _styledComponents.default)(_reactRouterDom.NavLink).withConfig({
  displayName: "sidebar-linkstyled__SidebarLink",
  componentId: "sc-13hc6f5-0"
})(["color:", ";padding:", ";display:block;&:hover{color:", ";}&.active{color:", ";}"], ({
  theme
}) => theme.colors.lightText, ({
  theme
}) => theme.sizes.paddingMin, ({
  theme
}) => theme.colors.primary, ({
  theme
}) => theme.colors.primary);
var _default = SidebarLink;
exports.default = _default;