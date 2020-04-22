"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarWrapper = _styledComponents.default.aside.withConfig({
  displayName: "sidebar-wrapperstyled__SidebarWrapper",
  componentId: "sc-1ohnoa0-0"
})(["display:flex;flex-shrink:0;flex-direction:column;justify-content:space-between;height:100%;overflow-y:auto;overflow-x:hidden;background:", ";border-right:1px solid ", ";width:", ";transition:width 0.5s;&.hidden{width:50px;transition:width 0.5s;overflow:hidden;& > section{padding:", " 4px;transition:padding 0.5s;& > section{opacity:0;transition:opacity 0.5s;}}}"], ({
  theme
}) => theme.colors.bck, ({
  theme
}) => theme.colors.border, ({
  theme
}) => theme.sizes.sidebarWidth, ({
  theme
}) => theme.sizes.padding);

var _default = SidebarWrapper;
exports.default = _default;