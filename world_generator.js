function WorldGen(world_seed, scale){
	this.scale = scale;
	this.world_seed = world_seed;
	this.ocean_level = 0.57;
	this.z = 1;

	// noise_gen.seed(this.world_seed);
	// this.simplex = new SimplexNoise();
	// this.fast_simplex = new FastSimplexNoise({ frequency: 1, octaves: 8, frequency: 0.3, random:function(){return Math.random();} }); // This generator has some built in FBM stuff
	// PerlinSimplex.noiseDetail(3,0.5);
	// this.fast_simplex = new FastSimplexNoise({random:function(){return world_seed;} });
	this.random=function(){
		return world_seed;
	}

	this.fast_simplex = new FastSimplexNoise({octaves: 12, frequency: 0.3, random: this.random});
	// this.fast_simplex = new FastSimplexNoise();

	this.get_heightmap = function(cube_size, start_x, start_y){

		heightmap = new Array();

		// Working 2d sphere
		// this.scale = 1;
		// for(x = start_x; x < (cube_size+start_x); x++){
		// 	for(y = start_y; y < (cube_size+start_y); y++){
		// 		heightmap.push({ height: (this.fast_simplex.getSpherical2DNoise(cube_size,x*this.scale,y*this.scale) + 1)/2 });
		// 		// heightmap.push({ height: this.fast_simplex.get2DNoise(x*1,y*1) });
		// 	}
		// }

		for(i = start_x; i < cube_size + start_x; i++){

			for(j = start_y; j < cube_size + start_y; j++){

				nx = Math.cos(( (i*this.scale) /cube_size) * 2 * Math.PI);
				ny = Math.cos(( (j*this.scale) /cube_size) * 2 * Math.PI);
				nz = Math.sin(( (i*this.scale) /cube_size) * 2 * Math.PI);
				nw = Math.sin(( (j*this.scale) /cube_size) * 2 * Math.PI);

				heightmap.push( {height: (this.fast_simplex.get4DNoise(nx,ny,nz,nw) + 1)/2});
			}
		}


		// Working 4d sample
		// for (i = 0; i < cube_size; i++){
		// 	y = 2*Math.PI*(i+start_y)/cube_size;

		// 	for (j = 0; j < cube_size; j++){
		// 		x = 2*Math.PI*(j+start_x)/cube_size;

		// 		octaves = 8;
		// 		scale = this.scale;
		// 		amplitude = 1.0;
		// 		v = 0.0;

		// 		for (oct = 0; oct < octaves; oct++){

		// 			noise = (this.fast_simplex.get4DNoise(Math.sin(x)*scale, Math.cos(x)*scale, Math.sin(y)*scale, Math.cos(y)*scale) + 0.5) / 2;

		// 			// Various other tested and somewhat succesful simplex methods
		// 			// noise = (this.simplex.noise4D(Math.sin(x)*scale, Math.cos(x)*scale, Math.sin(y)*scale, Math.cos(y)*scale) + 0.5) / 2;
		// 			// noise = PerlinSimplex.noise(Math.sin(x)*scale, Math.cos(x)*scale, Math.sin(y)*scale, Math.cos(y)*scale);

		// 			v += noise * amplitude;
		// 			scale *= 2.0;
		// 			amplitude *= 0.5;
		// 		}

		// 		heightmap.push({height: v});

		// 	}
		// }


		// heightmap = this.add_ocean(heightmap);
		// heightmap = this.add_rivers(heightmap);

		return heightmap;
	}

	// Now replaced by function above for now
	// this.fbm_noise = function(x, y, iterations, persistence, scale){
	// 	var max_amp = 0;
	// 	var amp = 1;
	// 	var freq = scale;
	// 	var noise = 0;

	// 	// add successively smaller, higher-frequency terms
	// 	for(i = 0; i < iterations; ++i){
	// 		// noise += noise_gen.simplex3(x * freq, y * freq, this.z * freq) * amp;
	// 		noise += this.simplex.noise4D(Math.sin(y)*freq, Math.cos(y)*freq, Math.sin(x)*freq, Math.cos(x)*freq);
	// 		max_amp += amp;
	// 		amp *= persistence;
	// 		freq *= 2;
	// 	}

	// 	// take the average value of the iterations
	// 	noise /= max_amp;
	// 	noise = (noise+1)/2;
	// 	return noise;
	// }

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