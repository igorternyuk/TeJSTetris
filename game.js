var fieldWidth = 12;
var fieldHeight = 20;
var tileSize = 25;
var canvasWidth = tileSize * fieldWidth + 100;
var canvasHeight = tileSize * fieldHeight;

var GameState = Object.freeze({ PLAY: 0, PAUSED: 1, GAME_OVER: 2 });
var field;
var level = 1;
var numRemovedLines = 0;
var score = 0;
var gameState = GameState.PLAY;
var activeTetramino;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(10);
    field = createMatrix(fieldHeight + 1, fieldWidth);
    activeTetramino = new Tetramino(fieldWidth / 2, 1, Shapes.T);
}

function keyPressed(){
	switch(keyCode){
		case LEFT_ARROW:
			activeTetramino.moveLeft();
			break;
		case RIGHT_ARROW:
			activeTetramino.moveRight();
			break;
		case UP_ARROW:
			activeTetramino.rotateCounterclockwise();
			break;
		case DOWN_ARROW:
			activeTetramino.rotateClockwise();
			break;
		default:
			break;
	}
}
/*
function keyPressed(){
	switch(keyCode){
		case LEFT_ARROW:
			snake.turn(dirLeft);
			break;
		case RIGHT_ARROW:
			snake.turn(dirRight);
			break;
		case UP_ARROW:
			snake.turn(dirUp);
			break;
		case DOWN_ARROW:
			snake.turn(dirDown);
			break;
		case 78:
			startNewGame();
			break;
		case 32:
			togglePause();
			break;
		default:
			break;
	}
}
*/


//main loop
function draw() {
	background(0);
	drawField();
	activeTetramino.dropDown()
	activeTetramino.render();
}

function drawField(){
	fill(182,255,0);
	noStroke();
	for(let y = 0; y < field.length - 2; ++y){
		for(let x = 0; x < field[y].length - 1; ++x){
			let px = x * tileSize + tileSize;
			let py = y * tileSize + tileSize;
			ellipse(px, py, 3);
		}
	}
	noFill();
	stroke(color(91,127,0));
	strokeWeight(2);
	rect(0,0,tileSize * fieldWidth, tileSize * fieldHeight - 2);
}

function drawActiveTetramino(){

}

function drawNextTetramino(){
	
}

function drawScore(){
	
}

function drawGameInfo(){
	
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



