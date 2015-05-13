var m = new MersenneTwister(42);
// var randomNumber = m.random();

var n = 15;
for(i = 0; i < n; i++){

	var pseudo_random = Math.ceil(m.random() * n);
	$('body').append( pseudo_random + '<br>' );

}