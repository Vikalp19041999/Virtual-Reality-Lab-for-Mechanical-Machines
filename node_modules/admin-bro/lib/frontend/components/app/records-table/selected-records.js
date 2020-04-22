"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _label = _interopRequireDefault(require("../../ui/label"));

var _actionButton = _interopRequireDefault(require("../action-button"));

var _getBulkActionsFromRecords = _interopRequireDefault(require("./utils/get-bulk-actions-from-records"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SelectedRecordsWrapper = _styledComponents.default.section.withConfig({
  displayName: "selected-records__SelectedRecordsWrapper",
  componentId: "sc-1tzov1n-0"
})(["position:absolute;top:-30px;padding-left:", ";"], ({
  theme
}) => theme.sizes.padding);

const InlineLabel = (0, _styledComponents.default)(_label.default).withConfig({
  displayName: "selected-records__InlineLabel",
  componentId: "sc-1tzov1n-1"
})(["&&&{display:inline;line-height:36px;}"]);

const SelectedRecords = props => {
  const {
    resource,
    selectedRecords
  } = props;

  if (!selectedRecords || !selectedRecords.length) {
    return null;
  }

  const bulkActions = (0, _getBulkActionsFromRecords.default)(selectedRecords);
  return _react.default.createElement(SelectedRecordsWrapper, null, _react.default.createElement(InlineLabel, null, `selected: ${selectedRecords.length}`), bulkActions.map(action => _react.default.createElement(_actionButton.default, {
    action: action,
    key: action.name,
    resourceId: resource.id,
    className: "is-text",
    recordIds: selectedRecords.map(records => records.id)
  })));
};

var _default = SelectedRecords;
exports.default = _default;