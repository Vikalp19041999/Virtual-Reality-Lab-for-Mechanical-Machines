"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_factoryGirl.default.define('PageJSON', Object, {
  name: _factoryGirl.default.sequence('PageJSON.name', n => `page${n}`),
  label: _factoryGirl.default.sequence('PageJSON.label', n => `page ${n}`),
  component: _factoryGirl.default.sequence('PageJSON.component', n => `Component${n}`)
});