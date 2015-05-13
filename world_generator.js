function WorldGen(world_seed, scale){
	this.scale = scale;
	this.world_seed = world_seed;
	this.ocean_level = 0.57;


	this.random=function(){
		return world_seed;
	}

	// good for 2d
	// this.fast_simplex = new FastSimplexNoise({octaves: 12, frequency: 0.0002, random: this.random});
	// Persistence seems important to complexity, and effects blob sizes
	this.fast_simplex = new FastSimplexNoise({octaves: 12, frequency: 0.315, persistence: 0.5, random: this.random});
	// var tmp_scale = 0.1;
	// this.fast_simplex.frequency *= tmp_scale;
	// this.fast_simplex.persistence /= tmp_scale
	// this.fast_simplex = new FastSimplexNoise();

	this.get_heightmap = function(cube_size, start_x, start_y){
		heightmap = new Array();

		this.fast_simplex.octaves = 12;
		this.fast_simplex.frequency = 0.315;

		// Working 2d sphere
		// this.scale = 1;
		// for(x = start_x; x < (cube_size+start_x); x++){
		// 	for(y = start_y; y < (cube_size+start_y); y++){
		// 		heightmap.push({ height: (this.fast_simplex.getSpherical2DNoise(cube_size,x*this.scale,y*this.scale) + 1)/2 });
		// 		// heightmap.push({ height: this.fast_simplex.get2DNoise(x*1,y*1) });
		// 	}
		// }

		for(x = start_x; x < (cube_size) + start_x; x++){
			for(y = start_y; y < (cube_size) + start_y; y++){
				nx = Math.cos( ((x/cube_size)*this.scale) * 2 * Math.PI);
				ny = Math.cos( ((y/cube_size)*this.scale) * 2 * Math.PI);
				nz = Math.sin( ((x/cube_size)*this.scale) * 2 * Math.PI);
				nw = Math.sin( ((y/cube_size)*this.scale) * 2 * Math.PI);

				// heightmap.push( {height: (this.fast_simplex.get4DNoise(nx,ny,nz,nw) + 1)/2});
				heightmap.push( {height: this.fast_simplex.get4DNoise(nx,ny,nz,nw) + 0.55} );
			}
		}

		// Test using set world size
		// this.fast_simplex.frequency = 0.0002;
		// var world_size = 10000;
		// var world_scale = world_size / cube_size;

		// for(x = start_x; x < (cube_size) + start_x; x++){
		// 	for(y = start_y; y < (cube_size) + start_y; y++){
		// 		heightmap.push( {height: (this.fast_simplex.get2DNoise(x*world_scale,y*world_scale) + 1)/2});
		// 	}
		// }

		// heightmap = this.add_ocean(heightmap);
		// heightmap = this.add_rivers(heightmap);

		return heightmap;
	}

	this.get_climate_map = function(cube_size, start_x, start_y){
		climate_map = new Array();
		this.fast_simplex.octaves = 4;
		this.fast_simplex.frequency = 1.3;

		for(x = start_x; x < (cube_size) + start_x; x++){
			for(y = start_y; y < (cube_size) + start_y; y++){
				nx = Math.cos( ((x/cube_size)*this.scale) * 2 * Math.PI);
				ny = Math.cos( ((y/cube_size)*this.scale) * 2 * Math.PI);
				nz = Math.sin( ((x/cube_size)*this.scale) * 2 * Math.PI);
				nw = Math.sin( ((y/cube_size)*this.scale) * 2 * Math.PI);

				// climate_map.push( {height: (this.fast_simplex.get4DNoise(nx,ny,nz,nw) + 1)/2});
				climate_map.push( {temp: this.fast_simplex.get4DNoise(nx,ny,nz,nw) + 0.5} );
			}
		}

		return climate_map;
	}

	this.add_ocean = function(heightmap){

		// for(var i in heightmap){
		// 	if(heightmap[i].height < this.ocean_level){
		// 		heightmap[i].ocean = true;
		// 	}
		// }

		return heightmap;
	}

	this.add_rivers = function(heightmap){

		for(var i in heightmap){
			if(heightmap[i].height > 0.7){
				var middle_digits = Math.round(heightmap[i].height * 1000000000 % 1000); // 3 digit number after the 7th digit
				if( middle_digits == 420 || middle_digits == 100 || middle_digits == 200){
					heightmap[i].river = true;
					this.river_path(i, 0, heightmap);
				}
			}
		}

		return heightmap;
	}

	this.river_path = function(i, itterations, heightmap){
		if(itterations > 200){
			return;
		}

		var this_height = heightmap[i].height;
		var num_i = parseInt(i,10);
		var tmp_x = Math.floor(num_i/(cube_size));
		var tmp_y = num_i % (cube_size);
		var path_found = false;
		var local_heights = {};

		var directions = {
			east_cell: ((tmp_x+1) * cube_size) + tmp_y,
			west_cell: ((tmp_x-1) * cube_size) + tmp_y,
			north_cell: (num_i+1),
			south_cell: (num_i-1)
		}

		for(var d in directions){
			if( typeof(heightmap[directions[d]]) == 'undefined' || // Edge of map
				heightmap[directions[d]].river == true // Done allow rivers to pool back on selves
			){
				continue;
			}

			local_heights[directions[d]] = heightmap[ directions[d] ].height;


			if( heightmap[ directions[d] ].height < this_height ){
				if( heightmap[directions[d]].height <= this.ocean_level){ // Reached the ocean, go ahead and stop
					return;
				}

				heightmap[ directions[d] ].river = true;
				this.river_path( directions[d], itterations+1, heightmap);
				path_found = true;
				return;
			}
		}

		var least_resistance = 5;
		var least_resistance_dir;
		for(var l in local_heights){
			if(heightmap[l].river == true){ // When pooling, don't pool into already pooled
				continue;
			}
			if(local_heights[l] < least_resistance){
				least_resistance = local_heights[l];
				least_resistance_dir = parseInt(l,10);
			}
		}

		if( typeof(least_resistance_dir) != 'undefined' ){
			heightmap[least_resistance_dir].river = true;
			this.river_path(least_resistance_dir, itterations+1, heightmap);
		} else {
			// Totally stuck
			return;
		}
	}
}