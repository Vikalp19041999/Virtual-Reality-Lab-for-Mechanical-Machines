"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _notFoundError = _interopRequireDefault(require("../utils/not-found-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @implements Action
 * @category Actions
 * @module BulkDeleteAction
 * @description
 * Removes given records from the database.
 */
const BulkDeleteAction = {
  name: 'bulkDelete',
  isVisible: true,
  actionType: 'bulk',
  icon: 'icomoon-remove-2',
  label: 'Remove',

  /**
   * Responsible for deleting existing records.
   *
   * To invoke this action use {@link ApiClient#bulkAction}
   * with {actionName: _bulkDelete_}
   *
   * @return  {Promise<BulkActionResponse>}
   * @implements ActionHandler
   * @memberof module:BulkDeleteAction
   */
  handler: async (request, response, data) => {
    const {
      records,
      resource,
      h
    } = data;

    if (!records || !records.length) {
      throw new _notFoundError.default('no records were selected.', 'Action#handler');
    }

    if (request.method === 'get') {
      const recordsInJSON = records.map(record => record.toJSON(data.currentAdmin));
      return {
        records: recordsInJSON
      };
    }

    if (request.method === 'post') {
      await Promise.all(records.map(record => resource.delete(record.id())));
      return {
        records: records.map(record => record.toJSON(data.currentAdmin)),
        notice: {
          message: `Successfully deleted ${records.length} records.`,
          type: 'success'
        },
        redirectUrl: h.resourceActionUrl({
          resourceId: resource.id(),
          actionName: 'list'
        })
      };
    }

    throw new Error('method should be either "post" or "get"');
  }
};
var _default = BulkDeleteAction;
exports.default = _default;