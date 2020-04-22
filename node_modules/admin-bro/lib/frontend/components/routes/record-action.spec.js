"use strict";

var _react = _interopRequireDefault(require("react"));

var _sinon = _interopRequireDefault(require("sinon"));

var _chai = require("chai");

var _lodash = _interopRequireDefault(require("lodash"));

var _reactTestingLibrary = require("react-testing-library");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _store = _interopRequireDefault(require("../../store/store"));

var _recordAction = _interopRequireDefault(require("./record-action"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _testContextProvider = _interopRequireDefault(require("../spec/test-context-provider"));

var _factory = _interopRequireDefault(require("../spec/factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultStore = {
  paths: {}
};

const renderSubject = (store = {}, location) => {
  const path = '/resources/:resourceId/records/:recordId/:actionName';

  const storeWithDefault = _lodash.default.merge(defaultStore, store);

  const renderResult = (0, _reactTestingLibrary.render)(_react.default.createElement(_testContextProvider.default, {
    location: location
  }, _react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)(storeWithDefault)
  }, _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
    path: path,
    exact: true,
    component: _recordAction.default
  })))));
  return renderResult;
};

describe('<RecordAction />', function () {
  let record;
  let resource;
  beforeEach(async function () {
    record = await _factory.default.build('RecordJSON.total');
    resource = await _factory.default.build('ResourceJSON.full');

    _sinon.default.stub(_apiClient.default, 'getBaseUrl').returns('/admin');

    _sinon.default.stub(_apiClient.default.prototype, 'recordAction').resolves({
      data: {
        record
      }
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  it('renders 404 when there is no resource', async function () {
    const {
      findByTestId
    } = renderSubject({}, '/resources/someResource/records/1234/show');
    const errorBox = await findByTestId('NoResourceError');
    (0, _chai.expect)(errorBox).not.to.be.undefined;
  });
  describe('show action when record and resource are given', function () {
    it('renders all showProperties in a resource', async function () {
      const {
        findByTestId
      } = renderSubject({
        resources: [resource]
      }, `/resources/${resource.id}/records/1234/show`);
      await Promise.all(resource.showProperties.map(async property => {
        const propertyInShow = await findByTestId(`PropertyInShow-${property.name}`);
        (0, _chai.expect)(propertyInShow).not.to.be.undefined;
        return propertyInShow;
      }));
    });
    it('calls the API', function () {
      const recordId = '12312312';
      renderSubject({
        resources: [resource]
      }, `/resources/${resource.id}/records/${recordId}/show`);
      (0, _chai.expect)(_apiClient.default.prototype.recordAction).to.have.been.calledWith({
        resourceId: resource.id,
        recordId,
        actionName: 'show'
      });
    });
  });
  describe('edit action when record and resource are given', function () {
    it('renders all editProperties in a resource', async function () {
      const {
        findByTestId
      } = renderSubject({
        resources: [resource]
      }, `/resources/${resource.id}/records/1234/edit`);
      await Promise.all(resource.editProperties.map(async property => {
        const propertyInEdit = await findByTestId(`PropertyInEdit-${property.name}`);
        (0, _chai.expect)(propertyInEdit).not.to.be.undefined;
        return propertyInEdit;
      }));
    });
  });
});