/**
 * Created by WXH on 2017/4/1.
 */
$(function(){
        // 全局变量，记录 列表是否被渲染
        var arr = [];
        // 渲染标题
        $.ajax({
                url:"http://139.199.157.195:9090/api/getcategorytitle",
                crossDomain:true,
                error:err,
                success:function(data){
                        $(".main ul").html( template("ltit",data) );
                }
        });
        // 标题 绑定 点击事件
        $(".main ul").on("click","h3",function(){
                var titleid = $(this).attr("data-titleid");
                var $list = $(this).next(".list");
                var $lis = $(this).parent().siblings();
                // 渲染列表
                if( !arr[ titleid ] ){ // 添加自定义属性，每次点击都会访问dom元素，降低性能
                        getList( titleid , function(data){
                                $list.html( template("list",data) );
                        } );
                        arr[ titleid ] = 1;
                }
                // 旋转箭头
                $(this).find("i").toggleClass("top");
                // 显示隐藏 列表
                $lis.find("h3").find("i").removeClass("top");
                $lis.find("ul").removeClass("show");
                $list.toggleClass("show");
        });

        // 通过titleid获得列表
        function getList( titleid , fn ){
                $.ajax({
                        url:"http://139.199.157.195:9090/api/getcategory?titleid="+titleid,
                        crossDomain:true,
                        error:err,
                        success:function(data){
                                fn( data );
                        }
                })
        }
})