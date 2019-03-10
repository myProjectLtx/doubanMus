var id = location.search.slice(1).split('=')[1];
function getData(id, cb) {
    $.ajax({
        type: 'GET',
        url: 'https://api.douban.com/v2/music/'+id,
        dataType: 'jsonp',
        success: cb
    })
}
getData(id, dealData);

var oTitle = $('.wrapper .title');
var oImg = $('.mainpic img');
var spanList = $('.p1 .p1_data');
var ratingValue = $('.rating_value');
function dealData(data) {
    oTitle.html(data.title);
    oImg.prop('src',data.image);
    spanList.eq(0).html(data.attrs.singer[0]);
    spanList.eq(1).html(data.attrs.version[0]);
    spanList.eq(2).html(data.attrs.media[0]);
    spanList.eq(3).html(data.attrs.pubdate[0]);
    spanList.eq(4).html(data.attrs.publisher[0]);
    ratingValue.html(data.rating.average);
    
}
