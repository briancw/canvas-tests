var canvas;

var canvasgame = {};

$(document).ready(function(){

	function preload_images(images, loading_callback){
		console.log('starting');

		var loaded_images = {};
		var total_images = 0;
		var loaded_count = 0;

		for(var src in images){
			loaded_images[src] = new Image();
			loaded_images[src].src = images[src];
			loaded_images[src].onload = function(){
				loaded_count++;
			};

			total_images++;
		}

		var loading_timer = setInterval(function(){
			if(loaded_count == total_images){
				clearInterval(loading_timer);
				loading_callback(loaded_images);
			}
		}, 5);
	}

	// function loading_finished(loaded_images){
	// 	images = loaded_images;
	// }
	// preload_images(preload_image_paths, loading_finished);

	var preload_image_paths = {
		earth: 'assets/img/bigearth.jpg',
		grass: 'assets/img/grass.png'
	};

	preload_images(preload_image_paths, function(images){

		$canvas = $('#canvas');
		canvas = $canvas.get(0);
		var ctx = canvas.getContext('2d');

		var canvas_width = $canvas.width();
		var canvas_height = $canvas.height();

		var ix = 0;
		while(ix < canvas_height){
			var iy = 0;

			while(iy < canvas_height){

				ctx.drawImage(images['grass'], ix, iy);
				console.log( ix + ':' + iy);

				iy += 64;
			}

			ix += 64;
		}

	});


	// canvas = $('#canvas').get(0);
	// var ctx = canvas.getContext('2d');

	// ctx.drawImage(images['grass'], 100, 100);
	// ctx.drawImage(images['earth'], 200, 200);

	// ctx.fillRect(50,50,100,100);
	// ctx.strokeRect(50,50,100,100);

	// ctx.beginPath();
	// ctx.moveTo(50,50);
	// ctx.lineTo(100,250);
	// ctx.lineTo(250,250);
	// ctx.closePath();
	// ctx.fill();

	// ctx.strokeStyle = '#f00';
	// ctx.lineWidth = 5;
	// ctx.fillRect(50,50,100,100);

	// ctx.clearRect(50,50,50,50);


});