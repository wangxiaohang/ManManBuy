/**
 * Created by WXH on 2017/3/31.
 */
$(function(){

});
function setdiqu(){
        // δʵ��
};
$(function(){
        /*�����Ʒid*/
        var args = getargs(window.location.search),
                id = args[ "productid"],
                type = args[ "type" ];
        var url = "http://139.199.157.195:9090/api/get" + type + "product?productid=" + id;
        /*������Ʒ��Ϣ*/
        $.ajax({
                url:url,
                crossDomain:true,
                error:err,
                success:function(data){
                        $(".pmain").html(template("main",data));
                }
        })
})