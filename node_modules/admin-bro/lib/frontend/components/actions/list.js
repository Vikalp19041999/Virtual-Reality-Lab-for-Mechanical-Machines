"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _wrapperBox = _interopRequireDefault(require("../ui/wrapper-box"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

var _recordsTable = _interopRequireDefault(require("../app/records-table/records-table"));

var _paginate = _interopRequireDefault(require("../ui/paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: add direction enum

/**
 * @name NewAction
 * @category Actions
 * @description Shows form for creating a given record.
 * @component
 * @private
 */
class List extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleActionPerformed = this.handleActionPerformed.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.state = {
      records: [],
      page: 1,
      perPage: 20,
      total: 0,
      loading: true,
      direction: 'asc',
      sortBy: undefined,
      selectedRecords: []
    };
  }

  componentDidMount() {
    this._fetchData(this.props);
  }

  shouldComponentUpdate(newProps) {
    const {
      resource,
      location
    } = this.props;

    if (resource.id !== newProps.resource.id || location.search !== newProps.location.search) {
      this._fetchData(newProps);

      return false;
    }

    return true;
  }

  componentWillUnmount() {
    const {
      setTag
    } = this.props;

    if (setTag) {
      setTag('');
    }
  }

  _fetchData(props) {
    const {
      location,
      resource,
      setTag,
      addNotice
    } = props;
    const {
      resource: oldResource
    } = this.props;
    const {
      selectedRecords
    } = this.state;
    const api = new _apiClient.default();
    this.setState({
      loading: true
    });
    const query = new URLSearchParams(location.search);
    api.resourceAction({
      actionName: 'list',
      resourceId: resource.id,
      params: query
    }).then(response => {
      const listActionResponse = response.data;
      this.setState({
        records: listActionResponse.records,
        page: listActionResponse.meta.page,
        perPage: listActionResponse.meta.perPage,
        total: listActionResponse.meta.total,
        direction: listActionResponse.meta.direction,
        sortBy: listActionResponse.meta.sortBy,
        selectedRecords: oldResource.id === resource.id ? selectedRecords : [],
        loading: false
      });

      if (setTag) {
        if (typeof response.data.meta.total === 'undefined') {
          setTag('');
        } else {
          setTag(response.data.meta.total.toString());
        }
      }
    }).catch(() => {
      addNotice({
        message: 'There was an error fetching records, Check out console to see more information.',
        type: 'error'
      });
    });
  }

  handleActionPerformed() {
    this._fetchData(this.props);
  }

  handleSelect(record) {
    const {
      selectedRecords
    } = this.state;
    const selectedIndex = selectedRecords.findIndex(selected => selected.id === record.id);

    if (selectedIndex < 0) {
      this.setState({
        selectedRecords: [...selectedRecords, record]
      });
    } else {
      const newSelectedRecords = [...selectedRecords];
      newSelectedRecords.splice(selectedIndex, 1);
      this.setState({
        selectedRecords: newSelectedRecords
      });
    }
  }

  handleSelectAll() {
    const {
      records,
      selectedRecords
    } = this.state;
    const missing = records.filter(record => !selectedRecords.find(selected => selected.id === record.id) && record.bulkActions.length);

    if (missing.length) {
      this.setState({
        selectedRecords: [...selectedRecords, ...missing]
      });
    } else {
      const newSelectedRecords = selectedRecords.filter(selected => !records.find(record => record.id === selected.id));
      this.setState({
        selectedRecords: newSelectedRecords
      });
    }
  }

  render() {
    const {
      resource
    } = this.props;
    const {
      records,
      page,
      perPage,
      total,
      loading,
      direction,
      sortBy,
      selectedRecords
    } = this.state;
    return _react.default.createElement(_wrapperBox.default, {
      border: true
    }, _react.default.createElement(_recordsTable.default, {
      resource: resource,
      records: records,
      actionPerformed: this.handleActionPerformed,
      onSelect: this.handleSelect,
      onSelectAll: this.handleSelectAll,
      selectedRecords: selectedRecords,
      direction: direction,
      sortBy: sortBy,
      isLoading: loading
    }), _react.default.createElement(_paginate.default, {
      page: page,
      perPage: perPage,
      total: total
    }));
  }

}

var _default = (0, _withNotice.default)((0, _reactRouterDom.withRouter)(List));

exports.default = _default;