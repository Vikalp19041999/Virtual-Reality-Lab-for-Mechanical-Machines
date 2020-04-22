"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _breadcrumbs = _interopRequireDefault(require("../app/breadcrumbs"));

var _actionHeader = _interopRequireDefault(require("../app/action-header"));

var _wrapperBox = _interopRequireDefault(require("../ui/wrapper-box"));

var _notice = _interopRequireDefault(require("../app/notice"));

var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));

var _errorMessage = _interopRequireWildcard(require("../ui/error-message"));

var _noticeWrapper = _interopRequireDefault(require("./styled/notice-wrapper.styled"));

var _ui = require("../ui");

var _shouldActionReFetchData = _interopRequireDefault(require("./utils/should-action-re-fetch-data"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

var _getBulkActionsFromRecords = _interopRequireDefault(require("../app/records-table/utils/get-bulk-actions-from-records"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_RECORDS_ERROR = {
  message: 'There was an error fetching records, Check out console to see more information.',
  type: 'error'
};

class BulkAction extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: undefined,
      isLoading: true,
      tag: undefined
    };
  }

  componentDidMount() {
    const {
      match
    } = this.props;
    this.fetchRecords(match.params);
  }

  shouldComponentUpdate(newProps) {
    const {
      match
    } = this.props;

    if ((0, _shouldActionReFetchData.default)(match.params, newProps.match.params)) {
      this.fetchRecords(newProps.match.params);
      return false;
    }

    return true;
  }

  setTag(tagName) {
    this.setState({
      tag: tagName
    });
  }

  fetchRecords({
    resourceId,
    actionName
  }) {
    const {
      addNotice,
      location
    } = this.props;
    const recordIdsString = new URLSearchParams(location.search).get('recordIds');
    const recordIds = recordIdsString ? recordIdsString.split(',') : [];
    const api = new _apiClient.default();
    this.setState({
      isLoading: true,
      records: undefined
    });
    return api.bulkAction({
      resourceId,
      recordIds,
      actionName
    }).then(response => {
      this.setState({
        isLoading: false,
        records: response.data.records
      });
    }).catch(error => {
      addNotice(NO_RECORDS_ERROR);
      throw error;
    });
  }

  render() {
    const {
      resources,
      match
    } = this.props;
    const {
      resourceId,
      actionName
    } = match.params;
    const {
      isLoading,
      tag,
      records
    } = this.state;
    const resource = resources.find(r => r.id === resourceId);

    if (!resource) {
      return _react.default.createElement(_errorMessage.NoResourceError, {
        resourceId: resourceId
      });
    }

    if (!records && !isLoading) {
      return _react.default.createElement(_errorMessage.default, {
        title: "No records"
      }, _react.default.createElement("p", null, "You have not selected any records"));
    }

    const action = (0, _getBulkActionsFromRecords.default)(records || []).find(r => r.name === actionName);

    if (!action && !isLoading) {
      return _react.default.createElement(_errorMessage.NoActionError, {
        resourceId: resourceId,
        actionName: actionName
      });
    }

    return _react.default.createElement("div", null, _react.default.createElement(_noticeWrapper.default, null, _react.default.createElement(_notice.default, null)), _react.default.createElement(_wrapperBox.default, null, _react.default.createElement(_breadcrumbs.default, {
      resource: resource,
      actionName: actionName
    }), _react.default.createElement(_actionHeader.default, {
      resource: resource,
      action: action,
      tag: tag
    }), isLoading ? _react.default.createElement(_ui.Loader, null) : _react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource,
      records: records,
      setTag: this.setTag
    })));
  }

}

const mapStateToProps = state => ({
  resources: state.resources
});

var _default = (0, _withNotice.default)((0, _reactRedux.connect)(mapStateToProps)(BulkAction));

exports.default = _default;