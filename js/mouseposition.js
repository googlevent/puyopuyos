var mouseX, mouseY;
function MouseMove00Func(e){
	var element;
	mouseX = e.screenX;
	// console.log(mouseX);
	mouseY = e.screenY;
	var m = mouseX-100;
	 console.log(mouseX);
	 $('#droid').attr({style: 'left:'+m});
	}

	if(document.addEventListener){

		// マウスを移動するたびに実行されるイベント
		document.addEventListener("mousemove" , MouseMove00Func);

		// アタッチイベントに対応している
	}else if(document.attachEvent){
		// マウスを移動するたびに実行されるイベント
		document.attachEvent("onmousemove" , MouseMove00Func);
	}
