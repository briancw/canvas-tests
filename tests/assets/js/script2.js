var canvas;

var canvasgame = {};

$(document).ready(function(){

	var doc_width = $(window).width();
	var doc_height = $(window).height();

	$('.canvas').each(function(){
		$(this).attr('width', doc_width);
		$(this).attr('height', doc_height);
	});

	$terrain_canvas = $('#terrain');
	terrain_canvas = $terrain_canvas.get(0);
	var ctx = terrain_canvas.getContext('2d');

	var canvas_width = $terrain_canvas.width();
	var canvas_height = $terrain_canvas.height();

	ctx.fillStyle = '#76A363';

	ctx.beginPath();


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

	var terrain_map = Array(
		{x: 0, y: 0, elevations: [0,0,0,6]},{x: 0, y: 50, elevations: [6,0,0,0]},{x: 0, y: 100, elevations: [0,0,0,0]},{x: 0, y: 150, elevations: [0,0,0,0]},{x: 0, y: 200, elevations: [0,0,0,0]},{x: 0, y: 250, elevations: [0,0,0,0]},{x: 0, y: 300, elevations: [0,0,0,0]},{x: 0, y: 350, elevations: [0,0,0,0]},{x: 0, y: 400, elevations: [0,0,0,0]},{x: 0, y: 450, elevations: [0,0,0,0]},{x: 50, y: 0, elevations: [0,0,0,0]},{x: 50, y: 50, elevations: [0,0,0,0]},{x: 50, y: 100, elevations: [0,0,0,0]},{x: 50, y: 150, elevations: [0,0,0,0]},{x: 50, y: 200, elevations: [0,0,0,0]},{x: 50, y: 250, elevations: [0,0,0,0]},{x: 50, y: 300, elevations: [0,0,0,0]},{x: 50, y: 350, elevations: [0,0,0,0]},{x: 50, y: 400, elevations: [0,0,0,0]},{x: 50, y: 450, elevations: [0,0,0,0]},{x: 100, y: 0, elevations: [0,0,0,0]},{x: 100, y: 50, elevations: [0,0,0,0]},{x: 100, y: 100, elevations: [0,0,0,0]},{x: 100, y: 150, elevations: [0,0,0,0]},{x: 100, y: 200, elevations: [0,0,0,0]},{x: 100, y: 250, elevations: [0,0,0,0]},{x: 100, y: 300, elevations: [0,0,0,0]},{x: 100, y: 350, elevations: [0,0,0,0]},{x: 100, y: 400, elevations: [0,0,0,0]},{x: 100, y: 450, elevations: [0,0,0,0]},{x: 150, y: 0, elevations: [0,0,0,0]},{x: 150, y: 50, elevations: [0,0,0,0]},{x: 150, y: 100, elevations: [0,0,0,0]},{x: 150, y: 150, elevations: [0,0,0,0]},{x: 150, y: 200, elevations: [0,0,0,0]},{x: 150, y: 250, elevations: [0,0,0,0]},{x: 150, y: 300, elevations: [0,0,0,0]},{x: 150, y: 350, elevations: [0,0,0,0]},{x: 150, y: 400, elevations: [0,0,0,0]},{x: 150, y: 450, elevations: [0,0,0,0]},{x: 200, y: 0, elevations: [0,0,0,0]},{x: 200, y: 50, elevations: [0,0,0,0]},{x: 200, y: 100, elevations: [0,0,0,0]},{x: 200, y: 150, elevations: [0,0,0,0]},{x: 200, y: 200, elevations: [0,0,0,0]},{x: 200, y: 250, elevations: [0,0,8,0]},{x: 200, y: 300, elevations: [0,8,0,0]},{x: 200, y: 350, elevations: [0,0,0,0]},{x: 200, y: 400, elevations: [0,0,0,0]},{x: 200, y: 450, elevations: [0,0,0,0]},{x: 250, y: 0, elevations: [0,0,0,0]},{x: 250, y: 50, elevations: [0,0,0,0]},{x: 250, y: 100, elevations: [0,0,0,0]},{x: 250, y: 150, elevations: [0,0,0,0]},{x: 250, y: 200, elevations: [0,0,0,0]},{x: 250, y: 250, elevations: [0,0,0,8]},{x: 250, y: 300, elevations: [8,0,0,0]},{x: 250, y: 350, elevations: [0,0,0,0]},{x: 250, y: 400, elevations: [0,0,0,0]},{x: 250, y: 450, elevations: [0,0,0,0]},{x: 300, y: 0, elevations: [0,0,0,0]},{x: 300, y: 50, elevations: [0,0,0,0]},{x: 300, y: 100, elevations: [0,0,0,0]},{x: 300, y: 150, elevations: [0,0,0,0]},{x: 300, y: 200, elevations: [0,0,0,0]},{x: 300, y: 250, elevations: [0,0,0,0]},{x: 300, y: 300, elevations: [0,0,0,0]},{x: 300, y: 350, elevations: [0,0,0,0]},{x: 300, y: 400, elevations: [0,0,0,0]},{x: 300, y: 450, elevations: [0,0,0,0]},{x: 350, y: 0, elevations: [0,0,0,0]},{x: 350, y: 50, elevations: [0,0,0,0]},{x: 350, y: 100, elevations: [0,0,0,0]},{x: 350, y: 150, elevations: [0,0,0,0]},{x: 350, y: 200, elevations: [0,0,0,0]},{x: 350, y: 250, elevations: [0,0,0,0]},{x: 350, y: 300, elevations: [0,0,0,0]},{x: 350, y: 350, elevations: [0,0,0,0]},{x: 350, y: 400, elevations: [0,0,0,0]},{x: 350, y: 450, elevations: [0,0,0,0]},{x: 400, y: 0, elevations: [0,0,0,0]},{x: 400, y: 50, elevations: [0,0,0,0]},{x: 400, y: 100, elevations: [0,0,0,0]},{x: 400, y: 150, elevations: [0,0,0,0]},{x: 400, y: 200, elevations: [0,0,0,0]},{x: 400, y: 250, elevations: [0,0,0,0]},{x: 400, y: 300, elevations: [0,0,0,0]},{x: 400, y: 350, elevations: [0,0,0,0]},{x: 400, y: 400, elevations: [0,0,0,0]},{x: 400, y: 450, elevations: [0,0,0,0]},{x: 450, y: 0, elevations: [0,0,0,0]},{x: 450, y: 50, elevations: [0,0,0,0]},{x: 450, y: 100, elevations: [0,0,0,0]},{x: 450, y: 150, elevations: [0,0,0,0]},{x: 450, y: 200, elevations: [0,0,0,0]},{x: 450, y: 250, elevations: [0,0,0,0]},{x: 450, y: 300, elevations: [0,0,0,0]},{x: 450, y: 350, elevations: [0,0,0,0]},{x: 450, y: 400, elevations: [0,0,0,0]},{x: 450, y: 450, elevations: [0,0,0,0]}
	);
	// console.log(terrain_map);

	ctx.beginPath();
	for(var i in terrain_map){
		// console.log(terrain_map[i].x);
		draw_tile( terrain_map[i].x, terrain_map[i].y, terrain_map[i].elevations );
	}
	// ctx.fill();
	ctx.stroke();

	var ball = {x: 25, y: 25};
	var ball_width = 10;

	$animate_canvas = $('#animation');
	animate_canvas = $animate_canvas.get(0);
	var ctx = animate_canvas.getContext('2d');

	window.requestAnimationFrame(animate);
	function animate(){
		ctx.clearRect(0,0, canvas_width, canvas_height);

		var ball_coords = square_to_iso(ball.x, ball.y);

		ctx.beginPath();
		ctx.arc(ball_coords[0], ball_coords[1], ball_width, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.closePath();

		if(ball.x < 475 && ball.y < 475){
			ball.x+=5;
		} else if(ball.y < 475) {
			ball.y+=5;
		} else if(ball.x > 25) {
			ball.x -=5;
		} else {
			ball.y -= 5;
		}

		// ball.y++;

		window.requestAnimationFrame(animate);
	}


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
		var pt_y = ((input_x + input_y) / 2) * 0.75;

		pt_x += (canvas_width/2);
		return( [pt_x, pt_y] );
	}

});