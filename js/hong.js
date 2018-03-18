//获取接口数据
function getJson(url, fn) {
	$.getJSON(url, function(data) {
		fn(data);
	});
}

//搜索建议
function search() {
	if($("#search_content").val() != "") {
		$(".search_result").show();
		$.getJSON("https://suggest.taobao.com/sug?callback=?", {
			q: $("#search_content").val(),
			k: 1,
			area: "c2c"
		}, function(data) {
			var str = "";
			for(var i = 0; i < data.result.length; i++) {
				str += "<li>" + data.result[i][0] + "</li>";
			}
			$(".search_result").html(str);
		});
	} else {
		$(".search_result").hide();
	}

}

function show(data, json, data1) {
	$(".caidan").append(function() {
		var str = "";
		for(var key in data) {
			str += "<li>";
			//获取目录每一行的数据
			for(var i = 0; i < data[key].length; i++) {
				str += "<a href='" + json[data[key][i].id].value.head[0].link + "'>" + data[key][i].name + "</a>/";

			}
			str += "<ul><li class='Mulu_list'><div class='Mulu_list_left'>";
			//获取目录详细列表
			for(var i = 0; i < data[key].length; i++) {
				str += "<div class='list'><p><a href='" + json[data[key][i].id].value.head[0].link + "'>" + json[data[key][i].id].value.head[0].name + "</a><a href='" + json[data[key][i].id].value.head[0].more + "'>更多></a></p><div class='list_detail'>";
				var arr = json[data[key][i].id].value.list;
				for(var j = 0; j < arr.length; j++) {
					if(arr[j].h == "true") {
						str += "<a href='" + arr[j].link + "' class='hot'>" + arr[j].name + "</a>";
					} else {
						str += "<a href='" + arr[j].link + "'>" + arr[j].name + "</a>";
					}

				}
				str += "</div></div>";
			}
			str += "</div></li></ul></li>";
		}
		return str;
	});
}