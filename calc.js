function exp1 (x) {
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

var Network = function(json){
  if(typeof json === "string"){
	this.network = JSON.parse(json);
  }else{
	this.network = json;
  }

  for(var i in this.network.Nodes){
	this.network.Nodes[i]["id"] = parseInt(i)+1+"";
  }
}

Network.prototype.activationFunctions = {
  1: function(x){ // DirectActivation
	return x;
  },
  2: function(x){ // SteependSigmoidActivation
	return 1.0 / (1.0 + exp1(-4.9*x))
  },
  3: function(x){ // SigmoidActivation
	return 1.0 / (1.0 + exp1(-x))
  },
  4: function(x){ // TanhActivation
	return Math.tanh(0.9 * x);
  },
  5: function(x){ // InverseAbsActivation
	return x / (1.0 + Math.abs(x));
  },
};

Network.prototype.getNeuronWithInnovationId = function(innID){
  for(var i in this.network.Nodes){
	if(this.network.Nodes[i].Innovation == innID){
	  return this.network.Nodes[i];
	}
  }
}

Network.prototype.getActivation = function(node){
  // console.log(node.Innovation,"in");
  if(node.NeuronType == 1){
	return 1; // bias' value
  }
	if(node.NeuronType == 2){
	  var index = parseInt(node.Innovation)-2; index += "";
	  // console.log(node.Innovation, "out", "bias/input");
	  return this.inputs[index];
	}else{
	  node.activationValues = [];
	  // node.activationValues.length = 0;
	  for(var i in this.network.Conns){
		var connection = this.network.Conns[i];
		if(connection.Target == node.Innovation && !connection.used && connection.Enabled == true){
		  // connection.used = true;
		  var sourceId = "" + (parseInt(connection.Source)-1);
		  node.activationValues.push(connection.Weight * this.getActivation(this.getNeuronWithInnovationId(connection.Source)));
		}
	  }

	  // TODO: get sum with underscorejs
	  var sum = 0;
	  for(var j in node.activationValues){
		sum += node.activationValues[j];
	  }
	  // console.log(node.Innovation, "out");
	  return this.activationFunctions[node.ActivationType](sum);
	}


}

Network.prototype.getOutputNode = function(){
  // TODO: Implement this with underscore.js
  for(var i in this.network.Nodes){
	var node = this.network.Nodes[i];
	if(node.NeuronType == 4){
	  return node;
	}
  }
}

Network.prototype.response = function(inputArray){
  this.inputs = inputArray;
  var outNode = this.getOutputNode();

  return this.getActivation(outNode);

}
