$(function() {
	var clicked = false;
	var currentWeb = 'neuoroShit';
	$("#start").click(function() {
		timeoutFunc();
	});

	$('#myCanvas').click(function(){
 		clicked = true;
 	});

	function timeoutFunc() {
		setTimeout(function() {
			start();
			if(flappy.Alive) {
				timeoutFunc();
			}
		}, $('#refreshRate').val());
	}

	visualiser.init(10, 25, 10, 10, 40);
	visualiser.base();

	var start = function() {
		var inputs = flappy.Export();
		$('#velocity').text(flappy.bird.velocity);
		visualiser.base();
		visualiser.run(inputs);
		$('#fitness').text(flappy.Fitness);
		currentWeb = $('#genome option:selected').val();
		if(currentWeb == 'manual'){
 			flappy.Next(clicked);
 			clicked = false;
 		}else{
			out = n.response(inputs);
			visualiser.neuronWeb(n.network);
			flappy.Next(out);
		}
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

	search.selectGenome = function(g){
		n = new Network(g);
	}

	search.resetGame = function(){
		flappy.Reset();
	};

  });
