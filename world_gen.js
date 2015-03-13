var doc_width = $(window).width();
var doc_height = $(window).height();
var init_center = [1042, 1042];
var tile_width = 2;
var ocean_level = 0.57;
// var world_size = 1000;

$(document).ready(function(){

	$('.canvas').each(function(){
		$(this).attr('width', doc_width);
		$(this).attr('height', doc_height);
	});

	var world_canvas = $('#world').get(0);
	var world_ctx = world_canvas.getContext('2d');

	this.url_seed = location.search.split('seed=')[1];
	this.url_size = location.search.split('size=')[1];
	this.url_scale = location.search.split('scale=')[1];
	var world_seed = (this.url_seed == 'random') ? Math.random() : 0.4710536374424983;
	var cube_size = (this.url_size) ? parseInt(this.url_size,10) : 200;
	var scale = (this.url_scale) ? parseFloat(this.url_scale,10) : 1;
	// console.log(cube_size);

	var world_gen = new WorldGen(world_seed, scale);
	var heightmap = world_gen.get_heightmap(cube_size, 115.550399020945/scale, 100/scale);
	draw_world(heightmap, cube_size, world_ctx);

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
	// 	scale /= 2;
	// 	console.log( scale );
	// 	world_gen.scale = scale;
	// 	heightmap = world_gen.get_heightmap(cube_size, 115.550399020945/scale, 100/scale);
	// 	draw_world(heightmap, cube_size, world_ctx);
	// // 	world_ctx.fillText('Generated, '+i,10,50);
	// 	i+=1;
	// }, 1000);

});

function draw_world(heightmap, cube_size, ctx){

	for (var i in heightmap){
		var height = heightmap[i].height;
		var tmp_x = Math.floor(i/(cube_size));
		var tmp_y = i % (cube_size);

		if(height > 0.8){
			ctx.fillStyle = luminance('#7A8781', height - 0.8);
		} else if(height > 0.7){
			ctx.fillStyle = luminance('#59842A', height - 0.7);
		} else if(height > 0.6){
			ctx.fillStyle = luminance('#4C7124', height - 0.6);
		} else if(height > ocean_level){
			ctx.fillStyle = luminance('#326800', height - ocean_level);
		} else {
			ctx.fillStyle = luminance('#254e78', height);
		}

		if(heightmap[i].river){
			ctx.fillStyle = luminance('#254e78', height);
		}

		if(heightmap[i].marker){
			ctx.fillStyle = 'red';
		}

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