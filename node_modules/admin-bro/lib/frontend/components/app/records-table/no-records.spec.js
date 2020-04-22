"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

var _noRecords = _interopRequireDefault(require("./no-records"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../spec/resource-json.factory');

const renderComponent = resource => (0, _reactTestingLibrary.render)(_react.default.createElement(_testContextProvider.default, null, _react.default.createElement(_noRecords.default, {
  resource: resource
})));

describe('<NoRecords />', function () {
  let resource;
  beforeEach(async function () {
    const newAction = await _factoryGirl.default.build('ActionJSON', {
      name: 'new'
    });
    resource = await _factoryGirl.default.build('ResourceJSON', {
      resourceActions: [newAction]
    });
  });
  context('resource can be created', function () {
    beforeEach(function () {
      const {
        findAllByText,
        container
      } = renderComponent(resource);
      this.findAllByText = findAllByText;
      this.container = container;
    });
    it('shows notification that there are no records', async function () {
      const info = await this.findAllByText('No records');
      (0, _chai.expect)(info).to.have.lengthOf(1);
    });
    it('has a link to create a new resource', function () {
      const a = this.container.querySelector('a');
      (0, _chai.expect)(a).not.to.be.null;
    });
  });
  context('resource can not be created', function () {
    it('does not have a link to create a new resource', function () {
      resource.resourceActions = [];
      const {
        container
      } = renderComponent(resource);
      const a = container.querySelector('a');
      (0, _chai.expect)(a).to.be.null;
    });
  });
});