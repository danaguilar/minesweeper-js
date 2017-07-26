$(document).ready(function() {
	minesweeper.createBoard();
	minesweeper.getSurroundSquares("4-4");
});

var minesweeper = {
	numOfMines: 9,
	mineSquares: [],
	createBoard : function(){
		for(i = 0; i < 9; i++){
			var row = $("<div class = 'row'></div>");
				for(j = 0; j < 9; j++){
					var square = $("<div class = 'square' id ='" + i +"-" + j +"'></div");
					row.append(square);
				}
			$(".container").append(row);
		}
		for( i = 0; i < this.numOfMines; i++){
			var randSquare = this.getRandomSquare();
			while(randSquare.hasClass('selected')){
				var randSquare = this.getRandomSquare();
			}
			this.mineSquares.push(randSquare.attr('id'));
		}
		console.log(this.mineSquares);
	},

	getRandomSquare : function(){
 		var col = Math.floor(Math.random() * 9);
 		var row = Math.floor(Math.random() * 9);
 		var idValue = "#" + row + "-" + col;
 		var randSquare =  $(idValue);
		return randSquare;
	},

	getSurroundSquares : function(squareID){
		var squareRow = squareID.split('-')[0];
		var squareCol = squareID.split('-')[1];
		var surroundingSquares = [];
		console.log("Row: " + squareRow + " Col: " + squareCol);
		for(i = squareRow-1 ; i <= (parseInt(squareRow)+1); i++){
			console.log(i);
			for(j = squareCol - 1; j <= parseInt(squareCol)+1; j++){
				var IdValue = "#"+i+"-"+j
				if(squareID == (i+"-"+j)){
					continue;
				}
				var foundSquare = $(IdValue);
				if(foundSquare.length){
					surroundingSquares.push(foundSquare.attr("id"));
				}
			}
		}
		console.log(surroundingSquares);	
	}
};