"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sidebarLabel = _interopRequireDefault(require("./styled/sidebar-label.styled"));

var _sidebarLink = _interopRequireDefault(require("./styled/sidebar-link.styled"));

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers"));

var _sidebarSection = _interopRequireDefault(require("./styled/sidebar-section.styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PagesListWrapper = _styledComponents.default.div.withConfig({
  displayName: "sidebar-pages__PagesListWrapper",
  componentId: "szeyz1-0"
})(["&&&{padding-left:10px;}"]);

const SidebarPages = props => {
  const {
    pages
  } = props;
  const h = new _viewHelpers.default();

  if (!pages || !pages.length) {
    return _react.default.createElement(_react.default.Fragment, null);
  }

  const isActive = (page, location) => !!location.pathname.match(`/pages/${page.name}`);

  return _react.default.createElement(_sidebarSection.default, null, _react.default.createElement(_sidebarLabel.default, null, "Pages"), _react.default.createElement(PagesListWrapper, null, pages.map(page => _react.default.createElement(_sidebarLink.default, {
    to: h.pageUrl(page.name),
    key: page.name,
    isActive: (match, location) => isActive(page, location),
    "data-testid": "sidebar-page-link"
  }, page.label))));
};

var _default = SidebarPages;
exports.default = _default;