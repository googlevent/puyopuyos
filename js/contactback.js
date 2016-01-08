var canvas;
var context;
var screenX = window.parent.screen.width;
var screenY = window.parent.screen.height;
var mouseX;
var mouseY;
var count=0;
var once = 1000000;
var isMouseDown;
var audio = new Audio();

//ballon
var ballonNUM = 10; //飛ばす風船の数
var ballonImageNUM = 12; //用意されてる風船の種類数
var color = new Array(ballonNUM); //飛ばす風船の色を格納
var imageb  = new Array(ballonImageNUM);
for(var i=0; i<ballonImageNUM; i++){
	imageb[i] = new Image();
}
for(var i=0; i<2; i++){
	imageb[6*i].src = "./img/fusen/284657b"+(i+1)+".png";
	imageb[6*i+1].src = "./img/fusen/284657g"+(i+1)+".png";
	imageb[6*i+2].src = "./img/fusen/284657o"+(i+1)+".png";
	imageb[6*i+3].src = "./img/fusen/284657p"+(i+1)+".png";
	imageb[6*i+4].src = "./img/fusen/284657r"+(i+1)+".png";
	imageb[6*i+5].src = "./img/fusen/284657y"+(i+1)+".png";
}
var ballonPositionX = new Array(ballonNUM);
var ballonPositionY = new Array(ballonNUM);
var ballonVecX =  new Array(ballonNUM);
var ballonVecY =  new Array(ballonNUM);
var ballonSize = new Array(ballonNUM);
var ballonSizePlus = new Array(ballonNUM);

function setup(){
		//ballon
		for(var i=0; i<ballonNUM; i++){
			ballonPositionX[i] = Math.random()*screenX;
			ballonPositionY[i] = screenY+ Math.random()*100;
			ballonSize[i] = 0;
			ballonSizePlus[i] = Math.random()*90 + 20;
			ballonVecX[i] = (Math.random()-0.5)*2.5;
			ballonVecY[i] = (Math.random()+0.01)*5 + 1;
			color[i] = Math.round((Math.random()*100)) % (ballonImageNUM/2) ;
		}
	}

	function init(){
		canvas = document.getElementById("canvas");
		if ( canvas.getContext ){
			context = canvas.getContext("2d");

			setup();
			soundSet();

		//**************************************
		document.onmousedown = onDocMouseDown;
		document.onmouseup   = onDocMouseUp;
		document.onmousemove = onDocMouseMove;
		//**************************************
		
		setInterval( draw , 33 );

	}

}

function draw(){
	// console.log(mouseX+" , "+mouseY);
	context.clearRect(0, 0, canvas.width, canvas.height);
	count++;
	// console.log(count);
	//ballon
	if(count%500 == 0){
		for(var i=0; i<ballonNUM; i++){
			setup();
		}
	}
	for(var i=0; i<ballonNUM; i++){
		imageClick(i);
		context.drawImage(imageb[ color[i] ], ballonPositionX[i], ballonPositionY[i], ballonSize[i], ballonSize[i]*2);
	}

	for(var i=0; i<ballonNUM; i++){
		ballonPositionX[i] += ballonVecX[i];
		ballonPositionY[i] -= ballonVecY[i];
		ballonSize[i] += (ballonSizePlus[i] - ballonSize[i])/30;
	}

}

//**********************************
// 画像クリック判定
//**********************************
function imageClick(i){
	//画像クリック判定
	if(ballonPositionX[i] < mouseX && mouseX < (ballonPositionX[i]+ballonSize[i]) &&
		ballonPositionY[i] < mouseY && mouseY < (ballonPositionY[i]+ballonSize[i]*2) ){
		if(once == 0 && color[i] < 6){
			color[i] = color[i]+6;
			ballonVecY[i] = -8;
			ballonVecX[i] = 0;
			soundEffect();
		}
		once++;
	} 

}


//**********************************
// サウンド
//**********************************
function soundSet(){
	audio = new Audio();
	audio.autoplay = false;
	if( audio.canPlayType( 'audio/mp3' ) ) audio.src = './sound/balloon_bursting1.mp3';
	else if( audio.canPlayType( 'audio/wav' ) )	audio.src = './sound/balloon_bursting1.wav';
	audio.load(); //明示的にサウンドファイルの読み込みを開始
	document.body.appendChild(audio);
}
function soundEffect(){
	audio.play();
}
//**********************************
// マウスイベント
//**********************************

function mouseEve( e ){
	var ev = e ? e : window.event;
	mouseX = ev.clientX;
	mouseY = ev.clientY;
}

function onDocMouseMove( e ){
	// mouseEve(e);
}

function onDocMouseDown( e ){
	isMouseDown = true;
	once = 0;
	mouseEve(e);
	return false;
}

function onDocMouseUp( e ){
	isMouseDown = false;
	return false;
}

