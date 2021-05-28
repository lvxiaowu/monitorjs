"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseMonitor = _interopRequireDefault(require("../base/baseMonitor.js"));

var _baseConfig = require("../base/baseConfig.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
 * console.error异常
 */
var ConsoleError = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(ConsoleError, _BaseMonitor);

  var _super = _createSuper(ConsoleError);

  function ConsoleError(params) {
    _classCallCheck(this, ConsoleError);

    return _super.call(this, params);
  }
  /**
   * 处理console事件
   */


  _createClass(ConsoleError, [{
    key: "handleError",
    value: function handleError() {
      this.registerInfo();
      this.registerWarn();
      this.registerError();
    }
    /**
     * 处理信息
     */

  }, {
    key: "registerInfo",
    value: function registerInfo() {
      var t = this;

      console.tInfo = function () {
        t.handleLog(_baseConfig.ErrorLevelEnum.INFO, _baseConfig.ErrorCategoryEnum.CONSOLE_INFO, arguments);
      };
    }
    /**
     * 处理警告
     */

  }, {
    key: "registerWarn",
    value: function registerWarn() {
      var t = this;

      console.tWarn = function () {
        t.handleLog(_baseConfig.ErrorLevelEnum.WARN, _baseConfig.ErrorCategoryEnum.CONSOLE_WARN, arguments);
      };
    }
    /**
     * 处理错误
     */

  }, {
    key: "registerError",
    value: function registerError() {
      var t = this;

      console.tError = function () {
        t.handleLog(_baseConfig.ErrorLevelEnum.ERROR, _baseConfig.ErrorCategoryEnum.CONSOLE_ERROR, arguments);
      };
    }
    /**
     * 处理日志
     */

  }, {
    key: "handleLog",
    value: function handleLog(level, category, args) {
      try {
        this.level = level;

        var params = _toConsumableArray(args);

        this.msg = params.join("\r\n"); //换行符分割

        this.url = location.href; //当前地址

        this.category = category;
        this.recordError();
      } catch (error) {
        console.log("console统计错误异常", level, error);
      }
    }
  }]);

  return ConsoleError;
}(_baseMonitor.default);
/**
 * 初始化console事件
 */


(function () {
  //创建空console对象，避免JS报错  
  if (!window.console) {
    window.console = {};
  }

  var funcs = ['tInfo', 'tWarn', 'tError'];
  funcs.forEach(function (func, index) {
    if (!console[func]) {
      console[func] = function () {};
    }
  });
})();

var _default = ConsoleError;
exports.default = _default;