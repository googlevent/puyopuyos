var canvas;
var context;
var cloudNUM = 15;
var image = new Image();
image.src = "./img/1056812.png";
var cloudSize = new Array(cloudNUM);
var cloudPositionX = new Array(cloudNUM);
var cloudPositionY = new Array(cloudNUM);
var screenX = window.parent.screen.width;
var screenY = window.parent.screen.height;

function init(){
	canvas = document.getElementById("canvas");
	if ( canvas.getContext ){
		context = canvas.getContext("2d");
		setInterval( draw , 33 );
	}

	for(var i=0; i<cloudNUM; i++){
		cloudSize[i] = (Math.random()+0.1)*100 + 20;
		cloudPositionX[i] = Math.random()*canvas.width;
		cloudPositionY[i] = (Math.random()-0.8)*200+(screenY/2);
		console.log(cloudPositionY[i]);
	}
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(var i=0; i<cloudNUM; i++){
		context.drawImage(image, cloudPositionX[i], cloudPositionY[i]-cloudSize[i], cloudSize[i], cloudSize[i]);
	}

	for(var i=0; i<cloudNUM; i++){
		cloudPositionX[i] += 1;
		cloudPositionY[i] += Math.sin(cloudPositionX[i]/10);
		if(cloudPositionX[i] > screenX){
			cloudPositionX[i] = -200;
		}
	}
}