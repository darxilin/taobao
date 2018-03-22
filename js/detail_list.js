$(function() {
	var oBox = document.getElementById("box");
	var Box = document.getElementsByClassName("sp_box")[0];
	var oBox_img = oBox.children[0];
	var oBox_small = oBox.children[2];
	var oUl = oBox_small.children[0];
	var oView = document.getElementById("view");
	var oBlock = document.getElementById("block");

	$("#box_small>ul>li").first().addClass("hover");
	var src = $("#box_small>ul>li>img").first().attr("src");
	$("#view>img").first().attr("src", src);
	$("#box_img>img").first().attr("src", src);
	$("#box_small>ul>li").click(function() {
		var src = $(this).children().first().attr("src");
		$("#box_img>img").first().attr("src", src);
		$("#view>img").first().attr("src", src);
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	oBox_img.onmouseover = function() {
		oBlock.style.display = "block";
		oView.style.display = "block";
		var a = oBox.offsetLeft;
		var b = oBox.offsetTop + oBox_img.offsetTop;
		oBox_img.onmousemove = function(e) {
			var evt = e || event;
			var x = evt.pageX - a - Math.floor(oBlock.offsetWidth / 2);
			var y = evt.pageY - b - Math.floor(oBlock.offsetHeight / 2);
			if(x <= 0) {
				x = 0;
			}
			if(y <= 0) {
				y = 0;
			}
			if(x >= (oBox_img.offsetWidth - oBlock.offsetWidth)) {
				x = oBox_img.offsetWidth - oBlock.offsetWidth;
			}
			if(y >= (oBox_img.offsetHeight - oBlock.offsetHeight)) {
				y = oBox_img.offsetHeight - oBlock.offsetHeight;
			}
			oBlock.style.left = x + "px";
			oBlock.style.top = y + "px";
			oView.children[0].style.left = "-" + 800 / 400 * oBlock.offsetLeft + "px";
			oView.children[0].style.top = "-" + 800 / 400 * oBlock.offsetTop + "px";
			//console.log(1600/320*oBlock.offsetLeft,880/176*oBlock.offsetTop,oView.children[0].style.left);
		}
	}
	oBox_img.onmouseleave = function() {
		oBlock.style.display = "none";
		oView.style.display = "none";
	}

	//获取列表页跳转来的id
	var data = GetRequest();
	var id = data.id;
	var sp_title = "商品" + id;
	
	var price = id.slice(-3, -1);
	//接口数据太复杂，根据id自动生成价格
	$(".sp_cur>span").eq(1).text("￥" + price).attr("price", price);
	$(".sp_title").text(sp_title);
	$(".add_cart").attr("id", id);
	$(".num_decre").click(function() {
		var num = $("#sp_num").val();
		if(num <= 1) {
			$("#sp_num").val("1");
		} else {
			$("#sp_num").val(Number(num) - 1);
		}
	});
	$(".num_incre").click(function() {
		var num = $("#sp_num").val();
		$("#sp_num").val(Number(num) + 1);
	});
	$("#sp_num").blur(function() {
		var num = $("#sp_num").val();
		if(num <= 1) {
			$("#sp_num").val("1");
		}
	});
	$(".add_cart").click(function() {

		if(getCookie("user_online")) {
			sp_title = escape(sp_title);
			var num = Number($("#sp_num").val());
			var user = getCookie("user_online");
			var data = JSON.parse(getCookie("user"));
			if(data[user].cart) {
				if(data[user].cart[id]) {
					data[user].cart[id].num = Number(data[user].cart[id].num) + num;
					data_save(data);
					location.href = "cart.html";
				} else {
					var sp_data = {};
					sp_data.num = num;
					sp_data.price = price;
					sp_data.title = sp_title;
					data[user].cart[id] = sp_data;
					data_save(data);
					location.href = "cart.html";
				}

			} else if(data[user].cart == undefined) {

				var cart = {};
				var sp_data = {};
				sp_data.num = num;
				sp_data.price = price;
				sp_data.title = sp_title;
				cart[id] = sp_data;
				data[user].cart = cart;
				data_save(data);
				location.href = "cart.html";

			}
		} else {
			location.href = "login.html";
		}
		//hong = {"id":{num:1,title:title,price:price}}
		/*if(getCookie("user_online")){
			var num = Number($("#sp_num").val());
			var user = getCookie("user_online");
			if(getCookie(user)){
				
			}
		}*/
	})
})