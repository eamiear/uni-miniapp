// 判断环境不是 prod，加载 mock 服务
if (process.env.NODE_ENV !== 'production') {
  console.log('mock mounting')
  const Mock = require('better-mock/dist/mock.mp.js')
  require('./services/auth')
  require('./services/user')
  require('./services/manage')
  require('./services/system')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('mock mounted')
}
