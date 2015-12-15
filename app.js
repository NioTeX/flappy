$(function() {
	var shouldRun = false;
	var n;
	var clicked = false;
	$("#run").change(function() {
		if(this.checked) {
			shouldRun = true;
			timeoutFunc();
		}
	});

	$('body').click(function(){
		clicked = true;
	});


	function timeoutFunc() {
		setTimeout(function() {
			start();
			if(shouldRun && flappy.Alive) {
				timeoutFunc();
			}
		}, $('#refreshRate').val());
	}

	var start = function() {
		var inputs = flappy.Export();
		$('#velocity').text(flappy.bird.velocity);
		visualise(10,10,40,inputs);
		$('#fitness').text(flappy.Fitness);
		if(true){
			flappy.Next(clicked);
			clicked = false;
		}else{
			out = n.response(inputs);
			flappy.Next(out);
		}
	}

	$.getJSON("genomes/0starter.json", function(json) {
		genomes = crossfilter(json);
		paymentsByTotal = genomes.dimension(function(d) { return d.Fitness; });
		genome = paymentsByTotal.filter([1,22]).top(1)
		console.log(genome[0]);
		n = new Network(genome[0]);
		console.log(n);
		$('#run').prop('checked', true);
		$('#run').change();
	});
});
