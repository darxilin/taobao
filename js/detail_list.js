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
	$("#view>img").first().attr("src",src);
	$("#box_img>img").first().attr("src",src);
	$("#box_small>ul>li").click(function(){
		var src = $(this).children().first().attr("src");
		$("#box_img>img").first().attr("src",src);
		$("#view>img").first().attr("src",src);
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	oBox_img.onmouseover = function() {
		oBlock.style.display = "block";
		oView.style.display = "block";
		var a = oBox.offsetLeft;
		var b = oBox.offsetTop+oBox_img.offsetTop;
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
})