flappy = {
	screen: {
		x: 10,
		y: 10
	},
	Alive: true,
	Fitness: 0,
	bird: {
		posX: 4,
		posY: 2,
		velocity: 1
	},
	obs: {
		Y: 12,
		topX: 3,
		bottomX: 6
	},
	Export: function() {
		var out = [];
		for(var x = 0; x < this.screen.x; x++) {
			for(var y = 0; y < this.screen.y; y++) {
				var pos = x * this.screen.x + y
				if(this.bird.posX == x && this.bird.posY == y) {
					out[pos] = 1.0;
				} else if(this.obs.Y == y && (x <= this.obs.topX || x >= this.obs.bottomX)) {
					out[pos] = -1.0;
				} else {
					out[pos] = 0;
				}
			}
		}
		return out;
	},
	Next: function(input) {
		this.BirdNext()
		if(input >= 0.5) {
			this.bird.velocity = 3
		}
		this.ObstacleNext()
		this.CheckAlive()
	},
	BirdNext: function() {
		if(this.bird.velocity > -1) {
			if(this.bird.posX > 0) {
				this.bird.posX--
			}
			this.bird.velocity--
		} else {
			this.bird.posX++
		}
	},
	ObstacleNext: function() {
		if(this.obs.Y < 0) {
			this.obs.Y = this.screen.y
			this.obs.topX = Math.floor((Math.random() * 5))
			this.obs.bottomX = this.obs.topX + 3
		} else {
			this.obs.Y--
		}
	},
	CheckAlive: function() {
		if(this.bird.posX >= this.screen.x) {
			this.Alive = false
		}

		if(this.bird.posY == this.obs.Y) {
			if(this.bird.posX >= this.obs.bottomX || this.bird.posX <= this.obs.topX) {
				this.Alive = false
			}
		} else if(this.bird.posY == this.obs.Y - 1) {
			this.Fitness++;
		}
	}
};
