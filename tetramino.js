const Shapes = Object.freeze({ T:0, L:1, J:2, S:3, Z:4, O:5, I:6 });

class Tetramino{
	constructor(x, y, shape){
		this.x = x;
		this.y = y;
		this.shapeType = shape;
		this.shape = prototypeMatrix[shape].slice();;
	}

	moveRight(){
		if(this.x < fieldWidth - 1){
			++this.x;
		}
	}

	moveLeft(){
		if(this.x > 0){
			--this.x;
		}
	}

	rotateClockwise(){

	}

	rotateCounterclockwise(){

	}

	oneStepDown(){
		if(isGroundTouch()){
			this.merge();
		}
		++this.y;
	}

	dropDown(){
		++this.y;
	}

	merge(){
		for(let y = 0; y < this.shape.length; ++y){
			for(let x = 0; x < this.shape[y].length; ++x){
				if(this.shape[y][x] > 0){
					let currBlockX = this.x + x;
					let currBlockY = this.y + y;
					field[currBlockY][currBlockX] = this.shapeType;
				}
			}
		}
	}

	isGroundTouch(){
		for(let y = 0; y < this.shape.length; ++y){
			for(let x = 0; x < this.shape[y].length; ++x){
				if(this.shape[y][x] > 0){
					let currBlockX = this.x + x;
					let currBlockY = this.y + y;
					if(field[currBlockY + 1][currBlockX] > 0){
						return true;
					}
				}
			}
		}
		return false;
	}

	render(){
		noStroke();
		fill(color(255,0,0));
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value > 0){
					rect((this.x + x) * tileSize + 1,
					     (this.y + y) * tileSize + 1,
					     tileSize - 1, tileSize - 1);
				}
			});
		});
	}
}

const prototypeMatrix = [
	//T-shape
	[
		[1,1,1],
		[0,1,0],
		[0,0,0]
	],
	//L-shape
	[
		[0,1,0],
		[0,1,0],
		[0,1,1]
	],
	//J-shape
	[
		[0,1,0],
		[0,1,0],
		[1,1,0]
	],
	//S-shape
	[
		[0,1,1],
		[1,1,0],
		[0,0,0]
	],
	//Z-shape
	[
		[1,1,0],
		[0,1,1],
		[0,0,0]	
	],
	//O-shape
	[
		[1,1],
		[1,1]
	],
	//I-shape
	[
		[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0],
		[0,0,0,0]
	]	
];