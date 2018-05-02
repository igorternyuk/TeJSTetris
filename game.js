var fieldWidth = 12;
var fieldHeight = 20;
var tileSize = 18;
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
var nextPieceY = 45;
var numMerge = 0;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(20);
    field = createMatrix(fieldHeight + 1, fieldWidth);
    activePiece = new Tetramino(fieldWidth / 2, 1, floor(random(7)));
    nextPiece = new Tetramino(fieldWidth / 2, 1, floor(random(7)));
}

function togglePause(){
	if(gameState === GameState.PLAY){
		gameState = GameState.PAUSED;
	} else if(gameState === GameState.PAUSED){
		gameState = GameState.PLAY;
	}
}

function keyPressed(){
	if(key === ' '){
		togglePause();
	} 
	//console.log("keyCode = " + keyCode);
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
			activePiece.rotateClockwise();
		case 13:
			activePiece.dropDown();
			break;
	}

	
}

function spawnNewRandomTetramino(){
	//activePiece.merge();
	activePiece = nextPiece;
	nextPiece = new Tetramino(fieldWidth / 2, 1, floor(random(7)));
}

function printField(){
	field.forEach((row, y) => {
		console.log(row);
	});
}

//main loop
function draw() {

	if(gameState === GameState.PLAY){
		if(frameCount % 20 === 0){
			//activePiece.move(Direction.DOWN);
			if(activePiece.isGroundTouch()){
				activePiece.merge();
				++numMerge;
				console.log("numMerge = ", numMerge);				
				spawnNewRandomTetramino();
				printField();
			} else {
				activePiece.oneStepDown();
			}
		}
	}
	
	//activePiece.oneStepDown();
	background(0);
	renderField();
	renderNextPiece();
	renderScore();
	renderGameStatus();
	activePiece.render();
	//printField();
}

function renderField(){	
	noStroke();
	for(let y = 0; y < field.length - 1; ++y){
		for(let x = 0; x < field[y].length; ++x){
			let px = x * tileSize + tileSize;
			let py = y * tileSize + tileSize;
			fill(182,255,0);
			ellipse(px, py, 3);
			if(field[y][x] > 0){
				fill(prototypes[field[y][x] - 1].farbe);
				rect(x * tileSize + 1, y * tileSize + 1, tileSize - 1, tileSize - 1);
			}
		}
	}
	noFill();
	stroke(color(91,127,0));
	strokeWeight(2);
	rect(0,0,tileSize * fieldWidth, tileSize * fieldHeight);
}

function renderNextPiece(){	
	noFill();
	stroke("#8a2be2");
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

function renderGameStatus(){
	stroke("#35bcf8");
	text("GAME STATUS:", tileSize * fieldWidth + 5, 300);
	switch(gameState){
		case GameState.PLAY:
			stroke("#6dc066");
			text("PLAY", tileSize * fieldWidth + 5, 325);
			break;
		case GameState.PAUSED:
			stroke("#e4f201");
			text("PAUSED", tileSize * fieldWidth + 5, 325);
			break;
		case GameState.GAME_OVER:
			stroke("#ff4040");
			text("GAME OVER!!!", tileSize * fieldWidth + 5, 325);
			break;
	}
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

	//Create bottom of the well
	let lastRow = matrix.length - 1;
	for(let x = 0; x < matrix[lastRow].length; ++x){
			matrix[lastRow][x] = 1;
	}
	return matrix;
}



