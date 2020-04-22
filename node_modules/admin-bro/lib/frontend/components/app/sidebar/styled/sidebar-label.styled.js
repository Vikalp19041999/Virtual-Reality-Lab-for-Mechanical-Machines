"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarLabel = _styledComponents.default.h2.withConfig({
  displayName: "sidebar-labelstyled__SidebarLabel",
  componentId: "j35xu0-0"
})(["margin-top:", ";margin-left:", ";margin-bottom:", ";color:", ";font-size:", ";text-transform:uppercase;letter-spacing:.1em;"], ({
  theme
}) => theme.sizes.padding, ({
  theme
}) => theme.sizes.padding, ({
  theme
}) => theme.sizes.padding, ({
  theme
}) => theme.colors.lightText, ({
  theme
}) => theme.fonts.min);

var _default = SidebarLabel;
exports.default = _default;