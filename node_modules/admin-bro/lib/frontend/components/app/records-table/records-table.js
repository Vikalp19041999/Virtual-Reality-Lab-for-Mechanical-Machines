"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recordInList = _interopRequireDefault(require("./record-in-list"));

var _recordsTableHeader = _interopRequireDefault(require("./records-table-header"));

var _noRecords = _interopRequireDefault(require("./no-records"));

var _table = _interopRequireDefault(require("../../ui/table"));

var _selectedRecords = _interopRequireDefault(require("./selected-records"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RecordsTableWrapper = _styledComponents.default.section.withConfig({
  displayName: "records-table__RecordsTableWrapper",
  componentId: "sc-10jbltm-0"
})(["position:relative;"]);

const RecordsTable = props => {
  const {
    resource,
    records,
    actionPerformed,
    sortBy,
    direction,
    isLoading,
    onSelect,
    selectedRecords,
    onSelectAll
  } = props;

  if (!records.length) {
    return _react.default.createElement(_noRecords.default, {
      resource: resource
    });
  }

  const selectedAll = selectedRecords && !!records.find(record => selectedRecords.find(selected => selected.id === record.id));
  return _react.default.createElement(RecordsTableWrapper, null, _react.default.createElement(_selectedRecords.default, {
    resource: resource,
    selectedRecords: selectedRecords
  }), _react.default.createElement(_table.default, null, _react.default.createElement(_recordsTableHeader.default, {
    properties: resource.listProperties,
    titleProperty: resource.titleProperty,
    direction: direction,
    sortBy: sortBy,
    onSelectAll: onSelectAll,
    selectedAll: selectedAll
  }), _react.default.createElement("tbody", null, records.map(record => _react.default.createElement(_recordInList.default, {
    record: record,
    resource: resource,
    key: record.id,
    actionPerformed: actionPerformed,
    isLoading: isLoading,
    onSelect: onSelect,
    isSelected: selectedRecords && !!selectedRecords.find(selected => selected.id === record.id)
  })))));
};

var _default = RecordsTable;
exports.default = _default;