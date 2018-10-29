$(function(){
	
	//顶部导航条注册提示关闭
	var reg_tip = $(".reg_tip");
	var tip_close = $(".tip_close");
	tip_close.click(function(){
		reg_tip.css("display","none")
	});
	
	var goodsList = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : false;
	//判断购物车是否为空
	if(goodsList && goodsList.length != 0){
		//购物车不为空
		$(".data_empty").hide();
		var cart_list = $(".cart_list");
		for (var i = 0; i < goodsList.length-1 ; i++) {
			cart_list.clone(true,true).appendTo($(".cart_table"));
		}
		updata(goodsList);
	}
	else{
		//购物车为空
		$(".data_empty").show();
		$(".cart_list").hide();
	}
	//更新数据
	function updata(goodlist){
		var cartList = $(".cart_list");
		var tot_price;
		for(var i = 0; i < cartList.length; i++){
			cartList.eq(i).find(".th_goods").find("img").attr("src",goodlist[i].src);
			cartList.eq(i).find(".th_goods").find("a").html(goodlist[i].title);
			cartList.eq(i).find(".de_price").html(goodlist[i].now);
			cartList.eq(i).find(".num_in").val(goodlist[i].count);
			tot_price = goodlist[i].now * goodlist[i].count;
			cartList.eq(i).find(".total").html(tot_price);
		}
	}
	
//	数量加减
	var num_reduce = $(".reduce");
	var num_add = $(".btn_a");
	num_add.click(function(){
		var num_inp = $(this).parent().find(".num_in");
		var val = num_inp.val();
		var getCookie = JSON.parse( $.cookie("cart"));
		val++;
		num_inp.val(val);
		//是否选中
		var isCheck = $(this).parent().parent().parent().find(".check").prop("checked") == true;
		if(isCheck){
			var arr = check();
			ammount_num.html(arr[0]);
			ammount_total.html(arr[1]);
		}
		goods_info($(this),val);
		changeCookie($(this));
	})
	num_reduce.click(function(){
		var num_inp = $(this).parent().find(".num_in");
		var val = num_inp.val();
		val--;
		if(val < 1){
			val = 1;
		}
		num_inp.val(val);
		//是否选中
		var isCheck = $(this).parent().parent().parent().find(".check").prop("checked") == true;
		if(isCheck){
			var arr = check();
			ammount_num.html(arr[0]);
			ammount_total.html(arr[1]);
		}
		goods_info($(this),val);
		changeCookie($(this));
	})
	//input失焦价格变化
	var numInput = $(".num_in");
	numInput.blur(function(){
		var num = $(this).val();
		goods_info($(this),num);
		changeCookie($(this));
	})
	
	function goods_info(ele,num){
		var price = ele.parent().parent().parent().find(".de_price").html();
		var total_price = price * num;
		ele.parent().parent().parent().find(".total").html(total_price);
	}
	
	//已选中数量 	已选中总金额
	var ammount_num = $(".ammount .redel");
	var ammount_total = $(".sum_price span");
	
	//全选
	$(".cart_thead input.check").click(function(){
		if($(this).is(":checked") == true){
			$("input[type = checkbox]").prop("checked",true);
			var arr = check();
			ammount_num.html(arr[0]);
			ammount_total.html(arr[1]);
		}
		else{
			$("input[type = checkbox]").prop("checked",false);
			var arr = check();
			ammount_num.html("0");
			ammount_total.html("0");
		}
	})
	$(".sel_all input").click(function(){
		if($(this).prop("checked") == true){
			$("input[type = checkbox]").prop("checked",true);
			var arr = check();
			ammount_num.html(arr[0]);
			ammount_total.html(arr[1]);
		}
		else{
			$("input[type = checkbox]").prop("checked",false);
			var arr = check();
			ammount_num.html("0");
			ammount_total.html("0");
		}
	})
	
	function check(){
		var ele = $(".cart_list input[type = checkbox]");
		var sum_price = 0	
		var sum_count = 0;
		var price;
		var count;
		for(var i = 0; i < ele.length; i++){
			if(ele.eq(i).is(":checked") == true){
				price = ele.eq(i).parent().parent().find(".de_price").html();
				count = ele.eq(i).parent().parent().find(".num_in").val();
				sum_price += price * count;
				sum_count += count*1;
			}
		}
		return [sum_count,sum_price];
	}
	
	//选中单个产品
	$(".cart_list input[type = checkbox]").click(function(){
		var arr = check();
		//全选消失
		$(".cart_thead input.check").prop("checked",false);
		$(".sel_all input").prop("checked",false);
		ammount_num.html(arr[0]);
		ammount_total.html(arr[1]);
	})
	
	//单个产品删除
	var dele = $(".th_handle a");
	dele.click(function(){
		var ele = $(this).parent().parent().parent();
		ele.remove();
		deleCookie(ele);
	})
	
	//删除选中的商品
	var deleCheck = $(".dele_goods");
	deleCheck.click(function(){
		var ele = $(".cart_list input[type = checkbox]");
		for(var i = 0; i < ele.length; i++){
			if(ele.eq(i).is(":checked") == true){
				var cookie_ele = ele.eq(i).parent().parent().parent()
				cookie_ele.remove();
				deleCookie(cookie_ele)
			}	
		}	
	})
	
	function deleCookie(ele){
		var src = ele.find(".th_goods img").attr("src");
		var goodsList = JSON.parse( $.cookie("cart") );
		for (var i = 0; i < goodsList.length ; i++) {
			if(goodsList[i].src == src){
				goodsList.splice(i,1);
				if(goodsList.length == 0){
					$(".data_empty").show();
					ammount_num.html(0);
					ammount_total.html(0);
				}
				break;
			}
		}
		$.cookie("cart", JSON.stringify(goodsList), {expires:22, path:"/"});
	}
	function changeCookie(ele){
		var src = ele.parent().parent().parent().find(".th_goods img").attr("src");
		var goodsList = JSON.parse( $.cookie("cart") );
		for (var i = 0; i < goodsList.length ; i++) {
			if(goodsList[i].src == src){
				goodsList[i].count = ele.parent().parent().parent().find(".num_in").val();
				break;
			}
		}
		$.cookie("cart", JSON.stringify(goodsList), {expires:22, path:"/"});
	}
	
	
	
})