visualise = function(sizeX, sizeY, scale, input) {
	var c = document.getElementById("myCanvas");
	var ctx=c.getContext("2d");

	for(var x = 0; x < sizeX; x++) {
		for(var y = 0; y < sizeY; y++) {
			var pos = x * sizeX + y
			var rectX = x*scale;
			var rectY = y*scale;
			if(input[pos] === 0) {
				ctx.fillStyle = "white";
			}
			else if(input[pos] === -1) {
				ctx.fillStyle = "red";
			}
			else if(input[pos] === 1) {
				ctx.fillStyle = "green";
			}

			ctx.fillRect(rectY,rectX,scale,scale);
		}
	}

	ctx.stroke();
}
