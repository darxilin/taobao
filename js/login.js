$(function() {
	$("#login").click(function() {
		var name = $("#login_name").val();
		var pass = $("#login_password").val();
		var wrong = $("#msg_wrong");
		if(name == "") {
			wrong.text("用户名不能为空！").show();
		} else if(pass == "") {
			wrong.text("密码不能为空！").show();
		} else {
			wrong.hide();
			/*$.ajax({
				type: "post",
				url: "php/jiekou.php",
				data: {
					name: name,
					pass: pass
				},
				success: function(msg) {
					if(msg == 1) {
						location.href = 'index.html';
					} else {
						wrong.text("用户名或密码错误！").show();
					}
				}
			});*/
			//var data = {user:{pass:pass,cart:{id:num}}};
			if(getCookie("user")){
				var obj = JSON.parse(getCookie("user"));
				console.log(obj);
				console.log(obj[name])
				if(obj[name]){
					if(obj[name].pass == pass){
						var data = name;
						setCookie("user_online",data,7);
						location.href = 'index.html';
					}else{
						wrong.text("用户名或密码错误！").show();
					}
				}else{
					wrong.text("用户名或密码错误！").show();
				}
			}else{
				wrong.text("用户名或密码错误！").show();
			}
		}

	});
});