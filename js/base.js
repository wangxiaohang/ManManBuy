/**
 * Created by WXH on 2017/3/31.
 */
function err(){
        alert("未请求到资源");
}
/*处理url地址中的请求信息*/
function getargs(search){
        var args = {};
        if( !search || search.length <= 0){
                return args;
        }
        // 去掉问号
        search = search.substring(1);
        // 提取 每一个 键值对
        var arr = search.split("&");
        // 每个键值对分别存入对象
        for(var i = 0 ; i < arr.length ; i++){
                var temparr = arr[i].split("=");
                args[ temparr[0] ] = temparr[1];
        }
        return args;
}
// 存储部分信息 并 跳转到某个页面
function goPage( obj , url ){
        // 参数信息存储到 sessionStorage
        for(var k in obj){
                window.sessionStorage.setItem( k , obj[k] );
        }
        // 跳转到对应页面
        window.location.href = url ;
}



/*扩展模板方法*/
// 1.获取字符串中的数字
template.helper("getnum",getnum);
function getnum(str){
        return str.replace(/[^\d]+/ig,"");
}
// 2.找到对象obj 中键名包含str的 键和值，重新组成一个对象返回
template.helper("getobj",getobj);
function getobj( obj , str ){
        var o = {};
        if( !obj || !str ){
                return o;
        }
        for( var k in obj ){
                if( k.indexOf(str) != -1 ){
                        o[k] = obj[k];
                }
        }
        return o;
}
// 3.生成 若干个 特定标签
template.helper("createTag",createTag);
function createTag( n , tag ){
        var arr = [];
        for( var i = 0 ; i < n ; i++ ){
                arr.push("<"+tag+">"+"</"+tag+">");
        }
        return arr.join("");
}
// 4.提取空格前的字符
template.helper("frontLetter",frontLetter);
function frontLetter( str ){
        return str.replace(/[ ][\s\S]*/i,"");
}



/*公共模版*/
// 创建商品列表 模版解析器
function getProductListRender( type ){
        var productList = '{{each result as value index}}' +
                        '<li>' +
                        '<a href="productInfo.html?type='+type+'&productid={{value.productId}}">' +
                        '{{#value.productImgSm}}' +
                        '<p>{{value.productName}}<span>{{value.productPinkage}}</span></p>' +
                        '<div>' +
                        '<div class="comment">' +
                        '<img src="images/comment.png" alt="评论"/>' +
                        '<span>{{getnum(value.productComCount)}}</span>' +
                        '</div>' +
                        '<span>{{value.productFrom}}</span>' +
                        '&nbsp;|&nbsp;' +
                        '<span>{{value.productTime}}</span>' +
                        '</div>' +
                        '</a>' +
                        '</li>' +
                        '{{/each}}';
        return template.compile(productList);
}


var productListC = '{{each result as value index}}' +
                        '<li>' +
                                '<a href="javascript:goPage({ categoryid:'+"'{{value.categoryId}}'"+' },'+ "'product.html?productid={{value.productId}}')" +'">' +
                                        '{{#value.productImg}}' +
                                        '<p>{{value.productName}}</p>' +
                                        '<p><em>&yen;</em>{{getnum(value.productPrice)}}</p>' +
                                        '<p>' +
                                                '<span>{{value.productQuote}}</span>' +
                                                '<span>{{value.productCom}}</span>' +
                                        '</p>' +
                                '</a>' +
                        '</li>' +
                   '{{/each}}',
        productListCRender = template.compile(productListC);


/*翻页功能*/

// 总页数转化为options
function setpages(pages){
        // 传入总页数，返回拼接好的option数组
        var arr = [];
        for( var i = 1 ; i <= pages ; i++ ){
                var text = "<option value='" + i + "'>"+i+" / "+pages+"</option>";
                arr.push(text);
        }
        return arr;
}
// 返回计算后页数，设置select的值
function changePage( $page,pages,next ){
        var p = $page.attr("value") - ( -next );
        p = p <= 0 ? pages : ( p > pages ? 1 : p );
        $page.val(p);
        return p;
}
// 回到顶部
function goTop(){
        var $totop = $(".footer a[href='#top']");
        if( !$totop ){
                return;
        }
        $totop.trigger("click");
}
// 封装 划动事件
function tap( obj ){
        var o = obj[ "o" ];
        o.on("touchstart",function(e){

        });
}