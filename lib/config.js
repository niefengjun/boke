exports.config = {

    title: "聂峰军笔记",
    secret: '5e7653eceeaa75aff3306a9af15f59ef',
    description: "关注it前沿",
    //栏目设置
    menu: [
        {m: 'nodejs', url: '/category/nodejs.html', name: 'nodejs'},
        {m: 'life', url: '/category/life.html', name: '生活'},
        {m: 'yuanchuang', url: '/category/yuanchuang.html', name: '原创'},
        {m: 'demo', url: '/category/demo.html', name: 'demo'},
        {m: 'reprint', url: '/category/reprint.html', name: '转载'},
        {m: 'Other', url: '/category/Other.html', name: '其他'},
        {m: '个人履历', url: '//www.500d.me/niefengjun', name: '个人履历'},
        {m: '留言板', url: '//niefengjun.mikecrm.com/f.php?t=68K29M', name: '留言板'}
    ] ,

    /*
      微信配置相关
     */
    mp:'niefengjun',
    "wx_niefengjun": {
        "appid": "wx5cf362bf73906352",
        "appsecret": "7557e541b12836e4af8a34210206d85c",
        "token": "niefengjun",
        "encodingAESKey": "jY9Y5FIZu0rYAEe22YEUrT8C6JLdEjoUNkQ4rCtD5ef",
        "callURL": "http://www.niefengjun.cn/",
        "urldomain": "http://www.niefengjun.cn/",
        //登陆完成后跳转地址
        "text": "欢迎关注聂峰军测试号"
    },
    mp:'shenghuoyidiantong',
    "wx_shenghuoyidiantong": {
        "appid": "wxcd787c8b98c21e95",
        "appsecret": "9b664fff8aaf1dbfee80f415174e7be3",
        "token": "shenghuoyidiantong",
        "encodingAESKey": "jY9Y5FIZu0rYAEe22YEUrT8C6JLdEjoUNkQ4rCtD5ef",
        "callURL": "http://www.niefengjun.cn/",
        "urldomain": "http://www.niefengjun.cn/",
        //登陆完成后跳转地址
        "text": "欢迎关注生活一点通"
    },
}