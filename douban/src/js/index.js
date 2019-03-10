(function () {
    var $submit = $('.submit'),
        $input = $('.input'),
        $searchList = $('.search_list');
    $input.on('input',function (e) {
        e.preventDefault();
        var value = $(this).val();
        $('#search_suggest').on('mouseleave',function(){ //鼠标移出不显示列表
            $(this).css('display','none');
        })
        ajaxData(value);

    })
    function ajaxData(value) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: 'https://api.douban.com/v2/music/search',  //向网址接口发送请求
            data: 'q='+value+'&count=7',
            success: addItem
        })
        // $.ajax({
        //     type: 'GET',
        //     url: 'http://localhost/douban/src/js/data.txt', //向本地缓存发送请求
        //     data: 'q='+value+'&count=7',
        //     success: addItem
        // })
        
    }
    function addItem(data) {
        var data= typeof data =='string'? JSON.parse(data):data; // 转换成对象
        var dataList = data.musics;
        var str = '';
        $('#search_suggest').css('display','block');  //鼠标移出显示列表
        if(dataList.length > 0) {
            dataList.forEach(function (ele, index) {
                var src = ele.image;
                var reg = /https:\/\//;
                src = src.replace(reg,'https://images.weserv.nl/?url=');  //先把豆瓣上的图片缓存到新的网址 url拼接的依然是请求豆瓣网址
                str += '<li>\
                            <a href=" http://localhost/douban/itemPage.html?id='+ele.id+'">\
                                <img src="'+src+'" alt="">\
                                <div>\
                                    <em>'+ele.title+'</em>\
                                    <p>'+ele.author[0].name+'</p>\
                                </div>\
                            </a>\
                        </li>'
            })
            $searchList.html($(str));
        }
    }
})()
