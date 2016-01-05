visualiser = {
	config: {
		ctx: null,
		sizeX: null,
		sizeY: null,
		flappySizeX: null,
		flappySizeY: null,
		flappyScale: null
	},
	init: function(sizeX, sizeY, flappySizeX, flappySizeY, flappyScale) {
		var c = document.getElementById("myCanvas");
		this.config.ctx=c.getContext("2d");
		this.config.sizeX = sizeX;
		this.config.sizeY = sizeY;
		this.config.flappySizeX = flappySizeX;
		this.config.flappySizeY = flappySizeY;
		this.config.flappyScale = flappyScale;
	},
	base: function() {
		this.config.ctx.fillStyle = "white";
		this.config.ctx.fillRect(
			0,
			0,
			this.config.sizeY * this.config.flappyScale,
			this.config.sizeX * this.config.flappyScale
		);
		this.config.ctx.strokeStyle = "black";
		this.config.ctx.rect(
			0,
			0,
			this.config.flappySizeY * this.config.flappyScale,
			this.config.flappySizeX * this.config.flappyScale
		);
		this.config.ctx.stroke();
	},
	neuronWeb: function(network) {
		this.config.ctx.strokeStyle = "black";
		this.config.ctx.fillStyle   = "black";
		for(var i = 0; i < network.Nodes.length; i++) {
			var node = network.Nodes[i];
			if(node.NeuronType == 3) {
				var textX = node.X * this.config.flappyScale * this.config.flappySizeX;
				var textY = (node.Y * this.config.flappySizeY + this.config.flappySizeY) * this.config.flappyScale;
				this.config.ctx.fillText(
					node.activationResult,
					textY,
					textX
				);
			}
		}
	},
	run: function(input) {
		for(var x = 0; x < this.config.flappySizeX; x++) {
			for(var y = 0; y < this.config.flappySizeY; y++) {
				var pos = x * this.config.flappySizeX + y
				var rectX = x * this.config.flappyScale;
				var rectY = y * this.config.flappyScale;
				if(input[pos] === 0) {
					this.config.ctx.fillStyle = "white";
				}
				else if(input[pos] === -1) {
					this.config.ctx.fillStyle = "red";
				}
				else if(input[pos] === 1) {
					this.config.ctx.fillStyle = "green";
				}

				this.config.ctx.fillRect(
					rectY,
					rectX,
					this.config.flappyScale,
					this.config.flappyScale
				);
			}
		}

		this.config.ctx.stroke();
	}
}
