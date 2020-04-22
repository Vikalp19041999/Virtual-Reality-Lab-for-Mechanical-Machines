"use strict";

var _chai = require("chai");

var _loginTemplate = _interopRequireDefault(require("./login-template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('login-template', function () {
  const action = '/login';
  it('renders error message', function () {
    const errorMessage = 'Something went wrong';
    (0, _chai.expect)((0, _loginTemplate.default)({
      action,
      errorMessage
    })).to.contain(errorMessage);
  });
});