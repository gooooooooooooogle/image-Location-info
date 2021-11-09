# image-Location-info

## 简介
离线获取图片拍摄的时间和地点。
离线资源初始化速度慢，并且位置误差大。离线安装包较大。

可通过百度、腾讯、高德、谷歌等提供的实时api，获取实时精确位置信息。
（这些api都要用到开发者key，所以懒得搞）


## 所用技术栈：

- [Electron](https://github.com/electron/electron) 12.1.1
- [Vue](https://github.com/vuejs/vue) 2.6.14
- [electron-vue](https://github.com/SimulatedGREG/electron-vue)
- [element-ui](https://github.com/ElemeFE/element) 2.15.6
- [sharp](https://github.com/lovell/sharp) 0.29.2


## Windows10下环境搭建
- node: 14.17.5
- npm: 6.14.14
- npm config set registry https://registry.npm.taobao.org/
- npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
- Python: 3.x
- 安装[Visual Studio 2017 15.7.2 或更高版本](https://visualstudio.microsoft.com/zh-hans/vs/) 或安装[ Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)

	并执行 npm config set msvs_version 2017
- 为 Electron 安装并重新编译Node原生模块: npm install --save-dev electron-rebuild 

	若windows下遇到问题，尝试执行 .\node_modules\\.bin\electron-rebuild.cmd
- npm install -g node-gyp
## 构建

```

# 安装依赖
npm install

# 开发环境
npm run dev

# 生产环境
npm run build

```

## 界面
 ![结果展示](./imgs/result.jpg)

