$(function(){

	//顶部导航条注册提示关闭
	var reg_tip = $(".reg_tip");
	var tip_close = $(".tip_close");
	tip_close.click(function(){
		reg_tip.css("display","none")
	})
})

$(function () {
	f()
	$('.ico_add').click(function () {
		var goodsid = $(this).attr('goodsid')
		var $that = $(this)
        var price = $(this).attr('price')
		$.get('/addcart_num/',{'goodsid':goodsid},function (response) {
			// console.log(response)
			if (response.status ==1){
				$that.parent().prev().val(response.number)

			}
			var sum_price = price * response.number;
			$that.parent().parent().parent().next().find('.total').html(sum_price)
			total()

        })



    });
	$('.ico_re').click(function () {
		if ($(this).parent().next().val()>1) {
            var goodsid = $(this).attr('goodsid')
            var $that = $(this)
			var price = $(this).attr('price')

            $.get('/subcart_num/', {'goodsid': goodsid}, function (response) {
                console.log(response)
                if (response.status == 1) {
                    $that.parent().next().val(response.number)

                }
                var sum_price = price * response.number;
			    $that.parent().parent().parent().next().find('.total').html(sum_price)
                total()
            })
        }


    });
//单选
$(".cart_list input[type = checkbox]").click(function(){
	    var goodsid = $(this).attr('goodsid')
		$.get('/changecartstatus/',{'goodsid':goodsid},function (response) {
             if (response.status ==1){
             	console.log(response.msg)
			 }
        })
	});
//多选
$('#check').click(function () {

    if ($(this).is(":checked") == true){
    	var goodsid = $(this).attr('goodsid')
	    $.get('/allchangeadd/',function (response) {
			if (response.status==1){
				$(".check").prop("checked",true);
				// window.location.reload()

			}
			total()
        })
    }else {
    	var goodsid = $(this).attr('goodsid')
	    $.get('/allchangere/',function (response) {
			if (response.status==1){
				$(".check").prop("checked",false);
				// window.location.reload()

			}
			total()
        })
	}
})
$(".sel_all input").click(function () {
	if ($(this).is(":checked") == true){
    	var goodsid = $(this).attr('goodsid')
	    $.get('/allchangeadd/',function (response) {
			if (response.status==1) {
                $(".check").prop("checked", true);
                // window.location.reload()

            }
            total()
        })
    }else {
    	var goodsid = $(this).attr('goodsid')
	    $.get('/allchangere/',function (response) {
			if (response.status==1){
				$(".check").prop("checked",false);
				// window.location.reload()

			}
			total()
        })
	}
});

//删除本行商品
$('.del_the').click(function () {
	var goodsid = $(this).attr('goodsid')
	// console.log('666666')
	$.get('/del_the/',{'goodsid':goodsid},function (response) {
		if (response.status==1){
			window.location.reload()
		}
    })
});
//删除我所选中的商品
$('.total_box .dele_goods').click(function () {
	$('.each').each(function () {
		var ischeck = $(this).find('.th_check').find('input').prop("checked");
		var goodsid = $(this).find('.th_check').find('input').attr("goodsid");
		if (ischeck){
			$.get('/del_the/',{'goodsid':goodsid},function (response) {
		    if (response.status==1){
			window.location.reload()
		    }
           })
		}
    })
});



function total() {
		var sum = 0
	    $('.each').each(function () {
          var ischeck = $(this).find('.th_check').find('input').prop("checked");
          var price = parseInt($(this).find('.th_total').find('.total').html())
		  if (ischeck){
		  	sum += price
		  }
        })
      $('.toolbar .f20').html(sum)
    }


function f() {
	$('.each').each(function () {
		var price = parseInt($(this).find('.th_price').find('.de_price').html())
		var num = $(this).find('.th_number').find('input').val()
		$(this).find('.th_total').find('.total').html(price * num)

    })


}














})