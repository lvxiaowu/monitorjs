"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 数据持久化
 */
var API = /*#__PURE__*/function () {
  function API(url) {
    _classCallCheck(this, API);

    this.url = url;
  }
  /**
   * 上报信息 （默认方式）
   * isFetch ：是否优先通过fetch上报
   */


  _createClass(API, [{
    key: "report",
    value: function report(data, isFetch) {
      if (!this.checkUrl(this.url)) {
        console.log('上报信息url地址格式不正确,url=', this.url);
        return;
      }

      this.sendInfo(data, isFetch);
    }
    /**
     * 发送消息
     * 
     * 缺点：1. 有严格的跨域限制、携带cookie问题。
            2. 上报请求可能会阻塞业务。
            3. 请求容易丢失（被浏览器强制cancel）
     */

  }, {
    key: "sendInfo",
    value: function sendInfo(data, isFetch) {
      var dataStr = JSON.stringify(data);

      try {
        if (fetch && isFetch) {
          fetch(this.url, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: dataStr,
            mode: 'same-origin',
            // 告诉浏览器是同源，同源后浏览器不会进行预检请求
            keepalive: true // 当设置为 true 时，保证不管发送请求的页面关闭与否，请求都会持续到结束。

          });
          return;
        }
      } catch (error) {
        console.log('fetch请求异常', error);
      }

      try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.url, true); //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(dataStr);
      } catch (error) {
        console.log(error);
      }
    }
    /**
     * 通过img方式上报信息
     *
     * 由于浏览器对资源文件的区别对待，为了解决上面的几个问题，我们可以通过创建一个1x1大小的图片进行异步加载的方式来上报。
     * 图片天然可跨域，又能兼容所有的浏览器，而js和css等其他资源文件则可能出现安全拦截和跨域加载问题。
     *
     * 注意：但由于是一个get请求，上报的数据量在不同的浏览器下上限不一致（2kb-8kb），
     * 这就可能出现超出长度限制而无法上报完整数据的情况。因此，图片上报也是一个“不安全”的方式。
     * 1 x 1 的 gif，相比于 BMP/PNG 体积最小，可以节约 41% / 35% 的网络资源小
     */

  }, {
    key: "reportByImg",
    value: function reportByImg(data) {
      if (!this.checkUrl(this.url)) {
        console.log('上报信息url地址格式不正确,url=', this.url);
        return;
      }

      try {
        var img = new Image();
        img.src = this.url + '?v=' + new Date().getTime() + '&' + this.formatParams(data);
      } catch (error) {
        console.log(error);
      }
    }
    /**
     * sendBeacon上报
     * post 请求
     * 这个方法天生就是为了数据统计而设计的，它解决了XMLHttpRequest和图片上报的绝大部分弊端：
     * 没有跨域问题、不阻塞业务，甚至能在页面unload阶段继续发送数据，
     * 完美地解决了普通请求在unload阶段被cancel导致丢数据的问题，唯一的问题就是IE并不支持。
     *
     * 注意：sendBeacon并不像XMLHttpRequest一样可以直接指定Content-Type，且不支持application/json等常见格式。
     * data 可以是任意类型（字符串、表单对象、二进制对象等等）。
     */

  }, {
    key: "reportByNavigator",
    value: function reportByNavigator(data) {
      navigator.sendBeacon && navigator.sendBeacon(this.url, data);
    }
    /*
     *格式化参数
     */

  }, {
    key: "formatParams",
    value: function formatParams(data) {
      var arr = [];

      for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
      }

      return arr.join('&');
    }
    /**
     * 检测URL
     */

  }, {
    key: "checkUrl",
    value: function checkUrl(url) {
      if (!url) {
        return false;
      }

      var urlRule = /^[hH][tT][tT][pP]([sS]?):\/\//;
      return urlRule.test(url);
    }
  }]);

  return API;
}();

var _default = API;
exports.default = _default;