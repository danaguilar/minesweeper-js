$(document).ready(function() {
	minesweeper.createBoard();
	$(".square").click(function(){
		var result = minesweeper.checkSquare.call(this);
		console.log(result);
		var squareID = $(this).attr("id");
		if(result == 0){
			$(this).addClass('empty');
			var nearbySquares = minesweeper.getSurroundSquares(squareID);
			$.each(nearbySquares,function( index, value){
				if(!$("#"+value).hasClass('empty')){
					$("#"+value).click();
				}
			});
		}
		else if(result == 9 ){
			alert("boom");
		}
		else{
			$(this).html(result);
		}
	});
	$(".square").on('mousedown',function(event){
		if (event.which == 3){
			$(this).toggleClass("flagged");
		}
	});
});

var minesweeper = {
	numOfMines: 9,
	mineSquares: [],
	numOfFlags: 9,
	createBoard : function(){
		var flagRow = $("<div class = 'flag-row'></div>");
		console.log(this.numOfFlags);
		for(var i = 0; i < this.numOfFlags; i++){
			var flag = $("<div class = 'flag'></div>");
			flagRow.append(flag);
		}
		$(document.body).prepend(flagRow);
		for(var i = 0; i < 9; i++){
			var row = $("<div class = 'row'></div>");
				for(var j = 0; j < 9; j++){
					var square = $("<div class = 'square' id ='" + i +"-" + j +"'></div");
					row.append(square);
				}
			$(".container").append(row);
		}
		for(var i = 0; i < this.numOfMines; i++){
			var randSquare = this.getRandomSquare();
			while(randSquare.hasClass('selected')){
				var randSquare = this.getRandomSquare();
			}
			randSquare.addClass('selected');
			this.mineSquares.push(randSquare.attr('id'));
		}
		$(".selected").removeClass("selected");
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
		for(var i = squareRow-1 ; i <= (parseInt(squareRow)+1); i++){
			for(var j = squareCol - 1; j <= parseInt(squareCol)+1; j++){
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
		return surroundingSquares;	
	},

	isAMine : function(squareID){
		for(var i=0; i<this.mineSquares.length; i++ ){
			if(this.mineSquares[i] == squareID){
				return true;
			}
		}
		return false;
	},

	checkSquare : function(){
		var squareID = $(this).attr("id");
		if(minesweeper.isAMine(squareID)){
			return 9;
		}
		var nearbyMines = 0;
		var nearbySquares =  minesweeper.getSurroundSquares(squareID);
		console.log(nearbySquares);
		for(var i=0; i<nearbySquares.length; i++ ){
			if(minesweeper.isAMine(nearbySquares[i])) {
				nearbyMines++;
			}
		}
		return nearbyMines;
	}
};