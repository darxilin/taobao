$(function() {
	var oCartList = document.getElementById("cartList");
	if(getCookie("user_online")) {
		var user = getCookie("user_online");
		var data = JSON.parse(getCookie("user"));
		var str = "";
		if(data[user].cart) {
			for(var id in data[user].cart) {
				/*for(var i in data){
					if(id==data[i].id){
						str+="<li><span>"+data[i].title+"</span><span>"+obj[id]+"</span></li>"
					}
				}*/

				str += "<li data-id='" + id + "'><input type='checkbox' class='check' /><span>" + unescape(data[user].cart[id].title) + "</span><span class='price'>￥" + data[user].cart[id].price + "</span><span class='del'>-</span><input type='text' id='input_num' value='" + data[user].cart[id].num + "'><span class='add'>+</span><span class='count' price='"+data[user].cart[id].num * data[user].cart[id].price+"'>￥" + data[user].cart[id].num * data[user].cart[id].price + "</span><span class='clear'>删除</span></li>"

			}
			oCartList.innerHTML = str;

			/*var aDelBtn = document.getElementsByClassName("del");
			var aAddBtn = document.getElementsByClassName("add");
			var aInput = document.getElementById("input_num");
			var aNum = document.getElementsByClassName("num");
			var aClearBtn = document.getElementsByClassName("clear");
			for(var i = 0; i < aDelBtn.length; i++) {
				aDelBtn[i].index = i;
				aAddBtn[i].index = i;
				aInput[i].index = i;
				aClearBtn[i].index = i;
				aDelBtn[i].onclick = function() {
					var id = this.parentNode.getAttribute("data-id");
					data[user].cart[id].num--;
					aInput[this.index].value = data[user].cart[id].num;
					aNum[this.index].innerText = data[user].cart[id].num;
					var objToStr = JSON.stringify(data);
					setCookie("user", objToStr, 7);

				}
				aAddBtn[i].onclick = function() {
					var id = this.parentNode.getAttribute("data-id");
					data[user].cart[id].num++;
					aInput[this.index].value = data[user].cart[id].num;
					aNum[this.index].innerText = data[user].cart[id].num;
					var objToStr = JSON.stringify(data);
					setCookie("user", objToStr, 7);
				}
				aInput[i].onchange = function() {
					var id= this.parentNode.getAttribute("data-id");
					data[user].cart[id].num = aInput[this.index].value;
					//aInput[this.index].value = obj[proId];
					aNum[this.index].innerText = data[user].cart[id].num;
					var objToStr = JSON.stringify(data);
					setCookie("user", objToStr, 7);
				}
				aClearBtn[i].onclick = function() {
					var id = this.parentNode.getAttribute("data-id");
					delete data[user].cart[id];
					var objToStr = JSON.stringify(data);
					setCookie("user", objToStr, 7);
					oCartList.removeChild(this.parentNode);
				}
			}*/
			

			function count_price() {
				var price_total = 0;
				$("#cartList>li>input.check").each(function(){
					if($(this).prop("checked")){
						price_total += Number($(this).parent().find(".count").first().attr("price"));
					}
				});
				$(".price_total").text("￥" + price_total);
			}
			count_price();
			$("#cartList>li>.del").click(function() {
				console.log(data);
				var id = $(this).parent().attr("data-id");
				var price = Number(data[user].cart[id].price);
				data[user].cart[id].num--;
				if(data[user].cart[id].num <= 1) {
					data[user].cart[id].num = 1;
				}
				$(this).next().val(data[user].cart[id].num);
				var count = price * data[user].cart[id].num;
				$(this).parent().find(".count").first().text("￥"+count).attr("price",count);

				count_price();
				data_save(data);
			});
			$("#cartList>li>.add").click(function() {
				var id = $(this).parent().attr("data-id");
				var price = Number(data[user].cart[id].price);
				data[user].cart[id].num++;
				var count = price * data[user].cart[id].num;
				$(this).parent().find(".count").first().text("￥"+count).attr("price",count);
				$(this).prev().val(data[user].cart[id].num);
				count_price();
				data_save(data);
			});
			$("#input_num").blur(function() {
				var id = $(this).parent().attr("data-id");
				var price = Number(data[user].cart[id].price);
				if($(this).val() <= 1) {
					data[user].cart[id].num = 1;
				}
				data[user].cart[id].num = $(this).val();
				var count = price * data[user].cart[id].num;
				$(this).parent().find(".count").first().text("￥"+count).attr("price",count);
				count_price();
				data_save(data);
			});
			$(".clear").click(function() {
				var id = this.parentNode.getAttribute("data-id");
				delete data[user].cart[id];
				$(this).parent().remove();
				count_price()
				data_save(data);
			})

		} else {
			str += "<li class='no_data'>购物车里没有商品</li>";
			oCartList.innerHTML = str;
		}

	} else {
		location.href = "login.html";
	}

	$("#cartList>li>input.check").click(function() {
		if($("#cartList>li>input.check:checked").length == $("#cartList>li>input.check").length) {
			$("#quanxuan").prop("checked", true);
		} else {
			$("#quanxuan").prop("checked", false);

		}
		count_price();
	})
	//全选
	$("#quanxuan").click(function() {
		$("#cartList>li>input.check").prop("checked", $(this).prop("checked"));
		$("#fanxuan").prop("checked", false);
		count_price();
	});
	//反选
	$("#fanxuan").click(function(){
					$("#cartList>li>input.check").each(function(){
						$(this).prop("checked",!$(this).prop("checked"));
					});
					$("#quanxuan").prop("checked", false);
					count_price();
			});

})