function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import BaseMonitor from '../base/baseMonitor';
import { ErrorLevelEnum, ErrorCategoryEnum } from '../base/baseConfig.js';
import API from '../base/api';
/**
 * 粗略检测网速
 */

var MonitorNetworkSpeed = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(MonitorNetworkSpeed, _BaseMonitor);

  var _super = _createSuper(MonitorNetworkSpeed);

  function MonitorNetworkSpeed(options) {
    var _this;

    _classCallCheck(this, MonitorNetworkSpeed);

    _this = _super.call(this, options || {});
    _this.downloadSize = 241797;
    _this.filePath = 'https://static-venus.shandiantech.com/skio/20210528/1622170352180_chromePerformance1.png';
    _this.startTime = 0;
    _this.endTime = 0;
    _this.timeInterval = 60 * 1000;
    _this.category = ErrorCategoryEnum.NETWORK_SPEED;
    _this.pageId = options.pageId || '';
    _this.url = options.url || '';
    return _this;
  }
  /**
   * 图片大小 bytes
   */


  _createClass(MonitorNetworkSpeed, [{
    key: "now",
    value:
    /**
     * 当前时间
     */
    function now() {
      return performance.now() || performance.webkitNow() || performance.msNow() || performance.oNow() || performance.mozNow() || new Date().getTime();
    }
    /**
     * 上报网络速度
     */

  }, {
    key: "reportNetworkSpeed",
    value: function reportNetworkSpeed() {
      var _this2 = this;

      this.getSpeed(); //定时上报

      setInterval(function () {
        _this2.getSpeed();
      }, this.timeInterval);
    }
    /**
     * 根据XHR获取网速
     */

  }, {
    key: "getSpeed",
    value: function getSpeed() {
      var _this3 = this;

      try {
        var fileSize;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 2) {
            _this3.startTime = Date.now();
          }

          if (xhr.readyState === 4 && xhr.status === 200) {
            _this3.endTime = Date.now();
            fileSize = xhr.responseText.length; //单位（KB/s）

            var speed = fileSize / ((_this3.endTime - _this3.startTime) / 1000) / 1024;
            speed = speed.toFixed(2);

            var extendsInfo = _this3.getExtendsInfo();

            var data = _objectSpread(_objectSpread({}, extendsInfo), {}, {
              category: _this3.category,
              logType: ErrorLevelEnum.INFO,
              logInfo: JSON.stringify({
                curTime: new Date().format('yyyy-MM-dd HH:mm:ss'),
                pageId: _this3.pageId,
                networkSpeed: speed,
                deviceInfo: _this3.getDeviceInfo()
              })
            });

            console.log('````````````````````` network_speed `````````````````````', data);
            new API(_this3.url).report(data);
          }
        };

        xhr.open('GET', this.filePath + '?rand=' + Math.random(), true);
        xhr.send();
      } catch (error) {
        console.log('测试失败：', error);
      }
    }
    /**
     * 第二种方式：获取网络速度
     */

  }, {
    key: "getSpeedByImg",
    value: function getSpeedByImg() {
      var _this4 = this;

      var img = new Image();

      img.onload = function () {
        _this4.endTime = _this4.now();

        _this4.calcSpeed();
      };

      this.startTime = this.now();
      img.src = this.filePath + '?rand=' + this.startTime;
    }
    /**
     * 计算速度
     */

  }, {
    key: "calcSpeed",
    value: function calcSpeed() {
      var duration = (this.endTime - this.startTime) / 1000;
      var bitsLoaded = this.downloadSize * 8;
      var speedBps = (bitsLoaded / duration).toFixed(2);
      var speedKbps = (speedBps / 1024).toFixed(2);
      var speedMbps = (speedKbps / 1024).toFixed(2);
      console.log(speedKbps);
      return {
        speedKbps: speedKbps,
        speedMbps: speedMbps
      };
    }
  }]);

  return MonitorNetworkSpeed;
}(BaseMonitor);

export default MonitorNetworkSpeed;