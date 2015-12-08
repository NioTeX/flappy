var exp1 = function(x) {
    x = 1.0 + x/256.0;
	x *= x;
	x *= x;
	x *= x;
	x *= x;
	x *= x;
	x *= x;
	x *= x;
	x *= x;
	return x;
};

var SigmoidActivation = function(x) { return 1.0 / (1.0 + exp1(-x)) };

var SteependSigmoidActivation = function(x) { return 1.0 / (1.0 + exp1(-4.9*x)) };
