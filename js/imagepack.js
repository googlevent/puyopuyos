function imload(imageid){
	document.getElementById("playerimg").innerHTML='<img src=\"./img/car/hakodot'+imageid+'.png\"></div>';
		// console.log(imageid);
}
$( function(){
		for(var i=1; i<13; i++){
			var des = '<li><img class=\"imbef\" src=\"./img/car/hakodot'+i+'.png\" style=\"margin: 0;padding: 0 0 8px 3px;\" onclick=\"imload('+i+')\"></li>';
			$('#content #preference_rank #imagepack .aft ul #aftul').append(des);
		}
});

