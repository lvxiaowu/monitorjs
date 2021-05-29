"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = require("./error");

var _baseConfig = require("./base/baseConfig.js");

var _performance = _interopRequireDefault(require("./performance"));

var _networkSpeed = _interopRequireDefault(require("./performance/networkSpeed"));

var _packages = _interopRequireDefault(require("./packages.json"));

require("./utils/extends");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MonitorJS = /*#__PURE__*/function () {
  function MonitorJS(_ref) {
    var _ref$jsError = _ref.jsError,
        jsError = _ref$jsError === void 0 ? true : _ref$jsError,
        _ref$promiseError = _ref.promiseError,
        promiseError = _ref$promiseError === void 0 ? true : _ref$promiseError,
        _ref$resourceError = _ref.resourceError,
        resourceError = _ref$resourceError === void 0 ? true : _ref$resourceError,
        _ref$ajaxError = _ref.ajaxError,
        ajaxError = _ref$ajaxError === void 0 ? true : _ref$ajaxError,
        _ref$consoleError = _ref.consoleError,
        consoleError = _ref$consoleError === void 0 ? false : _ref$consoleError,
        _ref$vueError = _ref.vueError,
        vueError = _ref$vueError === void 0 ? false : _ref$vueError;

    _classCallCheck(this, MonitorJS);

    this.jsError = jsError;
    this.promiseError = promiseError;
    this.resourceError = resourceError;
    this.ajaxError = ajaxError;
    this.consoleError = consoleError;
    this.vueError = vueError;
  }
  /**
   * 处理异常信息初始化
   * @param {*} options
   */


  _createClass(MonitorJS, [{
    key: "init",
    value: function init(options) {
      options = options || {};
      var reportUrl = options.url; //上报错误地址

      var extendsInfo = options.extendsInfo || {}; //扩展信息（一般用于系统个性化分析）

      var param = {
        reportUrl: reportUrl,
        extendsInfo: extendsInfo
      };

      if (this.jsError) {
        new _error.JsError(param).handleError();
      }

      if (this.promiseError) {
        new _error.PromiseError(param).handleError();
      }

      if (this.resourceError) {
        new _error.ResourceError(param).handleError();
      }

      if (this.ajaxError) {
        new _error.AjaxError(param).handleError(_baseConfig.AjaxLibEnum.DEFAULT);
      }

      if (this.consoleError) {
        new _error.ConsoleError(param).handleError();
      }

      if (this.vueError && options.vue) {
        new _error.VueError(param).handleError(options.vue);
      }
    }
    /**
     * 监听页面性能
     * @param {*} options {pageId：页面标识,url：上报地址}
     */

  }, {
    key: "monitorPerformance",
    value: function monitorPerformance(options) {
      options = options || {};
      new _networkSpeed.default(options).reportNetworkSpeed();

      var recordFunc = function recordFunc() {
        new _performance.default(options).record();
      };

      window.removeEventListener('unload', recordFunc);
      window.addEventListener('unload', recordFunc);
    }
  }]);

  return MonitorJS;
}();

MonitorJS.version = _packages.default.version;
var _default = MonitorJS;
exports.default = _default;