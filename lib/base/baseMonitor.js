"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseConfig = require("./baseConfig.js");

var _device = _interopRequireDefault(require("../device"));

var _api = _interopRequireDefault(require("./api.js"));

var _utils = _interopRequireDefault(require("../utils/utils.js"));

var _taskQueue = _interopRequireDefault(require("./taskQueue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 监控基类
 */
var BaseMonitor = /*#__PURE__*/function () {
  /**
   * 上报错误地址
   * @param {*} params { reportUrl,extendsInfo }
   */
  function BaseMonitor(params) {
    _classCallCheck(this, BaseMonitor);

    this.category = _baseConfig.ErrorCategoryEnum.UNKNOW_ERROR; //错误类型

    this.level = _baseConfig.ErrorLevelEnum.INFO; //错误等级

    this.msg = ""; //错误信息

    this.url = ""; //错误信息地址

    this.line = ""; //行数

    this.col = ""; //列数

    this.errorObj = ""; //错误堆栈

    this.reportUrl = params.reportUrl; //上报错误地址

    this.extendsInfo = params.extendsInfo; //扩展信息
  }
  /**
   * 记录错误信息
   */


  _createClass(BaseMonitor, [{
    key: "recordError",
    value: function recordError() {
      this.handleRecordError(); //延迟记录日志

      setTimeout(function () {
        _taskQueue.default.isStop && _taskQueue.default.fire(); //停止则fire
      }, 100);
    }
    /**
     * 处理记录日志
     */

  }, {
    key: "handleRecordError",
    value: function handleRecordError() {
      try {
        if (!this.msg) {
          return;
        } //过滤掉错误上报地址


        if (this.reportUrl && this.url && this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase()) >= 0) {
          console.log("统计错误接口异常", this.msg);
          return;
        }

        var errorInfo = this.handleErrorInfo();
        console.log("\n````````````````````` " + this.category + " `````````````````````\n", errorInfo); //记录日志

        _taskQueue.default.add(this.reportUrl, errorInfo);
      } catch (error) {
        console.log(error);
      }
    }
    /**
     * 处理错误信息
     * @param {*} extendsInfo 
     */

  }, {
    key: "handleErrorInfo",
    value: function handleErrorInfo() {
      var txt = "错误类别: " + this.category + "\r\n";
      txt += "日志信息: " + this.msg + "\r\n";
      txt += "url: " + encodeURIComponent(this.url) + "\r\n";

      switch (this.category) {
        case _baseConfig.ErrorCategoryEnum.JS_ERROR:
          txt += "错误行号: " + this.line + "\r\n";
          txt += "错误列号: " + this.col + "\r\n";

          if (this.errorObj && this.errorObj.stack) {
            txt += "错误栈: " + this.errorObj.stack + "\r\n";
          }

          break;

        default:
          txt += "其他错误: " + JSON.stringify(this.errorObj) + "\r\n";
          break;
      }

      var deviceInfo = this.getDeviceInfo();
      txt += "设备信息: " + deviceInfo; //设备信息

      var extendsInfo = this.getExtendsInfo();
      var recordInfo = extendsInfo;
      recordInfo.category = this.category; //错误分类

      recordInfo.logType = this.level; //错误级别

      recordInfo.logInfo = txt; //错误信息

      recordInfo.deviceInfo = deviceInfo; //设备信息

      return recordInfo;
    }
    /**
     * 获取扩展信息
     */

  }, {
    key: "getExtendsInfo",
    value: function getExtendsInfo() {
      try {
        var ret = {};
        var extendsInfo = this.extendsInfo || {};
        var dynamicParams;

        if (_utils.default.isFunction(extendsInfo.getDynamic)) {
          dynamicParams = extendsInfo.getDynamic(); //获取动态参数
        } //判断动态方法返回的参数是否是对象


        if (_utils.default.isObject(dynamicParams)) {
          extendsInfo = _objectSpread(_objectSpread({}, extendsInfo), dynamicParams);
        } //遍历扩展信息，排除动态方法


        for (var key in extendsInfo) {
          if (!_utils.default.isFunction(extendsInfo[key])) {
            //排除获取动态方法
            ret[key] = extendsInfo[key];
          }
        }

        return ret;
      } catch (error) {
        console.log('call getExtendsInfo error', error);
        return {};
      }
    }
    /**
     * 获取设备信息
     */

  }, {
    key: "getDeviceInfo",
    value: function getDeviceInfo() {
      try {
        var deviceInfo = _device.default.getDeviceInfo();

        return JSON.stringify(deviceInfo);
      } catch (error) {
        console.log(error);
        return "";
      }
    }
  }]);

  return BaseMonitor;
}();

var _default = BaseMonitor;
exports.default = _default;