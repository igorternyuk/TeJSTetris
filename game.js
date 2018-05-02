var fieldWidth = 12;
var fieldHeight = 20;
var tileSize = 25;
var canvasWidth = tileSize * fieldWidth + 160;
var canvasHeight = tileSize * fieldHeight;

var GameState = Object.freeze({ PLAY: 0, PAUSED: 1, GAME_OVER: 2 });
var field;
var level = 1;
var numRemovedLines = 0;
var score = 0;
var gameState = GameState.PLAY;
var activePiece, nextPiece;
var nextPieceX = tileSize * fieldWidth + 5;
var nextPieceY = 60;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(60);
    field = createMatrix(fieldHeight + 1, fieldWidth);
    activePiece = new Tetramino(fieldWidth / 2, 1, floor(random(7)));
    nextPiece = new Tetramino(fieldWidth / 2, 1, floor(random(7)));
}

function keyPressed(){
	switch(keyCode){
		case LEFT_ARROW:
			activePiece.move(Direction.LEFT);
			break;
		case RIGHT_ARROW:
			activePiece.move(Direction.RIGHT);
			break;
		case UP_ARROW:
			activePiece.rotateCounterclockwise();
			break;
		case DOWN_ARROW:
			activePiece.move(Direction.DOWN);
			activePiece.rotateClockwise();
			break;
	}

	if(key === ' '){
		activePiece.dropDown;
	}
}

function spawnNewRandomTetramino(){
	activePiece = nextPiece;
	nextPiece = new Tetramino(fieldWidth / 2, 1, floor(random(7)));
}

//main loop
function draw() {
	if(frameCount % 60 === 0){
		//activePiece.move(Direction.DOWN);
		activePiece.oneStepDown();
		if(activePiece.isGroundTouch()){
			activePiece.merge();
			spawnNewRandomTetramino();
		}
	}
	//activePiece.oneStepDown();
	background(0);
	renderField();
	renderNextPiece();
	renderScore();
	//activePiece.oneStepDown()

	activePiece.render();
}

function renderField(){
	fill(182,255,0);
	noStroke();
	for(let y = 0; y < field.length - 2; ++y){
		for(let x = 0; x < field[y].length - 1; ++x){
			let px = x * tileSize + tileSize;
			let py = y * tileSize + tileSize;
			ellipse(px, py, 3);
			if(field[y][x] > 0){
				fill(prototypes[field[y][x]].farbe);
				rect(x * tileSize + 1, y * tileSize + 1, tileSize - 1, tileSize - 1);
			}
		}
	}
	noFill();
	stroke(color(91,127,0));
	strokeWeight(2);
	rect(0,0,tileSize * fieldWidth, tileSize * fieldHeight - 2);
}

function renderNextPiece(){	
	noFill();
	stroke(color(255,0,0));
	strokeWeight(2);
	textFont('Arial');
	textSize(16);
	text("NEXT PIECE:", tileSize * fieldWidth + 5, 25);
	noStroke();
	nextPiece.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value > 0){
				fill(prototypes[nextPiece.shapeType].farbe);
				rect(nextPieceX + x * tileSize + 1,
				     nextPieceY + y * tileSize + 1,
				     tileSize - 1, tileSize - 1);
			}
		});
	});
}

function renderScore(){
	noFill();
	stroke(color(255,0,0));
	strokeWeight(2);
	textFont('Arial');
	textSize(16);
	text("SCORE:\n" + score, tileSize * fieldWidth + 5, 150);
	stroke(color(0,255,0));
	text("LINES REMOVED:\n" + numRemovedLines, tileSize * fieldWidth + 5, 200);
	stroke(color(255,255,0));
	text("LEVEL:\n" + level, tileSize * fieldWidth + 5, 250);
}

function renderGameInfo(){
	
}

function createMatrix(rowCount, colCount){
	let matrix = new Array(rowCount);
	for(let i = 0; i < matrix.length; ++i){
		matrix[i] = new Array(colCount);
	}
	for(let y = 0; y < matrix.length; ++y){
		for(let x = 0; x < matrix[y].length; ++x){
			matrix[y][x] = 0;
		}
	}
	return matrix;
}



