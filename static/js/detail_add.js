$(function () {
    $('#goods_add').click(function () {
       var goodsid = $(this).attr('goodsid')
        $.get('/addcart/',{'goodsid':goodsid},function (response) {
              if (response.status == 1){
                  alert('添加购物车成功')
              }
        })



    })




















})