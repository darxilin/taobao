$(function() {
	var wait = function() {
		var def = $.Deferred();
		var task = function() {
			$("header").load("header.html");
			$("footer").load("footer.html");
			def.resolve();
		}
		setTimeout(task, 0);
		return def;
	}

	$.when(wait()).done(function() {

		console.log(GetRequest());
		//将url传来的搜索内容放到搜索框
		var obj = GetRequest();
		var q = obj.q;
		$(".search").val(q);
		$(".search_right").click(function() {
			var search = $(".search").val();
			getList("https://s.taobao.com/search?data-key=sort&data-value=default&ajax=true&_ksTS=1521510233032_1822&callback=?&&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306&sort=sale-desc", search, 1);
		})

		function getList(url, q, pageNum) {
			$.getJSON(url, {
				q: q
			}, function(data) {
				var str = "";
				var arr = data.mods.itemlist.data.auctions;
				for(var i = 0; i < arr.length; i++) {
					str += `<div class='list_box'><div class='img_box'><a href='${arr[i].detail_url}'><img src='${arr[i].pic_url}'/></a><p><span>找同款</span><span>找相似</span></p></div><p><span>￥${arr[i].view_price}</span><span>${arr[i].view_sales}</span></p><p><a href='${arr[i].detail_url}'>${arr[i].title}</a></p><p><a href='${arr[i].shopLink}'>${arr[i].nick}</a><span>${arr[i].item_loc}</span></p></div>`;
				}
				$(".content_list").html(str);
				$(".pageToltle").text(function() {
					return "共" + data.mods.pager.data.totalPage + "页，到第";
				});
				if($(".detail_prev").attr("page") <= 1) {
					$(".detail_prev").addClass("disable");
					$(".detail_prev").attr("page", 1);
					$(".detail_next").attr("page", pageNum + 1);
				} else {
					$(".detail_prev").attr("page", pageNum - 1);
					$(".detail_next").attr("page", pageNum + 1);
				}
			});
		}
		//点击上一页按钮
		$(".detail_prev").click(function() {
			var prev_page = $(this).attr("page");
			getList("https://s.taobao.com/search?data-key=sort&data-value=default&ajax=true&_ksTS=1521510233032_1822&callback=?&&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306&sort=sale-desc", q, prev_page);
		});
		//点击下一页按钮
		$(".detail_next").click(function() {
			var next_page = $(this).attr("page");
			getList("https://s.taobao.com/search?data-key=sort&data-value=default&ajax=true&_ksTS=1521510233032_1822&callback=?&&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306&sort=sale-desc", q, next_page);
		});
		//到第几页
		$(".detail_tiao").click(function() {
			var page = $("#detail_ye").val();
			getList("https://s.taobao.com/search?data-key=sort&data-value=default&ajax=true&_ksTS=1521510233032_1822&callback=?&&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306&sort=sale-desc", q, page);
		});
		getList("https://s.taobao.com/search?data-key=sort&data-value=default&ajax=true&_ksTS=1521510233032_1822&callback=?&&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306&sort=sale-desc", q, 1);
		$(document).scroll(function() {
			if($(window).scrollTop() > 150) {
				$(".search_box").css({
					"width": "1070px",
					"position": "fixed",
					"margin-top": "0",
					"left": "50%",
					"top": "0",
					"margin-left": "-675px",
					"z-index": "3"
				});
			} else {
				$(".search_box").css({
					"width": "1350px",
					"position": "static",
					"margin": "10px auto"
				});
			}
		});

		//修改外部引入html元素
		/*$("header").load('header.html', (text) => {
			if(getCookie("user_online")) {
				var user = getCookie("user_online");
				$(".header_left>ul>li").eq(1).children().first().attr("href", "cart.html").text(user);
			}

		})*/

	});
});