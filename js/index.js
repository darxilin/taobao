$(function() {
	/*var wait = function() {
		var def = $.Deferred();
		var task = function() {
			$("header").load("header.html");
			$("footer").load("footer.html");
			def.resolve();
		}
		setTimeout(task, 0);
		return def;
	}

	$.when(wait()).done(function() {});*/

	//加载搜索框下热词
	$.getJSON("json/search.json", function(data) {
		var str = "";
		(function() {
			for(var i = 0; i < data.search.length; i++) {
				if(data.search[i].hot == "true") {
					str += "<a href='#' class='hot'>" + data.search[i].keyword + "</a>";
				} else {
					str += "<a href='#'>" + data.search[i].keyword + "</a>";
				}

			}
			$(".keyword").html(str);

		})();
	});

	//搜索建议
	$("#search_content").focus(function() {

		$(this).keyup(function() {
			search();
		});
		search();
		$("#search_content").blur(function() {
			$(".search_result").hide();

		});
	});

	//选择搜索建议
	$(".search_result").on("mousedown", "li", function(event) {
		var target = $(event.target);
		console.log(target.text());
		$("#search_content").val(target.text());
	});

	//获取详细目录
	getJson("json/mulu.json", showMulu_detail);

	function showMulu_detail(data) {
		getJson("https://tce.alicdn.com/api/data.htm?ids=222887%2C222890%2C222889%2C222886%2C222906%2C222898%2C222907%2C222885%2C222895%2C222878%2C222908%2C222879%2C222893%2C222896%2C222918%2C222917%2C222888%2C222902%2C222880%2C222913%2C222910%2C222882%2C222883%2C222921%2C222899%2C222905%2C222881%2C222911%2C222894%2C222920%2C222914%2C222877%2C222919%2C222915%2C222922%2C222884%2C222912%2C222892%2C222900%2C222923%2C222909%2C222897%2C222891%2C222903%2C222901%2C222904%2C222916%2C222924&callback=?", getMulu_detail);

		function getMulu_detail(json) {

			/*getJson("https://tui.taobao.com/recommend?_ksTS=1521016122970_3424&callback=?&appid=2807",showAll);
				
			function showAll(data1){
				console.log(data,json,data1);
			}*/
			show(data, json);
			//console.log(data,json);
		}
	}

	//控制菜单详细列表显示
	$(".caidan>li").hover(function() {
		$(this).find("ul").eq(0).find(".Mulu_list").show();

	});

	//第一个轮播图右侧广告
	$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1947787&tce_vid=0&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", function(data) {
		var str = "";
		str += "<a href='" + data.result[1947787].result[0].targetUrl + "'><img src='" + data.result[1947787].result[0].imgUrl + "'/></a>";
		$(".ad_top").html(str);
	});

	//第二个轮播图右侧广告
	$.getJSON("https://ecpm.tanx.com/ex?i=mm_12852562_1778064_48868196&cb=?&r=https%3A%2F%2Flogin.taobao.com%2Fmember%2Flogin.jhtml%3FredirectURL%3Dhttps%253A%252F%252Fwww.taobao.com%252F%253Fspm%253Da2107.1.1000340.1.4c6d11d9i5umCU&cg=abb061a4fe1f115086402c68bb37bbb0&pvid=d1af7cf756d429aecd23dad6bab79bcc&u=https%3A%2F%2Fwww.taobao.com%2F%3Fspm%3Da2107.1.1000340.1.1e1a11d9tANv41&psl=1&nk=37%2C53%2C67%2C117%2C54%2C68%2C50%2C65%2C37%2C53%2C67%2C117%2C53%2C70%2C67%2C54%2C37%2C53%2C67%2C117%2C55%2C70%2C49%2C56&sk=&refpid=&fp=1.KdiABi7P0n5crdYMwCewqxyucipzpBmastu2d7gYN8X5QP0RcX_7Jr.UTF-8.hu2lztSK_gBAtByID_hEI0DmqgiayA.Q.85js5u", function(data) {
		var str = "";
		str += "<a href='" + data.clickurl + "'><img src='" + data.data + "'/></a>";
		$(".ad_bottom").html(str);
	});
	//淘宝头条数据加载

	//公告数据加载
	$.getJSON("https://tce.alicdn.com/api/data.htm?ids=1016988&callback=?", function(data) {
		var str = "<ul>";
		for(var i = 0; i < data[1016988].value.category.length; i++) {
			str += "<li class='gonggao_title'><a href='" + data[1016988].value.category[i].link + "'>" + data[1016988].value.category[i].title + "</a><ul>";
			var arr = data[1016988].value.category[i].items;
			for(var j = 0; j < arr.length; j++) {
				if(arr[j].enhance == "true") {
					str += "<li class='enhance'><a href='" + arr[j].link + "'>" + arr[j].text + "</a></li>";
				} else {
					str += "<li><a href='" + arr[j].link + "'>" + arr[j].text + "</a></li>";
				}
			}
			str += "</ul></li>";
		}
		str += "</ul>";
		$(".gonggao").html(str);
	});

	//控制公告数据显示
	$(".gonggao>ul").on("mouseover", "li", function(event) {
		var target = $(event.target);
		console.log(target.text());
		target.addClass("gonggao_hover").siblings().removeClass("gonggao_hover");
	});

	//阿里app
	$.getJSON("https://tce.alicdn.com/api/mget.htm?callback=?&tce_sid=1947680,1947683&tce_vid=0,0&tid=,&tab=,&topic=,&count=,&env=online,online", function(data) {
		var str = "<div class='aliapp_title'><p>阿里APP</p><a href='" + data.result[1947680].result[0].more + "'>更多></a></div><div class='aliapp_icon'>";
		for(var i = 0; i < 10; i++) {
			str += "<a href='" + data.result[1947683].result[i].link + "'><img src='" + data.result[1947683].result[i].img + "' /><div><img src='" + data.result[1947683].result[i].qr + "' /></div></a>";
		}
		str += "</div>";
		$(".aliapp").html(str);
	});

	//生活研究所数据加载

	$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1949464&tce_vid=2&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR&pageSize=6", function(data) {
		var str = "<div class='yanjiu_box'>";
		for(var i = 0; i < data.result[1949464].result[0].item.length; i++) {
			str += "<a href='" + data.result[1949464].result[0].item[i].clickUrl + "'><div class='yanjiu_content'><div class='yanjiu_imgbox'><img src='" + data.result[1949464].result[0].item[i].picUrl + "'/></div><div class='yanjiu_detail'><div class='yanjiu_detail_title'>" + data.result[1949464].result[0].item[i].title + "</div><div class='yanjiu_dec'>" + data.result[1949464].result[0].item[i].subtitle + "</div><div class='yanjiu_hot'><span></span>人气" + data.result[1949464].result[0].item[i].pop + "</div></div></div></a>";
		}
		str += "</div>";
		$(".yanjiu").append(str);
	});

	//有好货数据加载
	var haohuo_start = 6;
	$(".haohuo_change").click(function() {

		haohuo(haohuo_start);
		haohuo_start += 6;
	});

	function haohuo(start) {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1947676&tce_vid=1&tid=&tab=&topic=&count=&env=online&pageSize=6", {
			startIndex: start
		}, function(data) {
			$(".haohuo_content").html(function() {
				var str = "";
				var arr = data.result[1947676].result;
				for(var i = 0; i < arr.length; i++) {
					str += "<a href='" + arr[i].url + "'><div class='img_box'><img src='" + arr[i].pic + "'/></div><p class='haohuo_content_title'>" + arr[i].title + "</p><p class='haohuo_content_detail'>" + arr[i].content + "</p><p class='haohuo_pin'><span></span>" + arr[i].zanTotal + "人说好</p></a>";
				}
				return str;
			});
		});
	}
	haohuo(0);

	//爱逛街数据加载
	function guangjie() {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952191&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", function(data) {
			$(".guangjie_content").html(function() {
				var str = "";
				var arr = data.result[1952191].result[0].item;
				for(var i = 0; i < arr.length; i++) {
					str += "<a href='" + arr[i].data.url + "'><div class='img_box'><img src='" + arr[i].data.cover + "'/></div><p class='haohuo_content_title'><span></span>" + arr[i].data.desc + "</p><p class='haohuo_pin'><span class='guangjie_img'><img src='" + arr[i].data.forwardUserAvatar + "'/></span><span class='guangjie_name'>" + arr[i].data.forwardUserName + "</span></p></a>";
				}
				return str;
			});
		});
	}
	guangjie();

	//淘抢购数据加载
	function qianggou(start, end) {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1966462&tce_vid=0&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR&request=1", function(data) {
			$(".qianggou_content").html(function() {
				var str = "";
				var arr = data.result[1966462].result[0].item[1].itemList;
				for(var i = start; i < end; i++) {
					str += "<a href='" + arr[i].baseinfo.itemUrl + "'><div class='img_box'><img src='" + arr[i].baseinfo.picUrl + "'/></div><div class='qianggou_txt'><p class='haohuo_content_title'>" + arr[i].name.longName + "</p><p class='haohuo_content_detail'>" + arr[i].extend.tqgSellPoint + "</p><p class='haohuo_pin'><b>￥</b>" + arr[i].price.actPrice + "<span>￥" + arr[i].price.origPrice + "</span></p></div></a>";
				}
				return str;
			});
		});
	}
	qianggou(0, 3);

	//每日好店数据加载
	function haodian() {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1947675&tce_vid=1&tid=&tab=&topic=&count=&env=online", function(data) {
			$(".haodian>.dian_bo_content").html(function() {
				var str = "";
				var arr = data.result[1947675].result;
				for(var i = 0; i < 4; i++) {
					str += `<a href='${arr[i].url}'><p class='_title'><span>${arr[i].categoryName}</span><span>暂无店铺评价</span></p><div class='img_box'><div class='box_left'><div class='img_wrap'><img src='${arr[i].picThumb}'/></div></div><div class='box_right'><div class='img_wrap'><img src='${arr[i].pic1}'/></div><div class='img_wrap'><img src='${arr[i].pic2}'/></div></div></div></a>`;
				}
				return str;
			});
		});
	}
	haodian();

	//淘宝直播数据加载
	function zhibo() {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=2316013&tce_vid=2&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", function(data) {
			$(".zhibo>.dian_bo_content").html(function() {
				var str = "";
				var arr = data.result[2316013].result[0].item;
				for(var i = 0; i < 4; i++) {
					str += `<a href='${arr[i].data.itemList[0].itemUrl}'><p class='_title'><span>${arr[i].data.broadCaster.accountName}</span><span>${arr[i].data.totalJoinCount}观看</span></p><div class='img_box'><div class='box_left'><p>${arr[i].data.title}</p><div class='img_wrap'><img src='${arr[i].data.coverImg}'/></div></div><div class='box_right'><div class='img_wrap'><img src='${arr[i].data.itemList[0].itemImg}'/></div><div class='img_wrap'><img src='${arr[i].data.itemList[1].itemImg}'/></div></div></div></a>`;
				}
				return str;
			});
		});
	}
	zhibo();

	//时尚爆料王
	function baoliao() {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952103&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", function(data) {
			$(".baoliao_box").each(function(i) {
				var arr = data.result[1952103].result[0].item;
				$(this).children().first().html(arr[i].title).next().html(arr[i].subTitle).next().children().first().attr("href", arr[i].targetUrl).children().first().attr("src", arr[i].img1).end().end().next().attr("href", arr[i].targetUrl).children().first().attr("src", arr[i].img2);
				$(this).addClass(function() {
					return "dd" + i;
				});
			});
		});
	}
	baoliao();

	//猜你喜欢数据加载
	function guess() {
		get("https://tui.taobao.com/recommend?appid=2493&_ksTS=1521359149216_3155&callback=callback_guess");
		for(var i = 0; i < 74; i++) {
			$(".guess_box").first().clone().appendTo(".guess_content");
		}
	}
	guess();

	function pin(url, div) {
		var result = 0;
		if(div == ".pin") {
			result = 1952108;
		} else if(div == ".te") {
			result = 1952107;
		}
		$.getJSON(url, function(data) {
			var arr = data.result[result].result[0].item;
			$(div).find(".pin_te_box>.pin_te_left").find(".div1").first().find("img").first().attr("src", arr[0].img1);
			$(div + ">.pin_te_box>.pin_te_left>a").each(function(i) {
				$(this).attr("href", arr[i + 1].targetUrl).find("p").first().text(arr[i + 1].title).next().text(arr[i + 1].subTitle).end().end().end().find("img").first().attr("src", arr[i + 1].img1);
			});
			$(div + ">.pin_te_box>.pin_te_right>div").each(function(i) {
				$(this).find("p").first().find("a").first().attr("href", arr[i + 4].targetUrl).find("span").first().text(arr[i + 4].title).end().end().next().text(arr[i + 4].subTitle).parent().next().find("a").first().attr("href", arr[i + 4].targetUrl).children().first().attr("src", arr[i + 4].img1).parent().next().attr("href", arr[i + 4].targetUrl).children().first().attr("src", arr[i + 4].img2);
			});

		});
	}
	//品质生活家数据加载
	pin("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952108&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", ".pin");
	//特色玩味控数据加载
	pin("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952107&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", ".te");

	//实惠专业户数据加载
	function shihui() {
		$.getJSON("https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952106&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=NZHUDw1%2FRzwCAbfmAyPZZ6MR", function(data) {
			var arr = data.result[1952106].result[0].item;
			$(".shihui_box").each(function(i) {
				$(this).find("a").each(function(j) {
					$(this).attr("href", arr[i].targetUrl);
				}).first().text(arr[i].bizName).end().eq(1).children().first().attr("src", arr[i].img1).end().end().end().eq(2).text(arr[i].point).prev().text(arr[i].subTitle).prev().text(arr[i].title);
			});
		});
	}
	shihui();

	//热卖单品数据加载
	function danpin() {
		$.getJSON("https://textlink.simba.taobao.com/lk?_ksTS=1521018189664_5801&callback=?&pid=619362_1007", function(data) {
			$(".danpin>p").html(function() {
				var str = "";
				for(var i = 0; i < data.data.length; i++) {
					str += `<a href='${data.data[i][1]}'>${data.data[i][0]}</a>`;
				}
				return str;
			});
		});
		/*$.getJSON("https://tns.simba.taobao.com/?name=tcmad&st_type=5_8&o=m&count=10&pid=430406_1007&_ksTS=1521018189655_5773&p4p=js",function(data){
			var arr = data.data[0].addList;
			console.log(arr);
			$(".danpin_box").each(function(i){
				$(this).children().first().attr("src",arr[i].TBGOODSLINK).next().text(arr[i].TITLE).next().next().children().first().children().first().text(arr[i].PROMOTEPRICE).parent().next().text("月销"+arr[i].SELL+"笔");
			});
		});*/

		get("https://tns.simba.taobao.com/?name=tcmad&st_type=5_8&o=m&count=10&pid=430406_1007&_ksTS=1521018189655_5773&p4p=callback_danpin");
	}
	danpin();

	//侧边导航
	function floor() {
		var $NavList = $(".nav_fixed>a");
		var $ConList = $(".floor");
		var flag = true;
		if($(window).scrollTop() > (1000 - 300)) {
			$(".nav_fixed").fadeIn();
		} else {
			$(".nav_fixed").fadeOut();
		}
		$(document).scroll(function() {
			if(flag) {
				if($(window).scrollTop() > (1000 - 300)) {
					$(".nav_fixed").fadeIn();
				} else {
					$(".nav_fixed").fadeOut();
				}

				$ConList.each(function(index) {
					//console.log($(this).offset().top);
					if($(window).scrollTop() > $(this).offset().top - 300) {
						$NavList.eq(index).addClass("hover").siblings().removeClass("hover");
					}
				})
			}
			$(".nav_fixed>a:not(:nth-last-child(3)").click(function() {
				flag = false;
				var index = $(this).index();
				$("body,html").stop().animate({
					"scrollTop": $ConList.eq(index).offset().top
				}, function() {
					flag = true;
				});
			})
			$(".nav_fixed>a:nth-last-child(3)").click(function() {
				$("body,html").stop().animate({
					"scrollTop": 0
				});
			})
		});
	}
	floor();

	//点击搜索跳转页面
	$(".search_btn").click(function() {
		var search = $("#search_content").val();
		if(search) {
			location.href = "detail.html?q=" + encodeURIComponent(search);
		} else {
			$("#search_content").attr("placeholder", "请输入想要搜索的内容");
		}
	});

	//上部轮播图
	function banner1() {
		var i = 0;
		function move1(i){
			i++;
			if(i == $(".carousel-inner li").length) {
				i = 0;
			}
			if(i == -1){
				i=$(".carousel-inner li").length-1;
			}
			$(".carousel-item").eq(i).fadeIn().siblings().fadeOut();
			

			$(".pointer li").eq(i).addClass("hover").siblings().removeClass("hover");
			
		
		}
			
		
		var timer = setInterval(function() {
			console.log("666")
			console.log(i);
			move1(i);
			
		}, 3000);
		
		move1(0);
		$(".prev").click(function(){
			i = i-2;
			
			move1(i);
		})
		$(".next").click(function(){
			move1(i);
		})
		$(".pointer>li").click(function(){
			i = $(this).index()-1;
			move1(i);
		})
		
	}
	banner1();
	

});

//热卖单品回调函数
function callback_danpin(data) {
	var arr = data.data[0].adList;
	$(".danpin_box").each(function(i) {
		$(this).children().first().attr("src", arr[i].TBGOODSLINK).next().text(arr[i].TITLE).next().next().children().first().html("<b>￥</b>" + arr[i].PROMOTEPRICE).next().text("月销" + arr[i].SELL + "笔");
	});
}

//猜你喜欢回调函数
function callback_guess(data) {
	console.log(data);
	$(".guess_content").html(function() {
		var str = "";
		for(var i = 0; i < data.result.length; i++) {
			str += `<div class='guess_box'><a href='${data.result[i].url}'><img src='${data.result[i].pic}'/></a><p>${data.result[i].itemName}</p><p><span>￥</span>${data.result[i].promotionPrice}</p><a href='${data.result[i].detailUrl}'><p>找相似</p><p>发现更多相似的宝贝</p></a></div>`;
		}
		return str;
	});
}