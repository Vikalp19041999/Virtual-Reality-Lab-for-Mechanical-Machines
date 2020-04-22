"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoRecordError = exports.NoActionError = exports.NoResourceError = void 0;

var _react = _interopRequireDefault(require("react"));

var _wrapperBox = _interopRequireDefault(require("./wrapper-box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * Prints error message
 *
 * @component
 * @example
 * return (
 * <ErrorMessageBox title={'Some error'}>
 *   <p>Text below the title</p>
 * </ErrorMessageBox>
 * )
 */
const ErrorMessageBox = props => {
  const {
    children,
    title,
    testId
  } = props;
  return _react.default.createElement(_wrapperBox.default, null, _react.default.createElement(_wrapperBox.default, {
    border: true,
    "data-testid": testId
  }, _react.default.createElement("div", {
    className: "content has-text-centered"
  }, _react.default.createElement("h3", null, title), _react.default.createElement("div", null, children))));
};

exports.default = ErrorMessageBox;

const NoResourceError = props => {
  const {
    resourceId
  } = props;
  return _react.default.createElement(ErrorMessageBox, {
    title: "404 - PAGE NOT FOUND",
    testId: "NoResourceError"
  }, "Resource of given id:", _react.default.createElement("b", null, ` ${resourceId} `), "cannot be found.");
};

exports.NoResourceError = NoResourceError;

const NoActionError = props => {
  const {
    resourceId,
    actionName
  } = props;
  return _react.default.createElement(ErrorMessageBox, {
    title: "404 - PAGE NOT FOUND",
    testId: "NoActionError"
  }, "Resource:", _react.default.createElement("b", null, ` ${resourceId} `), "does not have an action with name:", _react.default.createElement("b", null, ` ${actionName} `));
};

exports.NoActionError = NoActionError;

const NoRecordError = props => {
  const {
    resourceId,
    recordId
  } = props;
  return _react.default.createElement(ErrorMessageBox, {
    title: "404 - PAGE NOT FOUND",
    testId: "NoRecordError"
  }, "Resource:", _react.default.createElement("b", null, ` ${resourceId} `), "does not have a record with id:", _react.default.createElement("b", null, ` ${recordId} `));
};

exports.NoRecordError = NoRecordError;