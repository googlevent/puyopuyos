$( function(){
	var imageFile = ["./img/hakodot.png",
	"./img/hakodot2.png",
	"./img/hakodot3.png",
	"./img/hakodot4.png",
	"./img/hakodot5.png",
	"./img/hakodot6.png",
	"./img/hakodot7.png",
	"./img/hakodot8.png",
	"./img/hakodot9.png"];
	for(var i=0; i<imageFile.length; i++){
		var des = '<li><img class=\"imbef\" src=\"'+imageFile[i]+'\" style=\"margin: 0;padding: 0 0 3px 3px;\"></li>';
		$('#content #preference_rank #imagepack .aft ul #aftul').append(des);
	}
});

