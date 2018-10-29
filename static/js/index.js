$(function(){
	//顶部导航条注册提示关闭
	var reg_tip = $(".reg_tip");
	var tip_close = $(".tip_close");
	tip_close.click(function(){
		reg_tip.css("display","none")
	});
	
	//侧边导航
	var sidebar_cart = $(".sidebar_cart");
	var cut_line = $(".cut_line");
	var my_discount = $(".silder_bar .my_discount");
	var discount_show = $(".silder_bar .my_discount strong");
	var my_collect = $(".silder_bar .my_collect");
	var collect_show = $(".silder_bar .my_collect strong");
	sidebar_cart.hover(
		function(){
			sidebar_cart.css("background","#E14958");
			cut_line.css("background","#E14958");
		},
		function(){
			sidebar_cart.css("background","transparent")
			cut_line.css("background","#515151")
		}
	)
	my_collect.hover(
		function(){
			my_collect.css("background","#E14958");
			collect_show.css("display","block")
		},
		function(){
			my_collect.css("background","transparent");
			collect_show.css("display","none")
		}
	)
	my_discount.hover(
		function(){
			my_discount.css("background","#E14958");
			discount_show.css("display","block")
		},
		function(){
			my_discount.css("background","transparent");
			discount_show.css("display","none")
		}
	)
	
	//主导航span显示隐藏
	var pMouse = $('.nav_left p').eq(0);
	var iconUp = $('.icon_up')
	var iconDown = $('.icon_down')
	pMouse.hover(
		function(){
			iconUp.css("display","none");
			iconDown.css("display","inline-block");
		},
		function(){
			iconUp.css("display","inline-block");
			iconDown.css("display","none");
		}
	)
	
	//分类tab-切换
	var cateMist = $(".cate_mist");
	var cateDetail = $(".cate_detail");
	cateMist.mouseenter(function(evt){
		var index = $(this).index();
		cateDetail.eq(index).css("display","block");
		$(this).css({"background":"white"})
//		$(this).css({"background":"white","border":"1px solid #654579","border-right":"1px solid white"})
	})
	cateMist.mouseleave(function(evt){
		var index = $(this).index();
		cateDetail.eq(index).css("display","none");
		$(this).css({"background":"#E8E3EB"})
//		$(this).css({"background":"#E8E3EB","border":"1px solid #e8e3eb"})
	})
	
	//tab-切换  all_people good_tab 点击li li 添加class： current  ul goods_list显示
	var good_tab = $(".allPeople .good_tab");
	var good_list = $(".allPeople .goods_list");
	good_list.eq(0).css("display","block")
	good_tab.click(function(evt){
		var self = evt.target;
		var selfName = self.tagName.toLowerCase();
		if(selfName == "li"){
			var index = $(self).index();
			$(self).removeClass().addClass("current").siblings("li").removeClass();
			good_list.eq(index).css("display","block").siblings(".goods_list").css("display","none");
		}
	})
	
	//点击查看更多
	var data_expand = $(".data_expand");
	var sale_list_li = $(".sale_list ul li:gt(4)");
	sale_list_li.css("display","none")
	data_expand.click(function(){
		sale_list_li.css("display","block");
		data_expand.css("display","none")
	})
	
	//闪购预告
	var scroll_up = $(".scroll_up");
	var scroll_down = $(".scroll_down");
	var tomorrow_li = $(".tomorrow ul li");
	tomorrow_li.css("display","none");
	tomorrow_li.slice(0,4).css("display","block");
	var scroll_num = 0;
	scroll_down.click(function(){
		scroll_num++;
		if(scroll_num == 4){
			scroll_num = 0;
		}
		tomorrow_li.css("display","none");
		tomorrow_li.slice(scroll_num,scroll_num+4).css("display","block");
	})
	scroll_up.click(function(){
		scroll_num--;
		if(scroll_num < 0){
			scroll_num = 4;
		}
		tomorrow_li.css("display","none");
		tomorrow_li.slice(scroll_num,scroll_num+4).css("display","block");
	})
	
//	blackhourse
	$(".buy_list dd").mouseover(function(evt){
		$(this).removeClass("show").addClass("show").siblings("dd").removeClass("show");
	})
	$(".buy_list").mouseout(function(evt){
		evt.stopPropagation()
		$(this).find("dd").first().removeClass("show").addClass("show").siblings("dd").removeClass("show");
	})
	
	
	//轮播图

	
	$.getJSON("jsonp/slideer.json",function(data){
		for(var i = 0; i < data.length; i++){
			var sliderLi = $("<li></li>");
			var sliderImg = $("<img src=" + data[i].url + ">");
			var slider = $("<li>" + (i+1) + "</li>");
			sliderLi.css("background",data[i].color)
			$(".slider_li").append(sliderLi);
			sliderLi.append(sliderImg);
			$('.slider_dot').append($("<li>" + (i+1) + "</li>"));
		}
		$('.slider_dot li').first().addClass("liActive");
		var slider_li = $(".slider_li li");
		var slider_img = $('.slider_li li img');
		var slider_dot = $('.slider_dot li');
		var index = 0;
		var timer = null;
		function star(index){
			timer = window.setInterval(function(){
				index++;
				if(index >= slider_li.length){
					index = 0;
				}
				slider_li.eq(index).fadeIn(500).siblings().fadeOut(500);
				slider_dot.eq(index).removeClass().addClass("liActive").siblings().removeClass();
			},2000)
		}
		star(index)	
		
		//li点击事件
		slider_dot.click(function(){
			window.clearInterval(timer);
			var indexC = $(this).index();
			slider_li.eq(indexC).fadeIn(500).siblings().fadeOut(500);
			slider_dot.eq(indexC).removeClass().addClass("liActive").siblings().removeClass();
			star(index);
		})
	})
	

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
	}
	leave.bind("click",function(){
		$.cookie("user","",{expires:-7,path:"/"});
	})
	
	//今日上新
	var add_cart = $(".add_cart");
	add_cart.hide();
	var good_box1 = $(".new_four li");
	good_box1.hover(
		function(){
			$(this).find(".add_cart").show();
		},
		function(){
			$(this).find(".add_cart").hide();
		}
	)
	var good_box2 = $(".new_two li");
	good_box2.hover(
		function(){
			$(this).find(".add_cart").show();
		},
		function(){
			$(this).find(".add_cart").hide();
		}
	)
	$.getJSON("jsonp/goods.json",function(data){
		for(var i = 0; i < good_box1.length; i++){
			good_box1.eq(i).find(".now_price").html(data[i].now_price);
			good_box1.eq(i).find(".old_price").html(data[i].old_price);
			good_box1.eq(i).find(".discount").html(data[i].discount);
			good_box1.eq(i).find(".new_tit a").html(data[i].title);
			good_box1.eq(i).find(".good_img").attr("src",data[i].src)
		}
		for(var i = 0; i < good_box2.length; i++){
			good_box2.eq(i).find(".now_price").html(data[i+4].now_price);
			good_box2.eq(i).find(".old_price").html(data[i+4].old_price);
			good_box2.eq(i).find(".discount").html(data[i+4].discount);
			good_box2.eq(i).find(".new_tit a").html(data[i+4].title);
			good_box2.eq(i).find(".good_img").attr("src",data[i+4].src)
		}
	})
	
	//產品點擊跳轉
	$(".new_img").click(function(){
		$(this).attr("href","detail.html");
		var idNum = $(this).find(".good_img").attr("src");
		$.cookie("goods",idNum,{expires:7,path:"/"});
	})
	
	//加入购物车
	var offset = $(".cart_num").offset();  //结束的地方的元素
	add_cart.bind("click",function(evt){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
		evt.stopPropagation();
		event.preventDefault();
//		將信息存入cookie中
		var goodsList = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];	//判斷購物車是否為空
		var goodsSrc = $(this).parent().find('.good_img').attr('src');
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
					goodsList[i].count ++;
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
	});
	
	//购物车数量变化
		function getNum(){
			var num = 0;
			var goods_list = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : false;
			if(goods_list){
				for(var i = 0; i<goods_list.length; i++){
					num += goods_list[i].count *1;	
				}	
				$(".cart_num").html(num);
				$(".cart span").html(num);
			}
		}
		getNum();
	
	//倒计时
	var cutDown = setInterval(function(){
		var nowDate = new Date()
		var stopDate = new Date("September 23,2016 23:00:00");
		var remain_time = new Date( stopDate.valueOf() - nowDate.valueOf() );
		if(stopDate.valueOf() - nowDate.valueOf() < 0){
			window.clearInterval(cutDown)
		}
		$(".hovr").html(remain_time.getHours());
		$(".min").html(remain_time.getMinutes());
		$(".sec").html(remain_time.getSeconds());
	},1000)
	
	//点击购物车跳转
	$(".silder_bar .sidebar_cart").click(function(){
		location.href = "cart.html";
	})
})
