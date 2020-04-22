"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarSection = _styledComponents.default.section.withConfig({
  displayName: "sidebar-sectionstyled__SidebarSection",
  componentId: "sc-1hmyctm-0"
})(["padding:", ";width:", ";transition:padding 0.5s;& > section{opacity:1;transition:opacity 0.5s;}"], ({
  theme
}) => `${theme.sizes.padding} ${theme.sizes.paddingLayout}`, ({
  theme
}) => theme.sizes.sidebarWidth);

var _default = SidebarSection;
exports.default = _default;