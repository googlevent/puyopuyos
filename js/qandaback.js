var canvas;
var context;
var screenX = window.parent.screen.width;
var screenY = window.parent.screen.height;
var rad = Math.PI/180;
var kanransyaNUM = 12;
var kanransya = new Array(kanransyaNUM);
for(var i=0; i<kanransyaNUM; i++){
	kanransya[i] = new Image();
	kanransya[i].src = "./img/kanransya/"+(i+1)+".png";
}
var jiku = new Image();
jiku.src = "./img/kanransya/0.png";
var rotate = 0;

function init(){
	canvas = document.getElementById("canvas");
	if ( canvas.getContext ){
		context = canvas.getContext("2d");
		setInterval( draw , 33 );
	}
	for(var i=1; i<kanransyaNUM; i++){
		// console.log(Math.sin((360*rad/kanransyaNUM)*i));
	}
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	var jikuSizeX = 444;
	var jikuSizeY = 516;
	var jikuPosX = screenX-jikuSizeX;
	var jikuPosY = screenY-jikuSizeY-100;
	context.drawImage(jiku, jikuPosX, jikuPosY, jikuSizeX, jikuSizeY);
	for(var i=1; i<kanransyaNUM*2; i++){
		var radius =240;
		var kanransyaSize = 25;
		var x = (jikuPosX+jikuSizeX/2)-kanransyaSize/2 + radius*Math.cos((360*rad/(kanransyaNUM*2-1))*i+rotate);
		var y = (jikuPosY+jikuSizeY/2)-kanransyaSize/2 + radius*Math.sin((360*rad/(kanransyaNUM*2-1))*i+rotate) -38;
		context.drawImage(kanransya[i%kanransyaNUM], x, y,kanransyaSize, kanransyaSize);
		rotate+=0.0002;
	}
}
