#blog_es6
一、项目准备

1.nodejs+express+nedb

介绍一下NEDB： 采用Node嵌入式数据存储 NeDB来操作数据。Node.js 实现的嵌入式数据存储，可以部分或全部替代sqlite数据库。可以当内存数据库使用也可本地存储。 NEDB采用非常灵活的查询方式，让你几乎可以忘记他是非关系数据库： (1) 可以使用正则查询 (2) and or where 大于 小于 排序等 (3) 索引

数据存储采用JSON新式，可以深度查询， 跟mongodb使用方法基本一样

ndeb:https://github.com/louischatriot/nedb#creatingloading-a-database

使用npm安装express：

npm install express-generator -g

//-h 选项可以列出所有可用的命令行选项： $ express -h

//使用express npm创建项目 $ express -e myblog $ cd myblog $ sudo npm install --save

2、把项目用git提交到coding上

1)、新建项目

2)、添加项目信息

README：一般项目中都会添加一个README文件对项目进行概述，以便一目了然地知道这个项目是做什么用的，如何使用等信息。README文件采用markdown语法书写。

开源许可证：定义该项目的传播方式，比如他人是否可以商业化使用该项目，他人是否可以随意传播、发布、更改该项目。

.gitignore文件：该文件可以定义哪些文件不添加到仓库中，比如项目产生的临时文件。

3)、将项目克隆到本地

1）拷贝地址 项目git链接地址：找到新建远程仓库的地址并拷贝下来。

2）克隆 打开终端（Mac），输入如下命令。

$ cd /WorkSpace // 找个放空项目的地方 
$ git clone https://coding.net/yourusername/projectname.git //克隆

4)、换壳

换壳顾名思义，把自己原来项目的内容放到克隆下来的空项目这个新壳中。具体而言，把原来项目文件夹下的所有文件移动到克隆下来的项目的目录下（例子中即WorkSpace下的文件夹 projectname中）。

5)、将项目文件纳入 git 版本管理并提交到远程仓库

执行下列命令：
$ cd myblog  //转到项目文件夹下
$ git add .  // 追踪新文件，并放到暂存区
$ git commit -m "first commit" //将文件纳入本地仓库
$ git push  // 将本地仓库同步到远端仓库

刷新远端仓库的页面，可以发现代码已经上传到远端仓库了。

二、开始配置项目：

启动文件分为两个：前台启动文件app.js、后台启动文件admin.js

配置文件的时候出错了，原因是我package.json里面的express版本是3.6的，但使用了4.0以上的版本，所以方法报错了。

补充package.json的知识：

这个package.json 文件就是定义了项目的各种元信息，包括项目的名称，git repo 的地址，作者等等。 最重要的是，其中定义了我们项目的依赖，这样这个项目在部署时，我们就不必将 node_modules 目录也上传到服务器， 服务器在拿到我们的项目时，只需要执行 npm install，则 npm 会自动读取 package.json 中的依赖并安装在项目的 node_modules 下面，然后程序就可以在服务器上跑起来了。

在package.json里面定义了我项目需要的依赖，然后npm install 安装进来

然后配置好启动文件：这里我用了两个，一个前台一个后台。使用nodemon命令可以同时启动，想单独启动的话:nodemon 启动文件名

其实是启动了后台的文件，然后在里面引入了前台文件，然后启动服务。

启动文件里 :

用了log4j模块写了日志

还用了ueditor编辑器：知识点：http://blog.163.com/ch_xy/blog/static/2475200502015316113454850/

//这里列一下启动文件app.js需要配置的地方

//该配置用于接收前台界面上传单张及多张图片的请求。
//需要在ueditor中创建一个image文件夹，用以保存上传的图片。
//需要配置config.json文件，直接将php目录中的config.json复制出来就行。
//配置好后重新启动，应该就能上传图片了。
app.js里面要放在404前面，要不然就404错误了
app.use("/ueditor/ue/", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求

    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname =req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    //else if (req.query.action === 'catchimage') {
    //
    //    var img_url = '/images/ueditor/';
    //    res.ue_up(img_url); // 客户端会列出 dir_url 目录下的所有图片
    //}
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


