var canvas;
var context;
var screenX = window.parent.screen.width;
var screenY = window.parent.screen.height;
var count;


//cloud
var cloudNUM = 15;
var image = new Image();
image.src = "./img/1056812.png";
var cloudSize = new Array(cloudNUM);
var cloudPositionX = new Array(cloudNUM);
var cloudPositionY = new Array(cloudNUM);

//ballon
var ballonNUM = 20; 
var ballonImageNUM = 6;
var imageb  = new Array(ballonImageNUM);
for(var i=0; i<ballonImageNUM; i++){
	imageb[i] = new Image();
}
imageb[0].src = "./img/fusen/284657b1.png";
imageb[1].src = "./img/fusen/284657g1.png";
imageb[2].src = "./img/fusen/284657o1.png";
imageb[3].src = "./img/fusen/284657p1.png";
imageb[4].src = "./img/fusen/284657r1.png";
imageb[5].src = "./img/fusen/284657y1.png";
var ballonPositionX = new Array(ballonNUM);
var ballonPositionY = new Array(ballonNUM);
var ballonVecX =  new Array(ballonNUM);
var ballonVecY =  new Array(ballonNUM);
var ballonSize = new Array(ballonNUM);
var ballonSizePlus = new Array(ballonNUM);

function init(){
	canvas = document.getElementById("topcanvas");
	if ( canvas.getContext ){
		context = canvas.getContext("2d");
		setInterval( draw , 33 );
	}
	count = 0;

	//cloud
	for(var i=0; i<cloudNUM; i++){
		cloudSize[i] = (Math.random()+0.1)*100 + 20;
		cloudPositionX[i] = Math.random()*canvas.width;
		cloudPositionY[i] = (Math.random()-0.8)*200+(screenY/2)-125;
	}

	//ballon
	for(var i=0; i<ballonNUM; i++){
		ballonPositionX[i] = Math.random()*screenX;
		ballonPositionY[i] = screenY/2 + Math.random()*100;
		ballonSize[i] = 0;
		ballonSizePlus[i] = Math.random()*50 + 20;
		ballonVecX[i] = (Math.random()-0.5)*2.5;
		ballonVecY[i] = (Math.random()+0.01)*5 + 1;
	}
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	count++;
	console.log(count);
	//cloud
	for(var i=0; i<cloudNUM; i++){
		context.drawImage(image, cloudPositionX[i], cloudPositionY[i]-cloudSize[i], cloudSize[i], cloudSize[i]);
	}

	for(var i=0; i<cloudNUM; i++){
		cloudPositionX[i] += 1;
		cloudPositionY[i] += Math.sin(cloudPositionX[i]/10);
		if(cloudPositionX[i] > screenX){
			cloudPositionX[i] = -130;
		}
	}
	//ballon
	if(count%700 == 0){
		for(var i=0; i<ballonNUM; i++){
			ballonPositionX[i] = Math.random()*screenX;
			ballonPositionY[i] = screenY/2 + Math.random()*100;
			ballonSize[i] = 0;

		}
	}
	for(var i=0; i<ballonNUM; i++){
		var n = i%ballonImageNUM;
		context.drawImage(imageb[n], ballonPositionX[i], ballonPositionY[i], ballonSize[i], ballonSize[i]*2);
	}
	for(var i=0; i<ballonNUM; i++){
		ballonPositionX[i] += ballonVecX[i];
		ballonPositionY[i] -= ballonVecY[i];
		ballonSize[i] += (ballonSizePlus[i] - ballonSize[i])/30;
	}
}






