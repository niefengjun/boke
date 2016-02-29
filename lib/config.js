var isDevelopment = process.env.NODE_ENV == "development" ? true : false;
exports.config = {

    niefengjun: 'mongodb://127.0.0.1:27017/niefengjun',
    title: "聂峰军个人网站",
    secret: '5e7653eceeaa75aff3306a9af15f59ef',
    description: "关注it前沿",
    //栏目设置
    menu: [
        {m: 'nodejs', url: '/category/nodejs.html', name: 'nodejs'}
        , {
            m: 'life',
            url: '/category/life.html',
            name: '生活'
        }
        , {
            m: 'demo',
            url: '/category/demo.html',
            name: 'demo'
        }
        , {m: 'reprint', url: '/category/reprint.html', name: '转载'}
        , {
            m: 'Other',
            url: '/category/Other.html',
            name: '其他'
        }
        , {
            m: '个人履历',
            url: 'http://www.500d.me/niefengjun',
            name: '个人履历'
        }
        , {
            m: '留言板',
            url: 'http://niefengjun.mikecrm.com/f.php?t=68K29M',
            name: '留言板'
        }
    ]
}