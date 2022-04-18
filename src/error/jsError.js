import BaseMonitor from '../base/baseMonitor.js';
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js';
/**
 * 捕获JS错误
 *
 * 能捕获所有同步执行错误
 * 不能捕获语法错误。
 * 能捕获普通异步任务错误。
 * 不能捕获Promise任务错误。
 * 不能捕获async任务错误。
 * 不能捕获资源加载错误。
 */
class JSError extends BaseMonitor {
    constructor(params) {
        super(params);
    }

    /**
     * 注册onerror事件
     */
    handleError() {
        window.onerror = (msg, url, line, col, error) => {
            try {
                this.level = ErrorLevelEnum.WARN;
                this.category = ErrorCategoryEnum.JS_ERROR;
                this.msg = msg;
                this.url = url;
                this.line = line;
                this.col = col;
                this.errorObj = error;
                this.recordError();
            } catch (error) {
                console.log('js错误异常', error);
            }
        };
    }
}
export default JSError;
