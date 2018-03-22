$(function(){
	getJson("https://tce.alicdn.com/api/data.htm?callback=?&ids=175785", web_nav);
	//header网站导航
	function web_nav(data) {
		var obj = data[175785].value.map;
		var len = data[175785].value.map.length;
		for(var i = 0; i < len; i++) {
			var str = "";
			for(var j = 0; j < obj[i].list.length; j++) {
				if(obj[i].list[j].hot == "true") {
					str += "<li><a href='" + obj[i].list[j].link + "'>" + obj[i].list[j].name + "<i class='hot'></i></a></li>";
				} else if(obj[i].list[j].new == "true") {
					str += "<li><a href='" + obj[i].list[j].link + "'>" + obj[i].list[j].name + "<i class='new'></i></a></li>";
				} else {
					str += "<li><a href='" + obj[i].list[j].link + "'>" + obj[i].list[j].name + "</a></li>";
				}
			}
			$(".web_nav").children().eq(i).children().eq(1).html(str);
			$(".web_nav").children().eq(i).children().eq(1).children().width(function() {
				return(100 / obj[i].column - 2) + "%";
			});
		}

}
	//判断是否已经登录
	$("header").load("header.html",function(){
		if(getCookie("user_online")) {
	var user = getCookie("user_online");
	$(".person_msg").text("Hi!" + user);
	$(".touxiang").children().first().attr("href", "cart.html");
	$(".person_fun>a").first().attr("href", "cart.html").text("购物车").next().text("注销");
	$(".header_left>ul>li").eq(1).children().first().attr("href", "cart.html").text(user);
	$(".person_fun>a").eq(1).click(function() {
		removeCookie("user_online");
		location.href = "index.html";
	});
}
});


});
