$(function(){
	
	
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
	
	//登录注册切换
	var login = $(".tabs a").eq(0);
	var register = $(".tabs a").eq(1);
	var login_form = $(".login_form");
	var register_form = $(".register_form");
	login.bind("click",function(){
			$(this).removeClass("active").addClass("active").siblings().removeClass("active");
			login_form.show();
			register_form.hide()
	})
	register.bind("click",function(){
			$(this).removeClass("active").addClass("active").siblings().removeClass("active");
			login_form.hide();
			register_form.show();
	})
	
	//登录页面  用户页面验证
	
	var login_user = $(".mobile");
	var login_pwd = $(".pwd");
	//获得焦点边框变色
	login_user.bind({
		"focus": function(){
			$(this).parent().addClass("cuttent");
			$(this).parent().siblings(".ctrl").removeClass("cuttent");
			$(this).prev().find("span").css("backgroundPosition","0 0");
		},
		"blur": function(){
			$(this).prev().find("span").css("backgroundPosition","-29px 0");
		}
	})
	login_pwd.bind({
		"focus": function(){
			$(this).parent().addClass("cuttent");
			$(this).parent().siblings(".ctrl").removeClass("cuttent");
			$(this).prev().find("span").css("backgroundPosition","0 -27px")
		},
		"blur": function(){
			$(this).prev().find("span").css("backgroundPosition","-29px -27px");
		}
	})
	
	//失焦验证手机号
	var reg_phone = /^1[3578]\d{9}$/;
	var phone_prompt = $(".error_phone");
	var all_user = $(".mobile");
	var isNum = false;
	var phone_num;
	all_user.bind({
		"blur": function(){
			phone_num = $(this).val();
			if(!reg_phone.test(phone_num)){
				phone_prompt.show();
			}
			else{
				isNum = true;
			}
		},
		"keyup": function(){
			var phone_num = $(this).val();
			if(reg_phone.test(phone_num)){
				phone_prompt.hide();
			}
		}
	})
	//失焦验证密码
	var pwd_prompt = $(".error_pwd");
	var pwd_text;
	var all_pwd = $(".error_pwd");
	login_pwd.bind({
		"blur": function(){
			pwd_text = login_pwd.val();
			if(pwd_text.length == 0){
				pwd_prompt.show();
			}
		},
		"keyup": function(){
			pwd_text = login_pwd.val();
			if(pwd_text.length != 0){
				pwd_prompt.hide();
			}
		}
	})
	
	//登录点击验证
	var login_btn = $(".login_form .submit-btn");
	var error_prompt = $(".login_form .text_error");
	login_btn.bind("click",function(){
		$.getJSON("jsonp/user_info.json",function(data){
			isExistUser = false;
			isPwdTrue = false;
			for(var i = 0; i < data.length; i++){
				var userObj = data[i];
				if(login_user.val() == userObj.phone){
					isExistUser = true;
					if(login_pwd.val() == userObj.pwd){
						isPwdTrue = true;
					}
					else{
						error_prompt.html("*你输入的密码和账户名不匹配");
					}
					break;
				}
				else{
					error_prompt.html("*用户名不存在");
				}
			}
			if(isExistUser && isPwdTrue){
				location.href = "index.html";
				$.cookie("user",data[i].phone,{expires:7,path:"/"});
			}
		})
	})
	
	//注册验证
	//点击边框变色

	//验证码
	var register_verify = $(".verify");
	register_verify.bind({
		"focus": function(){
			$(this).parent().addClass("cuttent");
			$(this).parent().siblings(".ctrl").removeClass("cuttent");
			$(this).prev().find("span").css("backgroundPosition","0 -27px")
		},
		"blur": function(){
			$(this).prev().find("span").css("backgroundPosition","-29px -27px");
		}
	})
	
	//短信验证码
	var register_sms = $(".sms");
	register_sms.bind({
		"focus": function(){
			$(this).parent().addClass("cuttent");
			$(this).parent().siblings(".ctrl").removeClass("cuttent");
			$(this).prev().find("span").css("backgroundPosition","0 -56px")
		},
		"blur": function(){
			$(this).prev().find("span").css("backgroundPosition","-29px -56px");
		}
	})
	
	//短信验证倒计时
	var get_btn = $(".register_form .ctrl button").eq(0);
	var resent_btn = $(".resent");
	var span_timer = $(".timer");
	var timer = null;
	var isClick = false;
	get_btn.click(function(){
		isClick = true;
		$(this).hide();
		resent_btn.show();
		var count = 60;
		span_timer.html(count);
		var self = $(this);
		timer = setInterval(function(){
			count--;
			if(count < 1){
				window.clearInterval(timer);
				self.show();
				resent_btn.hide();
			}
			span_timer.html(count);
		},1000)
	})
	
	//验证码加载
	$.idcode.setCode();   //加载生成验证码方法
	var idcode = $("#Txtidcode");
	var idcode_prompt = $(".error_idcode"); 
	var isCode = false;
	idcode.bind({
		"blur":function(){
			var IsBy = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
			if(!IsBy){
				idcode_prompt.show();
			}
			else{
				isCode = IsBy;
			}
		},
		"keydown": function(){
			idcode_prompt.hide();
		}
	})
	
	//同意书
	var Agreement = $(".Agreement a");
	var checkBox = $(".checkbox");
	Agreement.bind("click",function(evt){
		evt.preventDefault();
		$(".agreement").show();
	})
	var close = $(".agreement_tit em");
	close.bind("click",function(evt){
		$(".agreement").hide();
	})
	var btn_sure = $(".btn_sure");
	btn_sure.bind("click",function(evt){
		checkBox.attr("checked","checked")
		$(".agreement").hide();
	})
	
	
	
//	var isCheck = $(".Agreement input").is(':checked');
	
	
	//注册提交  1手机号码正确 2验证码正确 3是否点击按钮 4短信验证正确 5密码正确 6勾选（8 -16 位  数字密码混合）
	var submit_btn = $(".submit-btn");
	var error_text =$(".register_form .text_error");
	submit_btn.click(function(){
		//短信验证	点击了按钮 4位数字
		var message = $(".sms");
		var reg_mess = /\d{4}/;
		var isMess = reg_mess.test(message.val());
		
		//密码验证
		var str_pwd = $(".register_form .pwd").val();
		var reg_pwd = /^[0-9A-Za-z]{8,16}$/;
		var reg_pwd1 = /^\d{8,16}$/;
		var reg_pwd2 = /^[A-Za-z]{8,16}$/;
		var isPwd = reg_pwd.test(str_pwd) && !reg_pwd1.test(str_pwd) && !reg_pwd2.test(str_pwd);
		
		//用户是否存在
		var isExist = false;
		if(isNum){
			$.getJSON("jsonp/user_info.json",function(data){
				for(var i = 0; i < data.length; i++){
					var userObj = data[i];
					if(phone_num == userObj.phone){
						isExist = true;
						break;
					}
				}
			})	
		}
		
		//是否勾选注册协议
		var isCheck = $(".Agreement input").is(':checked');
			
		if(!isExist){
			if(isCode){
				if(isClick){
					if(isMess){
						if(isPwd){
							if(isCheck){
								$.cookie("user",phone_num,{expires:7,path:"/"});
								location.href = "index.html";
							}
							else{
								error_text.html("*请阅读达令用户注册协议");
							}
						}
						else{
							error_text.html("*请输入正确的密码");
						}
					}
					else{
						error_text.html("*请输入正确的手机验证码");
					}
				}
				else{
					error_text.html("请点击获取手机验证码");
				}
			}
			else{
				error_text.html("*请输入正确的验证码");
			}
		}
		else{
			error_text.html("*请输入正确的手机号");
		}
	
	})

	
	
	
})
