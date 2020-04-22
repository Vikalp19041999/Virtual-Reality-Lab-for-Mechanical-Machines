"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarGroupTitle = _styledComponents.default.span.withConfig({
  displayName: "sidebar-group-titlestyled__SidebarGroupTitle",
  componentId: "sc-1qrf31a-0"
})(["background:", ";padding-left:", ";padding-right:", ";line-height:40px;border-radius:", ";display:flex;align-items:baseline;color:", ";position:relative;& > i,& > svg{margin-right:", ";color:", ";margin-right:", ";}"], ({
  theme
}) => theme.colors.lightBck, ({
  theme
}) => theme.sizes.padding, ({
  theme
}) => theme.sizes.padding, ({
  theme
}) => theme.sizes.paddingLayout, ({
  theme
}) => theme.colors.defaultText, ({
  theme
}) => theme.sizes.paddingMin, ({
  theme
}) => theme.colors.lightText, ({
  theme
}) => theme.sizes.padding);

var _default = SidebarGroupTitle;
exports.default = _default;