import { BrowserRouter } from 'react-router-dom'
import { http } from '@lvxiaowu/utils'
import { MonitorJS } from '@lvxiaowu/monitor'
import './app.less'

new MonitorJS().init({
  jsError: true,
  promiseError: true,
  resourceError: true,
  ajaxError: true,
  consoleError: false, //console.error默认不处理
  vueError: false,
  url: 'https://test.com', //错误上报地址
  extendsInfo: {
    //自定义扩展信息，一般用于数据持久化区分
    a: '', //自定义信息a（名称可自定义）
    getDynamic: () => {
      //获取动态传参
    },
  },
})

http.setConfig({
  baseURL() {
    return {
      dev: 'https://dev.com/api',
      test: 'https://test.com/api',
      pre: 'https://pre.com/api',
      prod: 'https://prod.com/api',
    }[__ENV__]
  },
  transformResult(res) {
    const { code, data, msg } = res.data || {}
    if (code === 200) {
      return data
    }
    console.error(msg)
    return Promise.reject(msg)
  },
  error(e) {
    console.error(e.message)
  },
})
export default function App({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>
}
