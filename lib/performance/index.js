"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _performance = _interopRequireDefault(require("./performance.js"));

var _device = _interopRequireDefault(require("../device"));

var _baseMonitor = _interopRequireDefault(require("../base/baseMonitor"));

var _baseConfig = require("../base/baseConfig.js");

var _api = _interopRequireDefault(require("../base/api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var MonitorPerformance = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(MonitorPerformance, _BaseMonitor);

  var _super = _createSuper(MonitorPerformance);

  function MonitorPerformance(options) {
    var _this;

    _classCallCheck(this, MonitorPerformance);

    _this = _super.call(this, options || {});
    options.isPage = options.isPage !== false;
    options.isResource = options.isResource !== false;
    _this.isPage = options.isPage; //是否上报页面性能数据

    _this.isResource = options.isResource; //是否上报页面资源数据

    _this.usefulType = _this.getSourceType(options);
    _this.outTime = 50;
    _this.config = {
      resourceList: [],
      //资源列表
      performance: {} //页面性能列表

    };
    _this.category = _baseConfig.ErrorCategoryEnum.PERFORMANCE;
    _this.pageId = options.pageId || "";
    _this.url = options.url || "";
    return _this;
  }
  /**
   * 获取需要上报资源数据类型
   * @param {*} options 
   */


  _createClass(MonitorPerformance, [{
    key: "getSourceType",
    value: function getSourceType(options) {
      var usefulType = []; //'navigation'

      options.isRScript !== false && usefulType.push('script'); //资源数据细分，是否上报script数据

      options.isRCSS !== false && usefulType.push('css'); //资源数据细分，是否上报CSS数据

      options.isRFetch !== false && usefulType.push('fetch'); //资源数据细分，是否上报Fetch数据

      options.isRXHR !== false && usefulType.push('xmlhttprequest'); //资源数据细分，是否上报XHR数据

      options.isRLink !== false && usefulType.push('link'); //资源数据细分，是否上报Link数据

      options.isRIMG !== false && usefulType.push('img'); //资源数据细分，是否上报IMG数据

      return usefulType;
    }
    /**
     * 记录页面信息
     * @param {*} options  {pageId ：页面标示,url ：上报地址}
     */

  }, {
    key: "record",
    value: function record() {
      try {
        if (this.isPage) {
          this.config.performance = _performance.default.getTiming();
        }

        if (this.isResource) {
          this.config.resourceList = _performance.default.getEntries(this.usefulType);
        }

        var result = {
          curTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
          performance: this.config.performance,
          resourceList: this.config.resourceList,
          markUser: this.markUser(),
          markUv: this.markUv(),
          pageId: this.pageId,
          deviceInfo: this.getDeviceInfo()
        };
        var extendsInfo = this.getExtendsInfo();

        var data = _objectSpread(_objectSpread({}, extendsInfo), {}, {
          category: this.category,
          logType: _baseConfig.ErrorLevelEnum.INFO,
          logInfo: JSON.stringify(result)
        });

        console.log("report data =", data);
        localStorage.setItem("page_performance", JSON.stringify(data)); //发送监控数据

        new _api.default(this.url).report(data, true);
        this.clearPerformance();
      } catch (error) {
        console.log("性能信息上报异常", error);
      }
    }
  }, {
    key: "randomString",
    value: function randomString(len) {
      len = len || 10;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
      var maxPos = $chars.length;
      var pwd = '';

      for (var i = 0; i < len; i++) {
        pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
      }

      return pwd + new Date().getTime();
    }
    /**
     * 获得markpage
     */

  }, {
    key: "markUser",
    value: function markUser() {
      var psMarkUser = sessionStorage.getItem('ps_markUser') || '';

      if (!psMarkUser) {
        psMarkUser = this.randomString();
        sessionStorage.setItem('ps_markUser', psMarkUser);
      }

      return psMarkUser;
    }
    /**
     * 获得Uv
     */

  }, {
    key: "markUv",
    value: function markUv() {
      var date = new Date();
      var psMarkUv = localStorage.getItem('ps_markUv') || '';
      var datatime = localStorage.getItem('ps_markUvTime') || '';
      var today = date.format("yyyy/MM/dd 23:59:59");

      if (!psMarkUv && !datatime || date.getTime() > datatime * 1) {
        psMarkUv = this.randomString();
        localStorage.setItem('ps_markUv', psMarkUv);
        localStorage.setItem('ps_markUvTime', new Date(today).getTime());
      }

      return psMarkUv;
    }
  }, {
    key: "clearPerformance",
    value: function clearPerformance() {
      if (window.performance && window.performance.clearResourceTimings) {
        performance.clearResourceTimings();
        this.config.performance = {};
        this.config.resourceList = '';
      }
    }
  }]);

  return MonitorPerformance;
}(_baseMonitor.default);

var _default = MonitorPerformance;
exports.default = _default;