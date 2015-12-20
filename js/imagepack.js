$( function(){
	var imageFile = ["./img/hakodot.png",
	"./img/hakodot2.png",
	"./img/hakodot3.png",
	"./img/hakodot4.png",
	"./img/hakodot5.png"];
	for(var i=0; i<imageFile.length; i++){
		var des = '<li><img class=\"imbef\" src=\"'+imageFile[i]+'\" style=\"margin: 0;padding:3px\"></li>';
		$('#content #preference_rank #imagepack .aft ul #aftul').append(des);
	}
});

