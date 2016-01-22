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
		this.config.ctx.beginPath();
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
		for(var i = 0; i < network.Nodes.length; i++) {
			var node = network.Nodes[i];
			var boxX = this.getNodeX(node);
			var boxY = this.getNodeY(node);
			var scale = this.config.flappyScale;

			if(node.NeuronType == 3) {
				boxX += this.config.flappyScale/4;
				boxY += this.config.flappyScale/4;
				scale /= 2;
			}
			if(node.NeuronType == 3 || node.NeuronType == 4) {

				this.config.ctx.fillStyle = "black";
				if(node.NeuronType != 4) {
					this.config.ctx.globalAlpha = node.activationResult;
				}
				else {
					this.config.ctx.fillStyle = (node.activationResult >= 0.5) ? "black" : "white";
				}
				this.config.ctx.fillRect(
					boxX,
					boxY,
					scale,
					scale
				);
				this.config.ctx.globalAlpha = 1;
				this.config.ctx.strokeRect(
					boxX,
					boxY,
					scale,
					scale
				);
				// this.config.ctx.fillText(
				// 	node.activationResult,
				// 	textX,
				// 	textY
				// );
				// this.config.ctx.fillText(
				// 	node.Innovation,
				// 	textX,
				// 	textY+8
				// );
			}
		}
		for(var i=0; i < network.Conns.length; i++) {
			var conn = network.Conns[i];
			if(conn.Enabled) {
				var source = this.getNeuronWithInnovationId(network, conn.Source);
				var target = this.getNeuronWithInnovationId(network, conn.Target);
				if(conn.Weight >= 0) {
					this.config.ctx.strokeStyle = 'green';
				} else {
					this.config.ctx.strokeStyle = 'red';
				}

				var absRes = Math.abs(conn.result)
				this.config.ctx.globalAlpha = (absRes > 1) ? 1 : ( (absRes < 0.2) ? 0.2 : absRes);

				this.config.ctx.beginPath();
				this.config.ctx.moveTo(this.getNodeXcenter(source), this.getNodeYcenter(source));
				this.config.ctx.lineTo(this.getNodeXcenter(target), this.getNodeYcenter(target));
				this.config.ctx.stroke();
				this.config.ctx.globalAlpha = 1;
			}
		}
		console.log('asd');
	},
	getNodeXcenter: function(node) {
		return this.getNodeX(node) + this.config.flappyScale/2;
	},
	getNodeYcenter: function(node) {
		return this.getNodeY(node) + this.config.flappyScale/2;
	},
	getNodeY: function(node) {
		switch(node.NeuronType) {
			case 1:
			break;
			case 2:
				return (Math.floor((node.Innovation - 2) / 10) / 10 ) * this.config.flappySizeX * this.config.flappyScale;
			break;
			case 4:
			case 3:
				return node.X * this.config.flappyScale * this.config.flappySizeX;
			break;
		}
	},
	getNodeX: function(node) {
		switch(node.NeuronType) {
			case 1:
			break;
			case 2:
				return (((node.Innovation - 2) % 10 ) / 10) * this.config.flappySizeY * this.config.flappyScale;
			break;
			case 4:
			case 3:
				return (node.Y * this.config.flappySizeY + this.config.flappySizeY) * this.config.flappyScale;
			break;
		}
	},
	getNeuronWithInnovationId: function(network, innID) {
		for(var i in network.Nodes){
			if(network.Nodes[i].Innovation == innID){
				return network.Nodes[i];
			}
		}
	},
	run: function(input) {
		for(var x = 0; x < this.config.flappySizeX; x++) {
			for(var y = 0; y < this.config.flappySizeY; y++) {
				var pos = x * this.config.flappySizeX + y
				var rectX = x * this.config.flappyScale;
				var rectY = y * this.config.flappyScale;
				this.config.ctx.strokeStyle = "black";
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
				this.config.ctx.strokeRect(
					rectY,
					rectX,
					this.config.flappyScale,
					this.config.flappyScale
				);
			}
		}
	}
}
