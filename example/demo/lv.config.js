const defineSdConfig = require('@lvxiaowu/admin/lib/defineSdConfig')

module.exports = defineSdConfig({
  px2viewport: true,
  eslint: false,
  externals: {
    mobx: {
      name: 'mobx',
      script: {
        development: '//static-venus.shandiantech.com/common/mobx@6.3.2.development.js',
        production: '//static-venus.shandiantech.com/common/mobx@6.3.2.js',
      },
    },
    'mobx-react-lite': {
      name: 'mobxReactLite',
      script: {
        development: '//static-venus.shandiantech.com/common/mobx-react-lite@3.2.0.development.js',
        production: '//static-venus.shandiantech.com/common/mobx-react-lite@3.2.0.js',
      },
    },
    axios: {
      name: 'axios',
      script: {
        development: '//static-venus.shandiantech.com/common/axios@0.21.1.development.js',
        production: '//static-venus.shandiantech.com/common/axios@0.21.1.js',
      },
    },
  },
})
