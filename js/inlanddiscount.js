/**
 * Created by WXH on 2017/4/4.
 */
$(function(){
        // �洢��������
        var data = {};
        // ��¼�Ƿ������
        var rendered = false;
        // ��������
        $.ajax({
                url:"http://139.199.157.195:9090/api/getinlanddiscount",
                crossDomain:true,
                error:err,
                success:function(d){
                        data = d;
                        // ��Ⱦ ҳ��
                        render();
                        rendered = true;
                }
        });

        // ����Ⱦ
        $(window).on("scroll",function(){
                var height = $("header").height() + $(".main").height() - $(window).height();
                // �����ײ� �����ݿ�����ʾ
                if( $(document.body).scrollTop() >= height && data.result.length > 0 && rendered ){
                        // ��Ⱦҳ��
                        render();
                }
        })



        // ��Ⱦҳ��
        function render(){
                // �洢Ҫ��Ⱦ������
                var tempData = {result:[]};
                // ���Ҫ��Ⱦ������
                // ÿ����Ⱦ4������
                var len = data.result.length < 4 ? data.result.length : 4;
                for( var i = 0 ; i < len ; i++ ){
                        tempData.result.push( data.result.shift() );
                }
                // ��Ⱦ
                $(".pmain > ul").append( template("product",tempData) );
        }
})