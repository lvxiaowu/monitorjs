function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 错误类型枚举
 */
export var ErrorCategoryEnum = /*#__PURE__*/function () {
  function ErrorCategoryEnum() {
    _classCallCheck(this, ErrorCategoryEnum);
  }

  _createClass(ErrorCategoryEnum, null, [{
    key: "JS_ERROR",
    get:
    /**
     * js 错误
     */
    function get() {
      return "js_error";
    }
    /**
     * 资源引用错误
     */

  }, {
    key: "RESOURCE_ERROR",
    get: function get() {
      return "resource_error";
    }
    /**
     * Vue错误
     */

  }, {
    key: "VUE_ERROR",
    get: function get() {
      return "vue_error";
    }
    /**
     * promise 错误
     */

  }, {
    key: "PROMISE_ERROR",
    get: function get() {
      return "promise_error";
    }
    /**
     * ajax异步请求错误
     */

  }, {
    key: "AJAX_ERROR",
    get: function get() {
      return "ajax_error";
    }
    /**
     * 控制台错误console.info
     */

  }, {
    key: "CONSOLE_INFO",
    get: function get() {
      return "console_info";
    }
    /**
     * 控制台错误console.warn
     */

  }, {
    key: "CONSOLE_WARN",
    get: function get() {
      return "console_warn";
    }
    /**
     * 控制台错误console.error
     */

  }, {
    key: "CONSOLE_ERROR",
    get: function get() {
      return "console_error";
    }
    /**
     * 跨域js错误
     */

  }, {
    key: "CROSS_SCRIPT_ERROR",
    get: function get() {
      return "cross_srcipt_error";
    }
    /**
     * 未知异常
     */

  }, {
    key: "UNKNOW_ERROR",
    get: function get() {
      return "unknow_error";
    }
    /**
     * 性能上报
     */

  }, {
    key: "PERFORMANCE",
    get: function get() {
      return "performance";
    }
    /**
     * 网速上报
     */

  }, {
    key: "NETWORK_SPEED",
    get: function get() {
      return "network_speed";
    }
  }]);

  return ErrorCategoryEnum;
}();
/**
 * 错误level枚举
 */

export var ErrorLevelEnum = /*#__PURE__*/function () {
  function ErrorLevelEnum() {
    _classCallCheck(this, ErrorLevelEnum);
  }

  _createClass(ErrorLevelEnum, null, [{
    key: "ERROR",
    get:
    /**
     * 错误信息
     */
    function get() {
      return "Error";
    }
    /**
     * 警告信息
     */

  }, {
    key: "WARN",
    get: function get() {
      return "Warning";
    }
    /**
     * 日志信息
     */

  }, {
    key: "INFO",
    get: function get() {
      return "Info";
    }
  }]);

  return ErrorLevelEnum;
}();
/**
 * Ajax库枚举
 */

export var AjaxLibEnum = /*#__PURE__*/function () {
  function AjaxLibEnum() {
    _classCallCheck(this, AjaxLibEnum);
  }

  _createClass(AjaxLibEnum, null, [{
    key: "AXIOS",
    get: function get() {
      return 'axios';
    }
  }, {
    key: "DEFAULT",
    get: function get() {
      return 'default';
    }
  }]);

  return AjaxLibEnum;
}();