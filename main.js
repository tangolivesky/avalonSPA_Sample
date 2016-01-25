/**
 * Created by tony on 2016-01-18.
 */

require.config({//第一块，配置
    baseUrl: '',
    paths: {
        avalon: ["js/avalon/avalon"],//必须修改源码，禁用自带加载器，或直接删提AMD加载器模块
        mmHistory: 'js/avalon/mmHistory',
        mmRouter: 'js/avalon/mmRouter',
        text: ['js/require/text'],
        domReady: 'js/require/domReady',
    },
    priority: ['text'],
});


require(['mmRouter',"domReady!"],function(mmRouter,domReady){
    avalon.log("引入avalon");

    var model = avalon.define({
        $id: "root",
        content: "",
    })

    //导航回调
    function callback() {
        var jspath = "modules"; //这里改成您自己的网站地址 ,这个是js路径的变量
        var pagepath = "";       //这个是网页的变量

        var paths = this.path.split("/");
        for (var i = 0; i < paths.length; i++) {
            if (paths[i] != "") {
                jspath += "/" + paths[i];
                pagepath += "_" + paths[i];
            }
        }

        //console.log(jspath);
        //console.log(pagepath);

        require([jspath], function (page) {
            avalon.vmodels.root.content = pagepath;
        });
    }

    avalon.log("加载avalon路由")
    avalon.router.get("/sub1/index", callback)
    avalon.router.get("/sub2/index", callback)
    avalon.history.start({
        basepath: "/avalon"
    })
    avalon.scan()
});

