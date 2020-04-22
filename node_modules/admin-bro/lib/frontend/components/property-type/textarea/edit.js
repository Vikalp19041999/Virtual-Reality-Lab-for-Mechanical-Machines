"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _propertyInEdit = _interopRequireDefault(require("../../ui/property-in-edit"));

var _styledInput = _interopRequireDefault(require("../../ui/styled-input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Edit extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const {
      onChange,
      property
    } = this.props;
    onChange(property.name, event.target.value);
  }

  render() {
    const {
      property,
      record
    } = this.props;
    const value = record.params && typeof record.params[property.name] !== 'undefined' && record.params[property.name] !== null ? record.params[property.name] : '';
    const error = record.errors && record.errors[property.name];
    return _react.default.createElement(_propertyInEdit.default, {
      property: property,
      error: error
    }, _react.default.createElement(_styledInput.default, {
      as: "textarea",
      className: "input",
      rows: (value.match(/\n/g) || []).length + 1,
      id: property.name,
      name: property.name,
      onChange: this.handleInputChange,
      value: value,
      disabled: property.isDisabled
    }));
  }

}

var _default = (0, _styledComponents.withTheme)(Edit);

exports.default = _default;