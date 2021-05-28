"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 消息队列
 */
var TaskQueue = {
  /**
   * 是否停止fire
   */
  isStop: true,

  /**
   * 待处理消息列表
   */
  queues: [],

  /**
   * 添加消息
   * @param {*} reportUrl 上报url
   * @param {*} data 上报数据
   */
  add: function add(reportUrl, data) {
    this.queues.push({
      reportUrl: reportUrl,
      data: data
    });
  },

  /**
   * 统一上报
   */
  fire: function fire() {
    if (!this.queues || this.queues.length === 0) {
      this.isStop = true;
      return;
    }

    this.isStop = false;
    var item = this.queues[0];
    item.reportUrl && new _api.default(item.reportUrl).report(item.data);
    this.queues.splice(0, 1);
    this.fire(); //递归
  }
};
var _default = TaskQueue;
exports.default = _default;