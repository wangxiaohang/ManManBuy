/**
 * Created by WXH on 2017/4/5.
 */
$(function(){
        // ���󵼺�����
        $.ajax({
                url:"http://139.199.157.195:9090/api/getbaicaijiatitle",
                dataType:"jsonp",
                error:err,
                success:function(data){
                        $(".nav ul").html(template("navs",data));
                        // ��̬����ul���
                        var w = 0, lis = $(".nav ul li");
                        lis.each(function(){
                                w += $(this).width();
                        })
                        /*???Ϊʲô��������Ŀ�ȣ����ǻἷ����*/
                        $(".nav ul").width( w + 1 );
                }
        });
});