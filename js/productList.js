/**
 * Created by WXH on 2017/4/2.
 */
$(function(){
        var $cur = $("#current");
        var pages;
        var $page = $("#page");
        // ��ȡ url��ַ����
        var args = getargs( window.location.search );
        var categoryid = args["categoryid"];
        // ��Ⱦ����������
        $.ajax({
                url:"http://139.199.157.195:9090/api/getcategorybyid?categoryid="+categoryid,
                crossDomain:true,
                error:err,
                success:function(data){
                        $cur.html(data.result[0]["category"]);
                }
        });
        // ��Ⱦ��Ʒ�б�
        getProducts();
        // ѡ��ҳ ί��change�¼���������
        $("#page").on("change",function(){
                getProducts( $(this).attr("value") );
        });
        // ��һҳ
        $(".pre button").on("click",function(){
                getProducts(changePage( $page,pages,-1 ));
                goTop();
        })
        // ��һҳ
        $(".next button").on("click",function(){
                getProducts(changePage( $page,pages,1 ));
                goTop();
        })




        // ��ȡ��Ʒ��Ϣ
        // ��ȡ��Ʒ��Ϣ
        function getProducts(pageid){
                pageid = pageid || 1;
                $.ajax({
                        url:"http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid+"&pageid="+pageid,
                        crossDomain:true,
                        error:err,
                        success:function(data){
                                // ��¼��ҳ��
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