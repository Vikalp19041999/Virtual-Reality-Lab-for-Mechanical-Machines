"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledLink = _interopRequireDefault(require("../ui/styled-link"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-alert */

/* eslint-disable no-restricted-globals */

/**
 * Renders Button for an action
 *
 * @private
 * @component
 */
class ActionButton extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  href() {
    const {
      action,
      resourceId,
      recordId,
      recordIds
    } = this.props;
    const h = new _viewHelpers.default();
    const {
      name: actionName,
      actionType
    } = action;

    switch (actionType) {
      case 'record':
        if (!recordId) {
          throw new Error('You have to specify "recordId" for record action');
        }

        return h.recordActionUrl({
          resourceId,
          recordId,
          actionName
        });

      case 'resource':
        return h.resourceActionUrl({
          resourceId,
          actionName
        });

      case 'bulk':
        return h.bulkActionUrl({
          resourceId,
          recordIds,
          actionName
        });

      default:
        throw new Error('"actionType" should be either record, resource or bulk');
    }
  }

  callApi() {
    const {
      action,
      resourceId,
      recordId,
      location,
      history,
      actionPerformed,
      addNotice,
      recordIds
    } = this.props;
    const api = new _apiClient.default();
    let promise;

    switch (action.actionType) {
      case 'record':
        if (!recordId) {
          throw new Error('You have to specify "recordId" for record action');
        }

        promise = api.recordAction({
          resourceId,
          actionName: action.name,
          recordId
        });
        break;

      case 'resource':
        promise = api.resourceAction({
          resourceId,
          actionName: action.name
        });
        break;

      case 'bulk':
        if (!recordIds) {
          throw new Error('You have to specify "recordIds" for bulk action');
        }

        promise = api.bulkAction({
          resourceId,
          actionName: action.name,
          recordIds
        });
        break;

      default:
        throw new Error('"actionType" should be either record, resource or bulk');
    }

    promise.then(response => {
      const {
        data
      } = response;

      if (data.notice) {
        addNotice(data.notice);
      }

      if (data.redirectUrl && location.pathname !== data.redirectUrl) {
        history.push(data.redirectUrl);
      }

      if (actionPerformed) {
        actionPerformed(action.name);
      }
    }).catch(error => {
      throw error;
    });
  }

  handleClick(event) {
    const {
      action
    } = this.props;

    if (action.guard && !confirm(action.guard)) {
      event.preventDefault();
      return;
    }

    if (typeof action.component !== 'undefined' && action.component === false) {
      event.preventDefault();
      this.callApi();
    }
  }

  render() {
    const {
      action,
      className
    } = this.props;
    return _react.default.createElement(_styledLink.default, {
      to: this.href(),
      className: className || '',
      onClick: this.handleClick
    }, _react.default.createElement("span", {
      className: "icon"
    }, _react.default.createElement("i", {
      className: action.icon
    })), _react.default.createElement("span", {
      className: "btn-text"
    }, action.label));
  }

} // TODO - remove this hack


var _default = (0, _reactRouterDom.withRouter)((0, _withNotice.default)(ActionButton));

exports.default = _default;