var canvas;

var canvasgame = {};

$(document).ready(function(){

	var doc_width = $(window).width();
	var doc_height = $(window).height();

	$('.canvas').each(function(){
		$(this).attr('width', doc_width);
		$(this).attr('height', doc_height);
	});

	$canvas = $('canvas');
	canvas = $canvas.get(0);
	var ctx = canvas.getContext('2d');

	var canvas_width = $canvas.width();
	var canvas_height = $canvas.height();

	ctx.fillStyle = '#76A363';

	ctx.beginPath();

	var terrain_map = Array(
		{x: 0, y: 0, elevations: [0,0,0,6]},{x: 0, y: 50, elevations: [6,0,0,0]},{x: 0, y: 100, elevations: [0,0,0,0]},{x: 0, y: 150, elevations: [0,0,0,0]},{x: 0, y: 200, elevations: [0,0,0,0]},{x: 0, y: 250, elevations: [0,0,0,0]},{x: 0, y: 300, elevations: [0,0,0,0]},{x: 0, y: 350, elevations: [0,0,0,0]},{x: 0, y: 400, elevations: [0,0,0,0]},{x: 0, y: 450, elevations: [0,0,0,0]},{x: 50, y: 0, elevations: [0,0,0,0]},{x: 50, y: 50, elevations: [0,0,0,0]},{x: 50, y: 100, elevations: [0,0,0,0]},{x: 50, y: 150, elevations: [0,0,0,0]},{x: 50, y: 200, elevations: [0,0,0,0]},{x: 50, y: 250, elevations: [0,0,0,0]},{x: 50, y: 300, elevations: [0,0,0,0]},{x: 50, y: 350, elevations: [0,0,0,0]},{x: 50, y: 400, elevations: [0,0,0,0]},{x: 50, y: 450, elevations: [0,0,0,0]},{x: 100, y: 0, elevations: [0,0,0,0]},{x: 100, y: 50, elevations: [0,0,0,0]},{x: 100, y: 100, elevations: [0,0,0,0]},{x: 100, y: 150, elevations: [0,0,0,0]},{x: 100, y: 200, elevations: [0,0,0,0]},{x: 100, y: 250, elevations: [0,0,0,0]},{x: 100, y: 300, elevations: [0,0,0,0]},{x: 100, y: 350, elevations: [0,0,0,0]},{x: 100, y: 400, elevations: [0,0,0,0]},{x: 100, y: 450, elevations: [0,0,0,0]},{x: 150, y: 0, elevations: [0,0,0,0]},{x: 150, y: 50, elevations: [0,0,0,0]},{x: 150, y: 100, elevations: [0,0,0,0]},{x: 150, y: 150, elevations: [0,0,0,0]},{x: 150, y: 200, elevations: [0,0,0,0]},{x: 150, y: 250, elevations: [0,0,0,0]},{x: 150, y: 300, elevations: [0,0,0,0]},{x: 150, y: 350, elevations: [0,0,0,0]},{x: 150, y: 400, elevations: [0,0,0,0]},{x: 150, y: 450, elevations: [0,0,0,0]},{x: 200, y: 0, elevations: [0,0,0,0]},{x: 200, y: 50, elevations: [0,0,0,0]},{x: 200, y: 100, elevations: [0,0,0,0]},{x: 200, y: 150, elevations: [0,0,0,0]},{x: 200, y: 200, elevations: [0,0,0,0]},{x: 200, y: 250, elevations: [0,0,8,0]},{x: 200, y: 300, elevations: [0,8,0,0]},{x: 200, y: 350, elevations: [0,0,0,0]},{x: 200, y: 400, elevations: [0,0,0,0]},{x: 200, y: 450, elevations: [0,0,0,0]},{x: 250, y: 0, elevations: [0,0,0,0]},{x: 250, y: 50, elevations: [0,0,0,0]},{x: 250, y: 100, elevations: [0,0,0,0]},{x: 250, y: 150, elevations: [0,0,0,0]},{x: 250, y: 200, elevations: [0,0,0,0]},{x: 250, y: 250, elevations: [0,0,0,8]},{x: 250, y: 300, elevations: [8,0,0,0]},{x: 250, y: 350, elevations: [0,0,0,0]},{x: 250, y: 400, elevations: [0,0,0,0]},{x: 250, y: 450, elevations: [0,0,0,0]},{x: 300, y: 0, elevations: [0,0,0,0]},{x: 300, y: 50, elevations: [0,0,0,0]},{x: 300, y: 100, elevations: [0,0,0,0]},{x: 300, y: 150, elevations: [0,0,0,0]},{x: 300, y: 200, elevations: [0,0,0,0]},{x: 300, y: 250, elevations: [0,0,0,0]},{x: 300, y: 300, elevations: [0,0,0,0]},{x: 300, y: 350, elevations: [0,0,0,0]},{x: 300, y: 400, elevations: [0,0,0,0]},{x: 300, y: 450, elevations: [0,0,0,0]},{x: 350, y: 0, elevations: [0,0,0,0]},{x: 350, y: 50, elevations: [0,0,0,0]},{x: 350, y: 100, elevations: [0,0,0,0]},{x: 350, y: 150, elevations: [0,0,0,0]},{x: 350, y: 200, elevations: [0,0,0,0]},{x: 350, y: 250, elevations: [0,0,0,0]},{x: 350, y: 300, elevations: [0,0,0,0]},{x: 350, y: 350, elevations: [0,0,0,0]},{x: 350, y: 400, elevations: [0,0,0,0]},{x: 350, y: 450, elevations: [0,0,0,0]},{x: 400, y: 0, elevations: [0,0,0,0]},{x: 400, y: 50, elevations: [0,0,0,0]},{x: 400, y: 100, elevations: [0,0,0,0]},{x: 400, y: 150, elevations: [0,0,0,0]},{x: 400, y: 200, elevations: [0,0,0,0]},{x: 400, y: 250, elevations: [0,0,0,0]},{x: 400, y: 300, elevations: [0,0,0,0]},{x: 400, y: 350, elevations: [0,0,0,0]},{x: 400, y: 400, elevations: [0,0,0,0]},{x: 400, y: 450, elevations: [0,0,0,0]},{x: 450, y: 0, elevations: [0,0,0,0]},{x: 450, y: 50, elevations: [0,0,0,0]},{x: 450, y: 100, elevations: [0,0,0,0]},{x: 450, y: 150, elevations: [0,0,0,0]},{x: 450, y: 200, elevations: [0,0,0,0]},{x: 450, y: 250, elevations: [0,0,0,0]},{x: 450, y: 300, elevations: [0,0,0,0]},{x: 450, y: 350, elevations: [0,0,0,0]},{x: 450, y: 400, elevations: [0,0,0,0]},{x: 450, y: 450, elevations: [0,0,0,0]}
		// {x: 0, y: 0, elevations: [0,0,0,0]}
	);
	// console.log(terrain_map);

	ctx.beginPath();
	for(var i in terrain_map){
		// console.log(terrain_map[i].x);
		draw_tile( terrain_map[i].x, terrain_map[i].y, terrain_map[i].elevations );
	}

	// var terrain_text;
	// var ix = 0;
	// while(ix < 500){
	// 	var iy = 0;

	// 	while(iy < 500){
	// 		// draw_tile(ix, iy);
	// 		terrain_text += '{x: '+x+', y: '+y+', elevations: [0,0,0,0]}';
	// 		iy += 50;
	// 	}

	// 	ix += 50;
	// }
	// console.log(terrain_text);

	ctx.fill();

	function draw_tile(x, y, elevations){
		// console.log(elevations);
		moveToC(x, y, elevations[0] );
		lineToC(x+45, y, elevations[1]);
		lineToC(x+45, y+45, elevations[2]);
		lineToC(x, y+45, elevations[3]);
		ctx.closePath();
	}

	function moveToC(input_x, input_y, extra_elevation){
		var points = square_to_iso(input_x, input_y);

		if(extra_elevation != 0){
			points[1] -= extra_elevation;
		}

		ctx.moveTo(points[0], points[1]);
	}

	function lineToC(input_x, input_y, extra_elevation){
		var points = square_to_iso(input_x, input_y);

		if(extra_elevation != 0){
			points[1] -= extra_elevation;
		}

		ctx.lineTo(points[0], points[1]);
	}

	function square_to_iso(input_x, input_y){
		var pt_x = (input_x - input_y);
		var pt_y = (input_x + input_y) / 2;

		pt_x += (canvas_width/2);
		return( [pt_x, pt_y] );
	}

	// ctx.moveTo(50,150);
	// ctx.lineTo(100,150);
	// ctx.lineTo(100,200);
	// ctx.lineTo(50,200);
	// ctx.closePath();

	// points = square_to_iso(250,350);
	// ctx.moveTo(points[0]+500,points[1]);
	// points = square_to_iso(300,350);
	// ctx.lineTo(points[0]+500,points[1]);
	// points = square_to_iso(300,400);
	// ctx.lineTo(points[0]+500,points[1]);
	// points = square_to_iso(250,400);
	// ctx.lineTo(points[0]+500,points[1]);
	// ctx.closePath();

	// ctx.fill();

	// var ix = 0;
	// while(ix < canvas_width){
	// 	var iy = 0;

	// 	while(iy < canvas_height){

	// 		// ctx.drawImage(images['grass'], ix, iy);
	// 		ctx.fillStyle = 'black';
	// 		var points = square_to_iso(ix, iy);
	// 		ctx.fillRect(points[0], points[1], 63, 63);

	// 		// console.log(ix + ':' +iy);

	// 		iy += 64;
	// 	}

	// 	ix += 64;
	// }

	// ctx.fillRect(doc_width-50,50,40,100);
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

// function draw_terrain(images){
// 	$canvas = $('#terrain');
// 	canvas = $canvas.get(0);
// 	var ctx = canvas.getContext('2d');

// 	var canvas_width = $canvas.width();
// 	var canvas_height = $canvas.height();


// 	var ix = 0;
// 	while(ix < canvas_width){
// 		var iy = 0;

// 		while(iy < canvas_height){

// 			ctx.drawImage(images['grass'], ix, iy);

// 			iy += 64;
// 		}

// 		ix += 64;
// 	}
// }