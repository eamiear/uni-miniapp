# 使用说明

::: tip 描述
[`miniapp`](http://git.on-bright.com:8081/iweb/miniapp) 是基于 [`uni-app`](https://uniapp.dcloud.io/README) 的集成方案，用于开发小程序、H5、APP。包含类 `axios`的请求方式、事件机制、存储、状态管理、路由、模拟服务等。
:::

## 开发

### 安装依赖

```js
npm install
```

### 修改代理服务

打开 `vue.config.js`，修改代理配置：

```javascript

 devServer: {
    proxy: {
      '/pro': {
        target: 'https://aliiot.on-bright.com/control',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/pro': '' // 默认所有请求都加了/pro前缀，需要去掉
        }
      }
    }
  },
```

将 `target` 修改为对应的接口服务路径。注意：此处的 `/pro` 与 `config/envConfig.js` 中的 `DEV_API ` 对应。

如果还没有提供接口服务，可以启动 `mock` 数据服务。打开 `main.js` 文件，启动模拟数据服务 [mock 模拟数据服务](#mock 模拟数据服务)。

```javascript
import './mock'
```

### 启动服务

```javascript
npm run serve // h5

npm run dev:mp-weixin // 小程序
```

## 项目结构

```tree

│  App.vue
│  main.js
│  manifest.json
│  pages.json
│  
├─api
│      login.js
│      system.js
│      
├─config
│      defaultSettings.js
│      envConfig.js
│      
├─mock
│  │  index.js
│  │  util.js
│  │  
│  └─services
│          auth.js
├─pages
│  ├─index
│  │      index.vue
│  │      
│  ├─login
│  │      login.vue
│  ├─mine
│  │      mine.vue
│  └─register
│          reg.vue
│          
├─static
│  │  logo.png
│  │  
│  ├─images
│  │  │  logo.png
│  │  │  
│  │  ├─index
│  │  │      
│  │  ├─mine
│  │  │      
│  │  └─tab
│  │          
│  └─styles
│          app-plain.less
│          app.less
│          variables.less
│          
├─store
│  │  getters.js
│  │  index.js
│  │  mutation-types.js
│  │  
│  └─modules
│          user.js
│          
└─utils
    │  checker.js
    │  debounce.js
    │  helper.js
    │  log.js
    │  logic.js
    │  request.js
    │  router.js
    │  storage.js
    │  util.js
    │  
    ├─http
    │      http.js
    │      util.js
    │      
    └─vue-bus
            index.js
            vue-bus.js
```

### 接口定义

按功能模块定义 `api` 文件。

```text
├─src
│  │  
│  ├─api
│  │      login.js
│  │      system.js
```

### 静态资源

`static` 目录存放图标、公用样式、图片资源。

```text
├─src
│  │  
│  ├─static
│  │  │  
│  │  ├─icons
│  │  │      
│  │  ├─images
│  │  │      
│  │  └─styles
```

### 系统配置

```text
├─src
│  │  
│  ├─config
│  │      defaultSettings.js
│  │      envConfig.js
```

- `defaultSettings.js`：对系统全局进行配置
- `envConfig.js`：系统环境配置

#### `defaultSetting` 系统配置

```js
export default {
  shareContent: '分享内容信息',
  shareLink: '', // 分享url, https://aliiot.on-bright.com/miniapp/share/4
  debug: !isProEnv, // 是否是调试模式。如果是生产环境，设置为false
  info: { // 程序信息
    about: 'help/about',
    version: '',
    copyright: '',
    license: '',
    author: ''
  },
  title: '昂宝小程序',
  logo: 'logo.svg',
  forceLogin: true // 强制登录，用于是否需要登录才能预览系统
}
```

#### `envConfig.js` 环境配置

```javascript
// 开发环境
const DEV_API = '/pro'
// 生产环境API路径
const PRO_API = '/control'
export const WEBSOCKET_URL = '/control/websocket/{topic}'

export const isProEnv = process.env.NODE_ENV === 'production'

// 接口请求基路径
export function getReqBaseUrl () {
  return isProEnv ? PRO_API : DEV_API
}

export const apiHost = getReqBaseUrl()
```

### 网络请求

```text
├─src
│  ├─utils // 工具集
│  │  ├─http
│  │  │      http.js
│  │  │      util.js
|  |  
|  |   request.js
```

`http` 为网络请求的基本封装，`request` 脚本定义请求方法及相关配置定义。

定义了几个常用请求方法。`getAction`、`postAction`、`putAction`、`deleteAction`、、`getRequestUrl`，其中 `getRequestUrl` 为获取当前请求路径，主要用于下载或文件绝对路径。

调用示例：

```js
const { getAction, postAction, putAction, deleteAction, getRequestUrl } from '@/utils/request'
```

## mock 模拟数据服务

对接口进行代理转发，获取接口模拟数据。

```text
├─mock
│  │  index.js
│  │  util.js
│  │  
│  └─services
│          auth.js
│          manage.js
│          system.js
```

具体定义查阅 `mock/services/` 下的文件，最后在 `index.js` 中引用。

## `pages.json` 页面配置

详情查看 [uni-app 文档说明](https://uniapp.dcloud.io/collocation/pages)

----

::: tip `APP` 全局变量的问题
使用 `vscode` 开发 `APP` 时需取消 `less` 全局变量的引用，构建时会出现问题，暂无解决方案。可通过 `Hbuilderx` 对 `less` 进行编译再构建系统，导出 `APP` 资源文件。
:::