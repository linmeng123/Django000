$(function(){
	
	//顶部导航条注册提示关闭
	var reg_tip = $(".reg_tip");
	var tip_close = $(".tip_close");
	tip_close.click(function(){
		reg_tip.css("display","none")
	});
	
	//cookie登录,退出
	var leave = $(".leave");
	leave.hide();
	var user = $.cookie("user") ? $.cookie("user") : false;
	var main_login = $(".main_login");
	if(user){
		var user_num = user.replace(reg_star,'$1****$3')
		var reg_star = /(\d{4})(\d{4})(\d{3})/;
		main_login.html("欢迎您，"+ user_num)
		leave.show();
		console.log($.cookie("user") )
	}
	leave.bind("click",function(){
		$.cookie("user","",{expires:-7,path:"/"});
	})
	
	
	//加載產品信息
	// var goodsSrc = $.cookie("goods");
	// $.getJSON("jsonp/goods.json",function(data){
	// 	for(var i = 0; i < data.length; i++){
	// 		var info = data[i];
	// 		if(info.src == goodsSrc){
	// 			$(".detail_small").css({"background": "url(" + goodsSrc + ") no-repeat center center", "background-size": "cover"});
	// 			$(".big_img").attr("src",goodsSrc);
	// 			$(".goods_info h1").html(info.title);
	// 			$(".de_new_price strong").html(info.now_price);
	// 			$("#old_price").html(info.old_price);
	// 			$(".price_off").html(info.discount);
	// 			break;
	// 		}
	// 	}
	// })
	
	//數量加減
	var num_add = $(".btn_add");
	var num_reduce = $(".btn_reduce");
	var num_text = $(".num_inp");
	num_add.click(function(){
		var val = num_text.val();
		val++;
		num_text.val(val);
	})
	num_reduce.click(function(){
		var val = num_text.val();
		val--;
		if(val < 1){
			val = 1;
		}
		num_text.val(val);
	})
	
	//添加到購物車
	var cart_btn = $(".goods_add");
	
	//分类tab-切换
	var cateMist = $(".cate_mist");
	var cateDetail = $(".cate_detail");
	cateMist.mouseenter(function(evt){
		var index = $(this).index();
		cateDetail.eq(index).css("display","block");
		$(this).css({"background":"white","border":"1px solid #654579","border-right":"1px solid white"})
	})
	cateMist.mouseleave(function(evt){
		var index = $(this).index();
		cateDetail.eq(index).css("display","none");
		$(this).css({"background":"#E8E3EB","border":"1px solid #e8e3eb"})
	})
	
	//主导航span显示隐藏
	var pMouse = $('.nav_left');
	var iconUp = $('.icon_up');
	var iconDown = $('.icon_down');
	var category = $(".category");
	category.css("display","none");
	pMouse.hover(
		function(){
			iconUp.css("display","none");
			iconDown.css("display","inline-block");
			category.css("display","block");
		},
		function(){
			iconUp.css("display","inline-block");
			iconDown.css("display","none");
			category.css("display","none");
		}
	)
	
	//放大镜
	var smallImg = $(".detail_small");
	var coverArea = $(".move_box");
	var bigImg = $(".big_img");
	var bigArea = $(".detail_big");
	smallImg.mouseover(function(evt){
		coverArea.show();
		bigArea.show();
	})
	smallImg.bind("mousemove",function(evt){
		var x = evt.pageX - smallImg.offset().left - coverArea.width()/2;
		var y = evt.pageY - smallImg.offset().top - coverArea.width()/2;
		if(x < 0){
			x = 0;
		}
		if(y < 0){
			y = 0;
		}
		if(x > smallImg.width() - coverArea.width()){
			x = smallImg.width() - coverArea.width();
		}
		if(y > smallImg.height() - coverArea.height()){
			y = smallImg.height() - coverArea.height();
		}
		coverArea.css({left: x, top: y});
		var ratioX = x/smallImg.width();
		var ratioY = y/smallImg.height();
		bigImg.css({
			left: -bigImg.width()*ratioX,
			top: -bigImg.height()*ratioY,
		})
	})
	smallImg.mouseout(function(){
		coverArea.hide();
		bigArea.hide();
	})
	
	//加入购物车
	$(".goods_add").click(function(){
		var goodsList = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];	//判斷購物車是否為空
		var goodsSrc = $.cookie("goods");
		var goods_num = $(".num_inp").val() * 1;
		$.getJSON("jsonp/goods.json",function(data){
			for(var i = 0; i<data.length; i++){
				if(goodsSrc == data[i].src){
					var goodsTit = data[i].title;
					var goodsNow = data[i].now_price;
					var goodsOld = data[i].old_price;
					var goodsOff = data[i].price_discount;
				}
			}
			//if數組為空，直接添加商品，else數組不為空，判斷是否存在相同的商品
			var isExist = false;
			//判斷是否存在相同的商品
			for(var i = 0; i<goodsList.length; i++){
				//如果存在相同的商品，則把數量++
				if(goodsSrc == goodsList[i].src){
					goodsList[i].count += goods_num;
					isExist = true;
					break;
				}
			}
			//如果不存在相同的商品，則添加新的商品
			if(!isExist){
				var goods = {
					title: goodsTit,
					now: goodsNow,
					old: goodsOld,
					off: goodsOff,
					count: 1,
					src: goodsSrc,
				}
				goodsList.push(goods);
			}
			$.cookie("cart", JSON.stringify(goodsList), {expires:22, path:"/"});	
			getNum();
		})
	})
	
	
	//购物车数量变化
	function getNum(){
		var num = 0;
		var goods_list = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : false;
		if(goods_list){
			for(var i = 0; i<goods_list.length; i++){
				num += goods_list[i].count *1;	
			}	
			$(".cart span").html(num);
		}
	}
	getNum()
})
