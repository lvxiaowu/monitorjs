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
 * vue错误
 */
var VueError = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(VueError, _BaseMonitor);

  var _super = _createSuper(VueError);

  function VueError(params) {
    _classCallCheck(this, VueError);

    return _super.call(this, params);
  }
  /**
   * 处理Vue错误提示
   */


  _createClass(VueError, [{
    key: "handleError",
    value: function handleError(Vue) {
      var _this = this;

      if (!Vue) {
        return;
      }

      Vue.config.errorHandler = function (error, vm, info) {
        try {
          var metaData = {
            message: error.message,
            stack: error.stack,
            info: info
          };

          if (Object.prototype.toString.call(vm) === '[object Object]') {
            metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
            metaData.propsData = vm.$options.propsData;
          }

          _this.level = _baseConfig.ErrorLevelEnum.WARN;
          _this.msg = JSON.stringify(metaData);
          _this.category = _baseConfig.ErrorCategoryEnum.VUE_ERROR;

          _this.recordError();
        } catch (error) {
          console.log("vue错误异常", error);
        }
      };
    }
  }]);

  return VueError;
}(_baseMonitor.default);

var _default = VueError;
exports.default = _default;