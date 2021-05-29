"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseMonitor = _interopRequireDefault(require("../base/baseMonitor.js"));

var _baseConfig = require("../base/baseConfig.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ajax error异常
 */
var AjaxError = /*#__PURE__*/function () {
  function AjaxError(params) {
    _classCallCheck(this, AjaxError);

    this.params = params;
  }
  /**
   * 处理错误
   * @param type {*} ajax库类型
   * @param error{*} 错误信息
   */


  _createClass(AjaxError, [{
    key: "handleError",
    value: function handleError(type, err) {
      switch (type) {
        case _baseConfig.AjaxLibEnum.AXIOS:
          new AxiosError(this.params).handleError(err);
          break;

        default:
          new XHRError(this.params).handleError();
          break;
      }
    }
  }]);

  return AjaxError;
}();

var _default = AjaxError;
/**
 * Axios类库 错误信息处理(如果不配置，可以统一通过XHR接受错误信息)
 */

exports.default = _default;

var AxiosError = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(AxiosError, _BaseMonitor);

  var _super = _createSuper(AxiosError);

  function AxiosError(params) {
    _classCallCheck(this, AxiosError);

    return _super.call(this, params);
  }

  _createClass(AxiosError, [{
    key: "handleError",
    value: function handleError(error) {
      if (error && error.config && error.config.url) {
        this.url = error.config.url;
      }

      this.level = _baseConfig.ErrorLevelEnum.WARN;
      this.category = _baseConfig.ErrorCategoryEnum.AJAX_ERROR;
      this.msg = JSON.stringify(error);
      this.recordError();
    }
  }]);

  return AxiosError;
}(_baseMonitor.default);
/**
 * 获取HTTP错误信息
 */


var XHRError = /*#__PURE__*/function (_BaseMonitor2) {
  _inherits(XHRError, _BaseMonitor2);

  var _super2 = _createSuper(XHRError);

  function XHRError(params) {
    _classCallCheck(this, XHRError);

    return _super2.call(this, params);
  }
  /**
   * 获取错误信息
   */


  _createClass(XHRError, [{
    key: "handleError",
    value: function handleError() {
      var _this = this;

      if (!window.XMLHttpRequest) {
        return;
      }

      var xhrSend = XMLHttpRequest.prototype.send;

      var _handleEvent = function _handleEvent(event) {
        try {
          // 401 未登录
          if (event && event.currentTarget && ![200, 401].includes(event.currentTarget.status)) {
            _this.level = _baseConfig.ErrorLevelEnum.WARN;
            _this.category = _baseConfig.ErrorCategoryEnum.AJAX_ERROR;
            _this.msg = event.target.response;
            _this.url = event.target.responseURL;
            _this.errorObj = {
              status: event.target.status,
              statusText: event.target.statusText
            };

            _this.recordError();
          }
        } catch (error) {
          console.log(error);
        }
      };

      XMLHttpRequest.prototype.send = function () {
        if (this.addEventListener) {
          this.addEventListener('error', _handleEvent);
          this.addEventListener('load', _handleEvent);
          this.addEventListener('abort', _handleEvent);
        } else {
          var tempStateChange = this.onreadystatechange;

          this.onreadystatechange = function (event) {
            tempStateChange.apply(this, arguments);

            if (this.readyState === 4) {
              _handleEvent(event);
            }
          };
        }

        return xhrSend.apply(this, arguments);
      };
    }
  }]);

  return XHRError;
}(_baseMonitor.default);