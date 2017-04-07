/**
 * Created by WXH on 2017/4/2.
 */
$(function(){
        var $cur = $("#current");
        var pages;
        var $page = $("#page");
        // 获取 url地址参数
        var args = getargs( window.location.search );
        var categoryid = args["categoryid"];
        // 渲染导航条数据
        $.ajax({
                url:"http://139.199.157.195:9090/api/getcategorybyid?categoryid="+categoryid,
                crossDomain:true,
                error:err,
                success:function(data){
                        $cur.html(data.result[0]["category"]);
                }
        });
        // 渲染商品列表
        getProducts();
        // 选择页 委托change事件监听程序
        $("#page").on("change",function(){
                getProducts( $(this).attr("value") );
        });
        // 上一页
        $(".pre button").on("click",function(){
                getProducts(changePage( $page,pages,-1 ));
                goTop();
        })
        // 下一页
        $(".next button").on("click",function(){
                getProducts(changePage( $page,pages,1 ));
                goTop();
        })




        // 获取商品信息
        // 获取商品信息
        function getProducts(pageid){
                pageid = pageid || 1;
                $.ajax({
                        url:"http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid+"&pageid="+pageid,
                        crossDomain:true,
                        error:err,
                        success:function(data){
                                // 记录总页数
                                if( !pages ){
                                        pages = Math.ceil(data[ "totalCount"] / data[ "pagesize" ]);
                                        var opts = pages == 0 ? ["<option value='1'>1 / 0</option>"] : setpages(pages);
                                        $page.html( opts.join("") );
                                }
                                $("ul.products").html( productListCRender(data) );
                        }
                })
        }
})