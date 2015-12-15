$(function() {
	var n;
	var genomes;
	$("#start").click(function() {
		timeoutFunc();
	});


	function timeoutFunc() {
		setTimeout(function() {
			start();
			if(flappy.Alive) {
				timeoutFunc();
			}
		}, $('#refreshRate').val());
	}

	var start = function() {
		var inputs = flappy.Export();
		$('#velocity').text(flappy.bird.velocity);
		visualise(10,10,40,inputs);
		$('#fitness').text(flappy.Fitness);
		out = n.response(inputs);
		flappy.Next(out);
	}

	$.getJSON("genomes/0starter.json", function(json) {
		genomes = crossfilter(json);
		paymentsByTotal = genomes.dimension(function(d) { return d.Fitness; });

		$('#search').click(function() {
			var minFitness = $('#minFitness').val();
			var maxFitness = $('#maxFitness').val();
			genomes = paymentsByTotal.filter([minFitness,maxFitness]).bottom(1)
			console.log(genomes);
			n = new Network(genomes[0]);
		});
	});



});

angular.module('flappy', [])
  .controller('SearchController', function() {
    var search = this;
	search.result = [];
	search.minFitness = 0;
	search.maxFitness = 3;

	search.search = function() {
		search.result = paymentsByTotal.filter([search.minFitness,search.maxFitness]).top(5);
	};
  });
