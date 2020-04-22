"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Th = _styledComponents.default.th.withConfig({
  displayName: "thstyled__Th",
  componentId: "zxhn8c-0"
})(["&&&{font-size:", ";text-transform:uppercase;color:", ";font-weight:normal;padding:", ";letter-spacing:0.1em;border:none;}"], ({
  theme
}) => theme.fonts.min, ({
  theme
}) => theme.colors.lightText, ({
  theme
}) => theme.sizes.padding);

var _default = Th;
exports.default = _default;