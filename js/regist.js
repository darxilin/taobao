$(function(){
	
	$("#regist").click(function(){
		var name = $("#regist_name").val();
		var pass = $("#regist_password").val();
		var repass = $("#regist_repassword").val();
		var wrong = $("#msg_wrong");
		//用户名由字母开头，包含字母，数字，下划线的5-16位字符串
		var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
		//密码以字母开头，长度在6~18位之间，只能包含字母、数字和下划线
		var reg1 = /^[a-zA-Z]\w{5,17}$/;
		var result1 = reg1.exec(pass);
		var result = reg.exec(name);
		if(!result){
			wrong.text("用户名由字母开头，包含字母，数字，下划线的5-16位字符串").show();
		}else{
			wrong.hide();
			if(getCookie("user")){
				var data = JSON.parse(getCookie("user"));
				if(data[name]){
					wrong.text("用户名已存在").show();
				}else{
					wrong.hide();
					if(!result1){
						wrong.text("密码以字母开头，长度在6~18位之间，只能包含字母、数字和下划线").show();
					}else{
						wrong.hide();
						if(pass != repass){
							wrong.text("两次密码输入不一致").show();
						}else{
							wrong.hide();
							var data1 = {};
							data1.pass = pass;
							data[name] = data1;
							data_save(data);
						}
					}
				}
			}else{
				var data = {};
				if(!result1){
						wrong.text("密码字母开头，长度6~18位，只包含字母、数字和下划线").show();
					}else{
						wrong.hide();
						if(pass != repass){
							wrong.text("两次密码输入不一致").show();
						}else{
							wrong.hide();
							var data1 = {};
							data1.pass = pass;
							data[name] = data1;
							data_save(data);
							location.href = "login.html";
						}
					}
			}
			
		}
		
	})
});