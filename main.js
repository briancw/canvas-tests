function Terrain(terrain_canvas_id){

	this.terrain_canvas = document.getElementById(terrain_canvas_id);
	this.terrain_ctx = this.terrain_canvas.getContext('2d');

	this.tile_width = 50;
	this.terrain_tiles = new Array();
	this.window_width = $(window).width();
	this.window_height = $(window).height();
	this.map_offset = [0,0];
	this.map_center = [0,0]

	// this.get_tilemap = function(center_coords, heightmap){
	// 	this.terrain_tiles = new Array();

	// 	var start_x = -(Math.ceil( this.window_width / this.tile_width ) * this.tile_width) + this.map_offset[0];
	// 	var start_y = -(Math.ceil( this.window_height / this.tile_width) * this.tile_width) + this.map_offset[1];
	// 	var end_x = (this.window_width);
	// 	var end_y = (this.window_height);

	// 	for(ix = start_x; ix < end_x; ix += this.tile_width){
	// 		for(iy = start_y; iy < end_y; iy += this.tile_width){

	// 			// Toss out tiles outside the window
	// 			if( ((ix + iy) / 2) < -((this.window_height/2)+this.tile_width) ||
	// 				((ix + iy) / 2) > ((this.window_height/2)+this.tile_width)  ||
	// 				(ix - iy) < -((this.window_width/2)+this.tile_width) ||
	// 				(ix - iy) > ((this.window_width/2)+this.tile_width)
	// 			){
	// 				continue;
	// 			}

	// 			this.terrain_tiles.push({
	// 				x: ix,
	// 				y: iy
	// 			});
	// 		}
	// 	}

	// 	return this.terrain_tiles;
	// }

	this.draw_tilemap = function(){
		var heightmap = world_gen.get_heightmap(36, this.map_center[0], this.map_center[1]);

		var start_x = (-this.tile_width*18);
		var start_y = (-this.tile_width*18);
		var cube_size = 36;

		for(var ix = start_x; ix < this.tile_width*18; ix+=this.tile_width){
			for(var iy = start_y; iy < this.tile_width*18; iy+=this.tile_width){

				// Toss out tiles outside the window
				if( ((ix + iy) / 2) < -((this.window_height/2)+(this.tile_width*2)) ||
					((ix + iy) / 2) > ((this.window_height/2)+(this.tile_width*2))  ||
					(ix - iy) < -((this.window_width/2)+(this.tile_width*2)) ||
					(ix - iy) > ((this.window_width/2)+(this.tile_width*2))
				){
					continue;
				}

				var tmp_x = ((ix+(this.tile_width*18)) / this.tile_width);
				var tmp_y = ((iy+(this.tile_width*18)) / this.tile_width);
				var tmp_i = (tmp_x*cube_size)+tmp_y;
				var height = heightmap[tmp_i].height;

				if(height > 0.8){
					this.terrain_ctx.fillStyle = luminance('#7A8781', height - 0.8);
				} else if(height > 0.7){
					this.terrain_ctx.fillStyle = luminance('#59842A', height - 0.7);
				} else if(height > 0.6){
					this.terrain_ctx.fillStyle = luminance('#4C7124', height - 0.6);
				} else if(height > 0.57){
					this.terrain_ctx.fillStyle = luminance('#326800', height - 0.57);
				} else {
					this.terrain_ctx.fillStyle = luminance('#254e78', height);
				}

				this.terrain_ctx.beginPath();
				this.draw_tile(ix+this.map_offset[0] ,iy+this.map_offset[1] );
				this.terrain_ctx.fill();
				// this.terrain_ctx.stroke();
			}
		}
	}

	this.pan_map = function(x_increase, y_increase){
		this.map_offset[0] += x_increase;
		this.map_offset[1] += y_increase;

		if(this.map_offset[0] > this.tile_width){
			this.map_offset[0] = 0;
			this.map_center[1]--;
		}
		if(this.map_offset[0] < -this.tile_width){
			this.map_offset[0] = 0;
			this.map_center[1]++;
		}
		if(this.map_offset[1] > this.tile_width){
			this.map_offset[1] = 0;
			this.map_center[0]--;
		}
		if(this.map_offset[1] < -this.tile_width){
			this.map_offset[1] = 0;
			this.map_center[0]++;
		}

		this.clear_map();
		this.draw_tilemap([0,0]);
	}

	this.clear_map = function(){
		this.terrain_ctx.clearRect(0,0,doc_width, doc_height);
	}

	this.draw_tile = function(x, y){
		this.move_to(x, y);
		this.line_to(x+this.tile_width, y);
		this.line_to(x+this.tile_width, y+this.tile_width);
		this.line_to(x, y+this.tile_width);
		this.terrain_ctx.closePath();
	}

	this.cartesian_to_iso = function(input_x, input_y){
		var pt_x = (input_x - input_y);
		var pt_y = ((input_x + input_y) / 2);

		pt_x += (this.window_width/2);
		pt_y += (this.window_height/2);
		return( [pt_x, pt_y] );
	}

	this.iso_to_cartesian = function(input_x, input_y){
		input_x -= this.window_width/2;
		input_y -= this.window_height/2;
		var cart_x = (2 * input_y + input_x) / 2;
		var cart_y = (2 * input_y - input_x) / 2;
		return( [cart_x, cart_y] );
	}

	this.move_to = function(input_x, input_y){
		var points = this.cartesian_to_iso(input_x, input_y);
		this.terrain_ctx.moveTo(points[0], points[1]);
	}

	this.line_to = function(input_x, input_y){
		var points = this.cartesian_to_iso(input_x, input_y);
		this.terrain_ctx.lineTo(points[0], points[1]);
	}

	this.get_tile_coords = function(canvas_x, canvas_y){
		var coords = this.iso_to_cartesian(canvas_x, canvas_y);
		coords[0] = Math.floor( (coords[0]-this.map_offset[0]) / this.tile_width );
		coords[1] = Math.floor( (coords[1]-this.map_offset[1]) / this.tile_width );
		return [ coords[0], coords[1] ];
	}

	this.get_tile_corners = function(canvas_x, canvas_y){
		var bounding_box = new Array();
		var coords = this.iso_to_cartesian(canvas_x, canvas_y);

		coords[0] -= this.map_offset[0];
		coords[1] -= this.map_offset[1];
		coords[0] = Math.floor( coords[0] / this.tile_width ) * this.tile_width;
		coords[1] = Math.floor( coords[1] / this.tile_width ) * this.tile_width;
		coords[0] += this.map_offset[0];
		coords[1] += this.map_offset[1];


		bounding_box[0] = this.cartesian_to_iso( coords[0], coords[1] );
		bounding_box[1] = this.cartesian_to_iso( coords[0]+this.tile_width, coords[1] );
		bounding_box[2] = this.cartesian_to_iso( coords[0]+this.tile_width, coords[1]+this.tile_width );
		bounding_box[3] = this.cartesian_to_iso( coords[0], coords[1]+this.tile_width );


		return bounding_box;
	}

}

function UI(ui_canvas_id){
	this.ui_id = ui_canvas_id;
	this.ui_canvas = document.getElementById(ui_canvas_id);
	this.ui_ctx = this.ui_canvas.getContext('2d');
	this.show_highlight = false;
	this.last_page_x;
	this.last_page_y;

	this.clear_ui = function(){
		this.ui_ctx.clearRect(0,0,doc_width,doc_height);
	}

	this.click_listener = function(){
		$('#'+this.ui_id).mousedown(function(e){
			console.log( terrain.get_tile_coords(e.pageX, e.pageY) );
		});
	}

	this.scroll_listener = function(){

		$('#'+this.ui_id).mousedown(function(e){
			last_page_x = e.pageX;
			last_page_y = e.pageY;
		});

		$('#'+this.ui_id).mousemove(function(e){

			// Fix for firefox
			if( typeof(e.buttons) != 'undefined') {
				var button_pressed = e.buttons;
			} else {
				var button_pressed = e.which;
			}

			if(button_pressed == 1){
				if(last_page_x > e.pageX){
					var pan_amount = (last_page_x - e.pageX) / 2;
					terrain.pan_map(-pan_amount,pan_amount);
				} else if(last_page_x < e.pageX){
					var pan_amount = (e.pageX - last_page_x) / 2;
					terrain.pan_map(pan_amount,-pan_amount);
				}

				if(last_page_y > e.pageY){
					var pan_amount = (last_page_y - e.pageY);
					terrain.pan_map(-pan_amount,-pan_amount);
				} else if(last_page_y < e.pageY){
					var pan_amount = (e.pageY - last_page_y);
					terrain.pan_map(pan_amount,pan_amount);
				}

				last_page_x = e.pageX;
				last_page_y = e.pageY;
			}
		});
	}

	this.hightlight_tile = function(){
		var self = this;

		self.ui_ctx.strokeStyle = 'green';
		self.ui_ctx.fillStyle = 'rgba(0,100,0,0.5)';
		self.ui_ctx.lineWidth = 3;

		$('#'+this.ui_id).mousemove(function(e){
			if(self.show_highlight){
				var bounding_box = terrain.get_tile_corners(e.pageX, e.pageY);

				self.clear_ui();
				self.ui_ctx.beginPath();
				self.ui_ctx.moveTo( bounding_box[0][0], bounding_box[0][1] );
				self.ui_ctx.lineTo( bounding_box[1][0], bounding_box[1][1] );
				self.ui_ctx.lineTo( bounding_box[2][0], bounding_box[2][1] );
				self.ui_ctx.lineTo( bounding_box[3][0], bounding_box[3][1] );
				self.ui_ctx.closePath();
				self.ui_ctx.stroke();
				self.ui_ctx.fill();
			}
		});
	}

}

var doc_width = $(window).width();
var doc_height = $(window).height();
var init_center = [1042, 1042];
var world_scale = 0.0055;
var terrain = new Terrain('terrain');
var ui = new UI('ui');
var world_gen = new WorldGen(0.329560888687749, world_scale);
var cube_size = 300;

$(document).ready(function(){

	$('.canvas').each(function(){
		$(this).attr('width', doc_width);
		$(this).attr('height', doc_height);
	});

	var terrain_canvas = $('#terrain').get(0);
	var terrain_ctx = terrain_canvas.getContext('2d');

	terrain.draw_tilemap();

	// terrain_ctx.beginPath();
	// terrain.draw_tile( 0,0 );
	// terrain_ctx.fill();

	$(document).keydown(function(e){
		var pan_amount = 15;
		if(e.keyCode == 87){
			terrain.pan_map(pan_amount,pan_amount);
		} else if(e.keyCode == 83){
			terrain.pan_map(-pan_amount,-pan_amount);
		} else if(e.keyCode == 68){
			terrain.pan_map(-pan_amount,pan_amount);
		} else if(e.keyCode == 65){
			terrain.pan_map(pan_amount,-pan_amount);
		}
	})

	ui.scroll_listener();
	ui.hightlight_tile();
	ui.click_listener();

	$('.building_button').click(function(){
		// ui.hightlight_tile()
		ui.show_highlight = true;
	});

	// setInterval(function(){
	// 	terrain.pan_map(-3,-3);
	// }, 1000/30);

});

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