/**
 * Created by WXH on 2017/4/4.
 */
$(function(){
        // 存储所有数据
        var data = {};
        // 记录是否加载完
        var rendered = false;
        // 加载数据
        $.ajax({
                url:"http://139.199.157.195:9090/api/getinlanddiscount",
                crossDomain:true,
                error:err,
                success:function(d){
                        data = d;
                        // 渲染 页面
                        render();
                        rendered = true;
                }
        });

        // 懒渲染
        $(window).on("scroll",function(){
                var height = $("header").height() + $(".main").height() - $(window).height();
                // 滑到底部 有数据可以显示
                if( $(document.body).scrollTop() >= height && data.result.length > 0 && rendered ){
                        // 渲染页面
                        render();
                }
        })



        // 渲染页面
        function render(){
                // 存储要渲染的数据
                var tempData = {result:[]};
                // 获得要渲染的数据
                // 每次渲染4条数据
                var len = data.result.length < 4 ? data.result.length : 4;
                for( var i = 0 ; i < len ; i++ ){
                        tempData.result.push( data.result.shift() );
                }
                // 渲染
                $(".pmain > ul").append( template("product",tempData) );
        }
})