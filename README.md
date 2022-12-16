# spm-four

## 提醒
1. 看 vite.config.ts ， src/example/index.html, src/example/example.ts, src/exmaple.vue 里面写的注释，可能能够解决一些小问题。（这个 'example' 用例在 `8b28ab5` 提交中被删除。如果想看，可以回退到这个提交之前查看。）
2. `npm run dev` 运行起来后，如果访问不存在的url, 部分浏览器并不会报错，而是显示一个空白页面。判断页面是否存在，请打开浏览器的开发者工具，查看页面源码文件，是否是空白的（即只有html,body这些标签，其他什么都没有）。建议切换为其他浏览器。
3. live-server插件对于vue页面文件的预览用处不大，缺失vue文件的编译导入。
4. 每个模块（用户管理，作业关系，成绩系统等），为了防止冲突，请在src下创建一个文件夹存放模块相关的代码，文件夹最好是模块的英文名称。
5. 想要使用router的可以直接使用，依赖已经引入。但请注意不要干扰到其他页面。
6. 访问后端的url设计，请按照这样的格式 “/模块的英文/编写人自己确定的内容”。
    例如：用户管理的注册功能，就可以设计为 /user/login。
7. 请注意，可能由于跨域问题，导致前端访问后端的api获取数据失败。最后部署的时候我们会把编译后页面放置在springboot项目中，不存在跨域问题。现阶段，我暂时没有找到测试的时候该如何解决跨域问题，有知道的可以告诉一下，谢谢。
8. 可以写一下参与人，用来测试拉取推送是否正常。
9. 由于前端代码的类型系统太弱，某些问题，使用 `npm run dev` 的时候，无法发现，即不会报错，只能看到空白的浏览器页面。这个时候可以使用`npm run build`去打包，这个时候可以触发更多的报错，发现问题。（推荐使用ts(typescript)，利用其比js(javascript)多的类型系统，节约debug时间。不过使用ts,也会有部分一直不会报告的错误。相比`java`可能调试更麻烦。）
10.登陆注册页面未报错，只有提交数据给后端时使用了post，端口号可改为自己的后端端口号
## 参与人
* small-white0-0
* genji
* simon
* lemon

## 可以忽视的报错
1. tsconfig.config.json，tsconfig.json 中的"@vue/tsconfig/tsconfig.web.json" 可能会被标红报错，但是程序没有出现问题。暂时不明确原因。
2. vite.config.ts 中的import.meta.url 可能被标红报错。疑似是es的标准过低。但是编译可以通过，考虑部分浏览器对es6都不支持，就暂时不提升es标准。

## 开发流程指南
1. clone仓库,使用命令

```sh
git clone git@github.com:small-white0-0/SPM_FOUR_FRONT_END.git
```
或者

```sh
git clone https://github.com/small-white0-0/SPM_FOUR_FRONT_END
```

2. 下载依赖

```sh
npm ci
```

如非必要，请不要使用使用 `npm install`，虽然这个也可以实现下载依赖，但是它会自动修改 package-lock.json,这个并不被推荐。

3. 如果使用vscode,建议安装 vue3 的volar 插件。'Vue Language Features (Volar)',和'TypeScript Vue Plugin (Volar)'。

4. 开发环境的运行命令

```sh
npm run dev
```

5. 编译打包命令

```sh
npm run build
```

这个命令执行后，我们编译的代码会被编译到 dist目录中。（dist如果有内容会被清空）

### 规范要求
1. url 路由，要求每个模块的人要有固定的前缀，不能少。
    1. 成绩管理 =》 /grade-manage
    2. 作业系统 =》 /assignment
    3. 选课系统 =>  /select-course
    4. 用户管理 =>  /user
    5. 静态页面 =》 无
2. 多页面开发模式，每个人在 src目录下建立自己的模块文件夹——文件夹名字要求和`url` 规定的前缀同名。例如： 成绩管理系统，要在src 目录下建立 grade-manage 文件夹。
    目录内结构参考 grade-manage 目录内。
3. 依赖版本，统一使用 package.json，如果引入任何新的插件，必须保证之前代码可运行，并立即上传 package.json 。