<!-- TOC -->

- [1. 使用](#1-使用)
- [2. 配置流程](#2-配置流程)

<!-- /TOC -->

![unnuo 2017](./screenshot.jpg)
# 1. 使用

compile files:

    gulp css / gulp scss
    gulp js / gulp es

watch files:

    gulp css:watch
    gulp js:watch

clean files:

    gulp clean:all
    gulp clean:css
    gulp clean:js

# 2. 配置流程

1. Gulp 工程化

  ```bash
  npm config edit

  # registry=https://registry.npm.taobao.org

  npm install gulp -g

  npm install gulp --save-dev

  #创建gulpfile.js,并配置
  ```

2. Scss,Sass,Less 预编译 ,合并, 压缩代码

  ```bash
  npm install gulp-sass gulp-sourcemap --save-dev

  npm install gulp-concat-css --save-dev
  ```

3. ES6 预编译 ,合并, 压缩代码

  ```bash
  npm install gulp-babel babel-preset-env --save-dev

  npm install gulp-concat --save-dev

  npm install uglify --save-dev
  ```

4. clean task 其它任务执行之前的清理，上线之前，清理未压缩文件和map文件

  ```bash
  npm install gulp-clean --save-dev
  ```

5. Karma + Jasmime 单元测试

  ```bash
  npm install karma-cli -g

  npm install karma --save-dev

  karma init

  # 配置 karma.conf.js , 添加 coverage reports

  karma start
  ```

6. 图片压缩

    

7. 搭建协作开发环境
