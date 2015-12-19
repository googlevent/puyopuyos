enchant();

var FPS = 30;
var MAX_ROW=15;
var MAX_COL=10;
var CELL_SIZE=16;
var PUYOS_IMG="puyos.png"

window.onload=function(){
	var game=new Game(160,240);
	game.fps=FPS;
	game.preload(PUYOS_IMG);
	game.keybind(32,'a');
	game.onload=function(){
		var scene=game.rootScene;
		var map=new Map(16,16);
		var field = new Array(MAX_ROW);
		for (var i=0;i<field.length;i++){
			var temp_array=[];
			for(var j=0;j<MAX_COL;j++){
				if(j==0 || j==MAX_COL-1||i==MAX_ROW-1) temp_array[j]=0;
				else temp_array[j]=-1;
			}
			field[i]=temp_array;
		}
		map.image=game.assets[PUYOS_IMG];
		map.loadData(field);
		scene.addChild(map);
		var pair=createPair(game,map,field);
		scene.addChild(pair);		
		scene.addEventListener("enterframe",function(){
			if(!pair.isFall){
				scene.removeChild(pair);
				freeFall(field);
				chain(field);
				map.loadData(field);
				if(field[2][3] != -1){
					game.stop();
					console.log("Game Over");
				}else{
					pair=createPair(game,map,field);
					scene.addChild(pair);
				}
			}
		});

	};
	game.start();
}



function createPuyo(game){
	var puyo=new Sprite(CELL_SIZE,CELL_SIZE);
	puyo.image=game.assets[PUYOS_IMG];
	puyo.frame=Math.floor(Math.random()*4+1);
	puyo.moveTo(0,0);
	return puyo;
}

function createPair(game,map,field){
	var pair=new Group();
	var p0=createPuyo(game);
	var p1=createPuyo(game);
	var forms = [[0,-CELL_SIZE],[CELL_SIZE,0],[0,CELL_SIZE],[-CELL_SIZE,0]];
	var formNum = 0;
	var inputRightCount=0;
	var inputLeftCount=0;
	var inputACount=0;
	pair.isFall=true;
	pair.addChild(p0);
	pair.addChild(p1);
	p0.y=-CELL_SIZE;
	pair.moveTo(CELL_SIZE*3,CELL_SIZE);
	pair.addEventListener("enterframe",function(){
		inputRightCount=game.input.right ? inputRightCount+1:0;
		inputLeftCount=game.input.left ? inputLeftCount+1:0;
		inputACount=game.input.a ? inputACount+1:0;
			
		if(inputACount==1){
			var newFormNum=(formNum+1) % 4;
			var newX=forms[newFormNum][0];
			var newY=forms[newFormNum][1];
			if (!map.hitTest(this.x+newX,this.y+newY)){
				formNum=newFormNum;
				p0.moveTo(newX,newY);
			}
		}
		var newX=0;
		if(inputRightCount==1){
			newX= formNum==1 ? p0.x+CELL_SIZE : p1.x+CELL_SIZE;
		}
		if(inputLeftCount==1){
			newX= formNum==3 ? p0.x-CELL_SIZE : p1.x-CELL_SIZE;
		}
		if(!map.hitTest(this.x+newX,this.y+p0.y)&& !map.hitTest(this.x+newX, this.y+p1.y)){
			this.x=this.x+(newX?newX>=0?1:-1:0)*CELL_SIZE;
		}

		newY= formNum==2 ? p0.y+CELL_SIZE : p1.y+CELL_SIZE;
		var vy = Math.floor(game.input.down ? game.fps/10 : game.fps/1);
		if(game.frame%vy==0){
			if(!map.hitTest(this.x+p0.x,this.y+newY)&& !map.hitTest(this.x+p1.x, this.y+newY)){
				this.y +=CELL_SIZE;
			}
			else{
				field[(this.y+p0.y)/CELL_SIZE][(this.x+p0.x)/CELL_SIZE]=p0.frame;
				field[(this.y+p1.y)/CELL_SIZE][(this.x+p1.x)/CELL_SIZE]=p1.frame;
				pair.isFall=false;
			}
		}

	});
	return pair;
}

function countPuyos(row,col,field){
	var c = field[row][col];
	var n=1;
	field[row][col]=-1;
	if(row-1>=2 && field[row-1][col]==c) n+=countPuyos(row-1,col,field);
	if(row+1<=MAX_ROW-2 && field[row+1][col]==c) n+=countPuyos(row+1,col,field);
	if(col-1>=0 && field[row][col-1]==c) n+=countPuyos(row,col-1,field);
	if(col+1<=MAX_COL-2 && field[row][col+1]==c) n+=countPuyos(row,col+1,field);
	field[row][col]=c;
	return n;
}

function deletePuyos(row,col,field){
	var c = field[row][col];
	field[row][col]=-1;
	if(row-1>=2 &&field[row-1][col]==c) deletePuyos(row-1,col,field);
	if(row+1<=MAX_ROW-2 && field[row+1][col]==c) deletePuyos(row+1,col,field);
	if(col-1>=0 && field[row][col-1]==c) deletePuyos(row,col-1,field);
	if(col+1<=MAX_COL-2 && field[row][col+1]==c) deletePuyos(row,col+1,field);
}

function freeFall(field){
	var c=0;
	for(var i=0;i<MAX_COL;i++){
		var spaces=0;
		for(var j=MAX_ROW-1;j>=0;j--){
			if(field[j][i]==-1) spaces ++;
			else if(spaces >=1){
				field[j+spaces][i]=field[j][i];
				field[j][i]=-1;
				c++;
			}
		}
	}
	return c;
}



function chain(field){
	for(var i=0;i<MAX_ROW; i++){
		for(var j=0;j<MAX_COL; j++){
			var n=0;
			if(field[i][j]>=1 && countPuyos(i,j,field)>=4){
				deletePuyos(i,j,field);
			};
		}
	}
	if(freeFall(field)>=1) chain(field);
}



