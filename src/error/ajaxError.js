import BaseMonitor from '../base/baseMonitor.js';
import { ErrorCategoryEnum, AjaxLibEnum, ErrorLevelEnum } from '../base/baseConfig.js';

/**
 * ajax error异常
 */
class AjaxError {
    constructor(params) {
        this.params = params;
    }
    /**
     * 处理错误
     * @param type {*} ajax库类型
     * @param error{*} 错误信息
     */
    handleError(type, err) {
        switch (type) {
            case AjaxLibEnum.AXIOS:
                new AxiosError(this.params).handleError(err);
                break;
            default:
                new XHRError(this.params).handleError();
                break;
        }
    }
}

export default AjaxError;

/**
 * Axios类库 错误信息处理(如果不配置，可以统一通过XHR接受错误信息)
 */
class AxiosError extends BaseMonitor {
    constructor(params) {
        super(params);
    }

    handleError(error) {
        if (error && error.config && error.config.url) {
            this.url = error.config.url;
        }
        this.level = ErrorLevelEnum.WARN;
        this.category = ErrorCategoryEnum.AJAX_ERROR;
        this.msg = JSON.stringify(error);
        this.recordError();
    }
}

/**
 * 获取HTTP错误信息
 */
class XHRError extends BaseMonitor {
    constructor(params) {
        super(params);
    }

    /**
     * 获取错误信息
     */
    handleError() {
        if (!window.XMLHttpRequest) {
            return;
        }
        let xhrSend = XMLHttpRequest.prototype.send;
        let _handleEvent = (event) => {
            try {
                // 401 未登录
                if (event && event.currentTarget && ![200, 401].includes(event.currentTarget.status)) {
                    this.level = ErrorLevelEnum.WARN;
                    this.category = ErrorCategoryEnum.AJAX_ERROR;
                    this.msg = event.target.response;
                    this.url = event.target.responseURL;
                    this.errorObj = {
                        status: event.target.status,
                        statusText: event.target.statusText
                    };
                    this.recordError();
                }
            } catch (error) {
                console.log(error);
            }
        };
        XMLHttpRequest.prototype.send = function () {
            if (this.addEventListener) {
                // load 事件表示服务器传来的数据接收完毕，error 事件表示请求出错，abort 事件表示请求被中断（比如用户取消请求）
                this.addEventListener('error', _handleEvent);
                this.addEventListener('load', _handleEvent);
                this.addEventListener('abort', _handleEvent);
            } else {
                let tempStateChange = this.onreadystatechange;
                this.onreadystatechange = function (event) {
                    tempStateChange.apply(this, arguments);
                    // 响应已完成
                    if (this.readyState === 4) {
                        _handleEvent(event);
                    }
                };
            }
            return xhrSend.apply(this, arguments);
        };
    }
}
