"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MonitorJS", {
  enumerable: true,
  get: function get() {
    return _monitorjs.default;
  }
});

var _monitorjs = _interopRequireDefault(require("./monitorjs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.MonitorJS = _monitorjs.default;