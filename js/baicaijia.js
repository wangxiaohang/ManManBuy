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
                        // .nav��touch�¼�
                        // �������
                        var dis = 100,
                                lw = $(".nav ul").width(), sw = $(".nav").width() ;
                        tapX({
                                // �� touch�¼� �Ķ���
                                o : $(".nav"),
                                // �����Ķ���
                                so : $(".nav ul"),
                                // ���ṩ����������������
                                //min_s : sw - lw - dis,
                                //max_s : dis,
                                min_d : sw - lw,
                                max_d : 0
                        });
                }
        });
        // ��Ⱦҳ��
        renderproduct( 0 );
        // �������󶨵���¼�
        $(".nav ul").on("click","li",function(){
                // �ı���ʽ
                $(this).addClass("active").siblings().removeClass("active");
                // ��Ⱦ����
                renderproduct( $(this).attr( "data-titleid" ) );
        });
        // ��Ⱦҳ�� ��Ʒ����
        function renderproduct( titleid ){
                $.ajax({
                        url:"http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleid,
                        error:err,
                        success:function(data){
                                $(".main ul").html( template("main",data) );
                        }
                })
        };
        // ���� С��100px ��top��ť����ʾ
        // ���� 100px��top��ť��ʼ��ʾ��
        // 100px-150px͸������0��Ϊ0.8,
        // ���� ���� 100px,top��ť ͸����Ϊ0.8
        scrollpage({
                obj : $("#totop"),
                dis_show : 100 ,
                dis_opa : 500
        });
});