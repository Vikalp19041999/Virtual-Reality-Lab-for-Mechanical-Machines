"use strict";

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _reactTestingLibrary = require("react-testing-library");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _sinon = _interopRequireDefault(require("sinon"));

require("sinon-chai");

var _edit = _interopRequireDefault(require("./edit"));

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

require("../../spec/property-json.factory");

require("../../spec/record-json.factory");

var _edit2 = _interopRequireDefault(require("../default-type/edit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AddNewItemText = 'Add new item';
describe('<PropertyType.Array.Edit />', function () {
  const propertyName = 'arrayField';
  let property;
  let record; // eslint-disable-next-line mocha/no-setup-in-describe

  const onChange = _sinon.default.spy();

  const renderTestSubject = (prop, rec) => (0, _reactTestingLibrary.render)(_react.default.createElement(_testContextProvider.default, null, _react.default.createElement(_edit.default, {
    property: prop,
    record: rec,
    ItemComponent: _edit2.default,
    onChange: onChange
  })));

  context('Property with a string array', function () {
    beforeEach(async function () {
      property = await _factoryGirl.default.build('PropertyJSON', {
        name: propertyName,
        isArray: true
      });
    });
    context('no items inside', function () {
      beforeEach(async function () {
        record = await _factoryGirl.default.build('RecordJSON', {
          params: {}
        });
      });
      it('renders label and addItem button', async function () {
        const {
          findByText
        } = renderTestSubject(property, record);
        const label = await findByText(property.label);
        const addItemBtn = await findByText(AddNewItemText);
        (0, _chai.expect)(label).not.to.be.null;
        (0, _chai.expect)(addItemBtn).not.to.be.null;
      });
      it('renders new empty input field after clicking "add"', async function () {
        const {
          getByText
        } = renderTestSubject(property, record);

        _reactTestingLibrary.fireEvent.click(getByText(AddNewItemText));

        (0, _chai.expect)(onChange).to.has.been.calledWith(_sinon.default.match.has('params', _sinon.default.match.has(`${property.name}.0`, '')));
      });
    });
    context('2 items inside', function () {
      const values = ['element1', 'element2'];
      it('2 <input> tags already filed with values', async function () {
        record = await _factoryGirl.default.build('RecordJSON', {
          params: {
            [`${property.name}.0`]: values[0],
            [`${property.name}.1`]: values[1]
          }
        });
        const {
          findByDisplayValue
        } = renderTestSubject(property, record);
        (0, _chai.expect)(findByDisplayValue(values[0])).not.to.be.null;
        (0, _chai.expect)(findByDisplayValue(values[1])).not.to.be.null;
      });
    });
  });
});