const Direction = Object.freeze({ LEFT: { x: -1, y: 0 }, RIGHT: { x: +1, y: 0 }, DOWN: { x: 0, y: +1 } });
const Shapes = Object.freeze({ T:0, L:1, J:2, S:3, Z:4, O:5, I:6 });

class Tetramino {
	constructor(x, y, prototype){
		this.x = x;
		this.y = y;
		this.shapeType = prototype;
		this.shape = prototypes[prototype].shape.slice();
		this.farbe = prototypes[prototype].farbe;
	}

	rotateClockwise(){

	}

	rotateCounterclockwise(){

	}

	move(direction){
		this.x += direction.x;
		this.y += direction.y;
	}

	oneStepDown(){
		this.move(Direction.DOWN);
	}

	dropDown(){
		while(!this.isGroundTouch()){
			this.oneStepDown();
		}
		this.move(Direction.DOWN);;
	}

	merge(){
		for(let y = 0; y < this.shape.length; ++y){
			for(let x = 0; x < this.shape[y].length; ++x){
				if(this.shape[y][x] > 0){
					let currBlockX = this.x + x;
					let currBlockY = this.y + y;
					field[currBlockY][currBlockX] = 1;
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
		fill(this.farbe);
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

const prototypes = [
	//T-shape
	{
		shape:
		[
			[1,1,1],
			[0,1,0],
			[0,0,0]
		],
		farbe: "#af27cd"
	},
	//L-shape
	{
		shape:
		[
			[0,1,0],
			[0,1,0],
			[0,1,1]
		],
		farbe: "#976ddb"
	},
	//J-shape
	{
		shape:
		[
			[0,1,0],
			[0,1,0],
			[1,1,0]
		],
		farbe: "#cc0000"
	},
	//S-shape
	{
		shape:
		[
			[0,1,1],
			[1,1,0],
			[0,0,0]
		],
		farbe: "#0099cc"
	},
	//Z-shape
	{
		shape:
		[
			[1,1,0],
			[0,1,1],
			[0,0,0]	
		],
		farbe: "#82f827"
	},
	//O-shape
	{
		shape:
		[
			[1,1],
			[1,1]
		],
		farbe: "#ff4040"
	},
	//I-shape
	{
		shape:
		[
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0],
			[0,0,0,0]
		],
		farbe: "#ffff66"
	}	
];