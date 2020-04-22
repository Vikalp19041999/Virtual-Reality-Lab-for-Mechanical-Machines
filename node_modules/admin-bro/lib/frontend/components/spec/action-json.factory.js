"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_factoryGirl.default.define('ActionJSON', Object, {
  actionType: 'record',
  name: 'edit',
  label: 'edit',
  showFilter: false
});