

var cube_size = 64;
var terrain_max = 30;
var terrain_map = new Float32Array( Math.pow(cube_size+1,2) );
var terrain_tiles = new Array();
var tile_width = 50;
var tile_spacing = 0;
var perspective = 0;
var zoom_level = 1;

var cartesian_tile_width = ((tile_width+tile_spacing)* 2)
var cartesian_tile_height = (tile_width+tile_spacing);
var map_width = cartesian_tile_width * cube_size;
var map_height = cartesian_tile_height * cube_size;


function calc_terrain(x,y){
	return x + (cube_size+1) * y;
}

function get_terrain(x, y){
	return terrain_map[x + (cube_size+1) * y];
}

function set_terrain(x, y, val){
	terrain_map[x + (cube_size+1) * y] = val;
}

	// set_terrain(0, 0, terrain_max);
	// set_terrain(cube_size, 0, terrain_max);
	// set_terrain(cube_size, cube_size, terrain_max);
	// set_terrain(0, cube_size, terrain_max);
	// terrain_map[27] = 10;

// generate_heightmap();
generate_tilemap();

function generate_heightmap(){
	// console.log( PerlinNoise.noise(1/15, 1/15, 0.001) );
	for(var i in terrain_map){
		var tmp_x = Math.floor(i/(cube_size+1));
		var tmp_y = i % (cube_size+1);
		terrain_map[i] = (PerlinNoise.noise(tmp_x/10, tmp_y/10, 1) * 100) - 50;
		// console.log( PerlinNoise.noise(i/15, i/15, 0.001) * 10 );
		// terrain_map[i] = Math.random()*40;
	}
}

function generate_tilemap(){
	var ix = 0;
	var iy = 0;

	while (ix < cube_size){
		var iy = 0;
		while(iy < cube_size){
			if(ix==0 && iy == 1){
			}
			terrain_tiles.push({
				x: (ix*(tile_width+tile_spacing)),
				y: (iy*(tile_width+tile_spacing)),
				elevations:[
					get_terrain(ix, iy),
					get_terrain(ix+1, iy),
					get_terrain(ix+1, iy+1),
					get_terrain(ix, iy+1)
				]
			});

			iy++;
		}
		ix++;
	}
}

console.log(terrain_tiles);
console.log(terrain_map);

var canvas;

var canvasgame = {};

$(document).ready(function(){

	var doc_width = $(window).width();
	var doc_height = $(window).height();

	$('.canvas').each(function(){
		// $(this).attr('width', doc_width);
		// $(this).attr('height', doc_height);
		$(this).attr('width', map_width);
		$(this).attr('height', map_height);
	});

	$terrain_canvas = $('#terrain');
	terrain_canvas = $terrain_canvas.get(0);
	var terrain_ctx = terrain_canvas.getContext('2d');

	$ui_canvas = $('#ui');
	ui_canvas = $ui_canvas.get(0);
	var ui_ctx = ui_canvas.getContext('2d');

	terrain_ctx.fillStyle = '#76A363';
	ui_ctx.fillStyle = 'red';

	terrain_ctx.beginPath();

	for(var i in terrain_tiles){
		// Use draw voxel for cool voxels
		draw_tile(terrain_ctx, terrain_tiles[i].x, terrain_tiles[i].y, terrain_tiles[i].elevations );
	}

	terrain_ctx.fill();
	terrain_ctx.stroke();

	// var ball = {x: 25, y: 25};
	// var ball_width = 10;

	$("#ui").click(function(e){

		clear_ui(ui_ctx);
		var tile_clicked_coords = tile_clicked(e.pageX, e.pageY);
		draw_selection( ui_ctx, tile_clicked_coords[0], tile_clicked_coords[1] );

	});

	$(document).keyup(function(e){
		console.log(zoom_level);
		if(e.keyCode == 189){
			zoom_level -= 0.1;
			// $('.canvas').width( $('.canvas').width() * 0.9 );
			$('.canvas').width( map_width * zoom_level );
		} else if(e.keyCode == 187){
			if(zoom_level + 0.1 <= 1 ){
				zoom_level += 0.1;
				// $('.canvas').width( $('.canvas').width() * 1.1 );
				$('.canvas').width( map_width * zoom_level );
			}
		}
	});

	 
	// // go full-screen and lock mouse
	// var i = $("#terrain").get(0);
	// $("#terrain").click(function(){
	// 	// if (i.requestFullscreen) {
	// 	//     i.requestFullscreen();
	// 	// } else if (i.webkitRequestFullscreen) {
	// 	//     i.webkitRequestFullscreen();
	// 	// } else if (i.mozRequestFullScreen) {
	// 	//     i.mozRequestFullScreen();
	// 	// }

	// 	if(i.requestPointerLock){
	// 		i.requestPointerLock();
	// 	} else if(i.webkitRequestPointerLock){
	// 		i.webkitRequestPointerLock();
	// 	}
	// });

	// $animate_canvas = $('#animation');
	// animate_canvas = $animate_canvas.get(0);
	// var ctx = animate_canvas.getContext('2d');



	function draw_tile(ctx, x, y, elevations){
		moveToC(ctx, x, y, elevations[0] );
		lineToC(ctx, x+tile_width, y, elevations[1]);
		lineToC(ctx, x+tile_width, y+tile_width, elevations[2]);
		lineToC(ctx, x, y+tile_width, elevations[3]);
		ctx.closePath();
	}

	function draw_selection(ctx, x, y){
		// console.log(x);
		// console.log(y);
		x *= tile_width;
		y *= tile_width;
		ctx.beginPath();
		moveToC(ctx, x, y, 0);
		lineToC(ctx, x+tile_width, y, 0);
		lineToC(ctx, x+tile_width, y+tile_width, 0);
		lineToC(ctx, x, y+tile_width, 0);
		ctx.closePath();
		ctx.fill();
	}

	function draw_voxel(x, y, elevations){
		moveToC(ctx, x, y, elevations[0] );
		lineToC(ctx, x+tile_width, y, elevations[0]); // E
		lineToC(ctx, x+tile_width, y, elevations[1]);
		lineToC(ctx, x+tile_width, y, elevations[0]); // E
		lineToC(ctx, x+tile_width, y+tile_width, elevations[0]); // S
		lineToC(ctx, x+tile_width, y+tile_width, elevations[2]);
		lineToC(ctx, x+tile_width, y+tile_width, elevations[0]); // S
		lineToC(ctx, x, y+tile_width, elevations[0]); // W
		lineToC(ctx, x, y+tile_width, elevations[3]);
		lineToC(ctx, x, y+tile_width, elevations[0]); // W
		ctx.closePath();
	}

	function moveToC(ctx, input_x, input_y, extra_elevation){
		var points = cartesian_to_iso(input_x, input_y);

		if(extra_elevation != 0){
			points[1] -= extra_elevation;
		}

		ctx.moveTo(points[0], points[1]);
	}

	function lineToC(ctx, input_x, input_y, extra_elevation){
		var points = cartesian_to_iso(input_x, input_y);

		if(extra_elevation != 0){
			points[1] -= extra_elevation;
		}

		ctx.lineTo(points[0], points[1]);
	}

	function cartesian_to_iso(input_x, input_y){
		var pt_x = (input_x - input_y);
		var pt_y = ((input_x + input_y) / 2) * (1 - perspective);

		pt_x += (map_width/2); // Center horizontally
		return( [pt_x, pt_y] );
	}

	function iso_to_cartesian(input_x, input_y){
		var inverse_zoom = (1 - zoom_level) + 1;
		// console.log(inverse_zoom);
		input_x -= ((map_width*zoom_level) /2);
		input_x *= inverse_zoom;
		input_y *= inverse_zoom;
		var cart_x = (2 * input_y + input_x) / 2;
		var cart_y = (2 * input_y - input_x) / 2;
		return( [cart_x, cart_y] );
	}

	function tile_clicked(input_x, input_y){
		var cart_points = iso_to_cartesian(input_x, input_y);
		var cart_x = Math.floor(cart_points[0]/tile_width);
		var cart_y = Math.floor(cart_points[1]/tile_width);
		return [cart_x, cart_y];
	}

	function clear_ui(ctx){
		ctx.clearRect(0,0,map_width, map_height);
	}

});