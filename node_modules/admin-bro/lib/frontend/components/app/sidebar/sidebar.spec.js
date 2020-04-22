"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _reactRedux = require("react-redux");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _store = _interopRequireDefault(require("../../../store/store"));

var _sidebar = _interopRequireDefault(require("./sidebar"));

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

require("../../spec/resource-json.factory");

require("../../spec/page-json.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Sidebar />', function () {
  const renderTestSubject = (resources = [], branding = {}, pages = []) => {
    const store = (0, _store.default)({
      resources,
      branding,
      pages
    });
    return (0, _reactTestingLibrary.render)(_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_testContextProvider.default, null, _react.default.createElement(_sidebar.default, null))));
  };

  context('Only 4 resources were set in a store, all having list action', function () {
    let resources;
    beforeEach(async function () {
      resources = await _factoryGirl.default.buildMany('ResourceJSON', 4, {
        resourceActions: [await _factoryGirl.default.build('ActionJSON', {
          name: 'list'
        })]
      });
    });
    it('renders links to all resources', async function () {
      const {
        container
      } = await renderTestSubject(resources);
      const sidebarLinks = container.querySelectorAll('[data-testid="sidebar-resource-link"]');
      (0, _chai.expect)(sidebarLinks).to.have.lengthOf(4);
    });
    it('does not show any pages', async function () {
      const {
        container
      } = await renderTestSubject(resources);
      const pageLinks = container.querySelectorAll('[data-testid="sidebar-page-link"]');
      (0, _chai.expect)(pageLinks).to.have.lengthOf(0);
    });
  });
  context('one resource without list action has been set in a store', function () {
    it('does not show any resources in the sidebar', async function () {
      const resources = await _factoryGirl.default.buildMany('ResourceJSON', 1, {
        resourceActions: [await _factoryGirl.default.build('ActionJSON', {
          name: 'edit'
        })]
      });
      const {
        container
      } = await renderTestSubject(resources);
      const sidebarLinks = container.querySelectorAll('[data-testid="sidebar-resource-link"]');
      (0, _chai.expect)(sidebarLinks).to.have.lengthOf(0);
    });
  });
  context('2 pages were set in a store', function () {
    it('shows links to all given pages', async function () {
      const pages = await _factoryGirl.default.buildMany('PageJSON', 2);
      const {
        container
      } = await renderTestSubject([], {}, pages);
      const sidebarLinks = container.querySelectorAll('[data-testid="sidebar-page-link"]');
      (0, _chai.expect)(sidebarLinks).to.have.lengthOf(2);
    });
  });
});