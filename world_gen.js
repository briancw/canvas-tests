var doc_width = $(window).width();
var doc_height = $(window).height();
var tile_width = 2;
// var world_size = 1000;

$(document).ready(function(){

	// var start = new Date();

	$('.canvas').each(function(){
		$(this).attr('width', doc_width);
		$(this).attr('height', doc_height);
	});

	var world_canvas = $('#world').get(0);
	var world_ctx = world_canvas.getContext('2d');

	var space_canvas = $('#space').get(0);
	var space_ctx = space_canvas.getContext('2d');

	this.url_seed = location.search.split('seed=')[1];
	this.url_size = location.search.split('size=')[1];
	this.url_scale = location.search.split('scale=')[1];
	var world_seed = (this.url_seed == 'random') ? Math.random() : 0.4710536374424983;
	var cube_size = (this.url_size) ? parseInt(this.url_size,10) : 200;
	var scale = (this.url_scale) ? parseFloat(this.url_scale,10) : 1;
	// console.log(cube_size);

	// space_ctx.fillStyle = '#000';
	// space_ctx.fillRect(0,0,doc_width,doc_height);

	var world_gen = new WorldGen(world_seed, scale);
	var tmp_map_center = [0,10];
	// map_center = [0,0];
	var map_center = [ ((tmp_map_center[0]/scale) + ((1-scale)*cube_size)/2/scale), ((tmp_map_center[1]/scale) + ((1-scale)*cube_size)/2/scale) ];

	var heightmap = world_gen.get_heightmap(cube_size, map_center[0], map_center[1]);
	var climate_map = world_gen.get_climate_map(cube_size, map_center[0], map_center[1]);

	draw_world(heightmap, climate_map, cube_size, world_ctx);

	// var time = new Date() - start;
	// console.log(time);

	world_ctx.fillStyle = 'red';
	world_ctx.fillRect(cube_size/2*tile_width,cube_size/2*tile_width,2,2);

	// function convertCanvasToImage(canvas) {
	// 	var image = new Image();
	// 	image.src = canvas.toDataURL("image/png");
	// 	return image;
	// }

	// $('body').append( convertCanvasToImage(world_canvas) );

	// The closest zoom I could manage : 0.00000000000002
	// (24,901 * 1609344) * 0.00000000000002
	// Visible land at that zoom 115.550399020945
	// Max possible map resolution: 2.5e^27
	// Assuming map is earth sized, 0.00000005 = 6ft per pixel

	// world_ctx.font="20px Georgia";
	// scale = 1;
	// var i = 0;
	// setInterval(function(){
	// // 	// world_ctx.clearRect(0,0,doc_width,doc_height);
	// 	// scale /= 2;
	// 	// console.log( scale );
	// 	// world_gen.scale = scale;
	// 	map_center[0] ++;
	// 	heightmap = world_gen.get_heightmap(cube_size, map_center[0], map_center[1]);
	// 	draw_world(heightmap, climate_map, cube_size, world_ctx);
	// // 	world_ctx.fillText('Generated, '+i,10,50);
	// 	i+=1;
	// }, 1000);

});

function draw_world(heightmap, climate_map, cube_size, ctx){
	for (var i in heightmap){
		var tmp_x = Math.floor(i/(cube_size));
		var tmp_y = i % (cube_size);

		var height = heightmap[i].height;
		var temp = climate_map[i].temp;

		// var temp = (1 - Math.abs( ((tmp_y / cube_size) - 0.5 ) * 2 ));


		var ocean_level = 0.56;

		if(height > 0.8){
			ctx.fillStyle = luminance('#7A8781', height - 0.8);
		} else if(height > 0.7){
			ctx.fillStyle = luminance('#59842A', height - 0.7);
		} else if(height > 0.6){
			ctx.fillStyle = luminance('#4C7124', height - 0.65);
		} else if(height > 0.56){
			ctx.fillStyle = luminance('#326800', height - 0.56);
			// ctx.fillStyle = luminance('#3D610A', height - 0.6);
		// } else if(height > 0.582){ // upper beach
			// ctx.fillStyle = luminance('#B58233', height - 0.582);
		// } else if(height > 0.56){ // beach
			// ctx.fillStyle = luminance('#DDCB75', height - 0.56);
		} else { // ocean
			ctx.fillStyle = luminance('#254e78', height);
		}

		// if(temp > 0.6 && height > ocean_level && height < 0.8){
		// 	ctx.fillStyle = luminance('#B6813F', temp - 0.7 );
		// }

		// if(heightmap[i].river){
		// 	ctx.fillStyle = luminance('#254e78', height);
		// }

		// if(heightmap[i].marker){
		// 	ctx.fillStyle = 'red';
		// }

		ctx.fillRect(tmp_x*tile_width, tmp_y*tile_width, tile_width, tile_width );
	}
}

function luminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}