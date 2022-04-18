"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseMonitor = _interopRequireDefault(require("../base/baseMonitor.js"));

var _baseConfig = require("../base/baseConfig.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * 资源加载错误
 *
 * 相比window.onerror，通过window.addEventListener的方式我们可以捕获资源加载的错误。
 */
var ResourceError = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(ResourceError, _BaseMonitor);

  var _super = _createSuper(ResourceError);

  function ResourceError(params) {
    _classCallCheck(this, ResourceError);

    return _super.call(this, params);
  }
  /**
   * 注册onerror事件
   */


  _createClass(ResourceError, [{
    key: "handleError",
    value: function handleError() {
      var _this = this;

      window.addEventListener('error', function (event) {
        try {
          if (!event) {
            return;
          }

          _this.category = _baseConfig.ErrorCategoryEnum.RESOURCE_ERROR;
          var target = event.target || event.srcElement;
          var isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;

          if (!isElementTarget) {
            return; // js error不再处理
          }

          _this.level = target.tagName.toUpperCase() === 'IMG' ? _baseConfig.ErrorLevelEnum.WARN : _baseConfig.ErrorLevelEnum.ERROR;
          _this.msg = '加载 ' + target.tagName + ' 资源错误';
          _this.url = target.src || target.href;
          _this.errorObj = target;

          _this.recordError();
        } catch (error) {
          console.log('资源加载收集异常', error);
        }
      }, true);
    }
  }]);

  return ResourceError;
}(_baseMonitor.default);

var _default = ResourceError;
exports.default = _default;