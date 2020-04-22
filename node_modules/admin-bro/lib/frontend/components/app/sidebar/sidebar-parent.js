"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sidebarResource = _interopRequireDefault(require("./sidebar-resource"));

var _sidebarGroupTitle = _interopRequireDefault(require("./styled/sidebar-group-title.styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResourcesList = _styledComponents.default.ul.withConfig({
  displayName: "sidebar-parent__ResourcesList",
  componentId: "sc-1f3abux-0"
})(["margin:", " 0;padding-left:40px;"], ({
  theme
}) => theme.sizes.padding);

class SidebarParent extends _react.default.PureComponent {
  render() {
    const {
      parent
    } = this.props;
    const {
      icon,
      name,
      resources
    } = parent;
    return _react.default.createElement("li", null, _react.default.createElement(_sidebarGroupTitle.default, null, _react.default.createElement("i", {
      className: icon
    }), name), _react.default.createElement(ResourcesList, null, resources.map(resource => _react.default.createElement(_sidebarResource.default, {
      resource: resource,
      key: resource.id
    }))));
  }

}

var _default = SidebarParent;
exports.default = _default;