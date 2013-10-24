$(function(){
	//N
	var partition = 2;
	var maxDices = 3;
	var board = new Array();
	var turn = ["A","B"];
	var playerIndex = 0;
	var player=turn[playerIndex];

	//攻撃する、されるボタン情報格納
	var buttonInfo = new Array();

	var masuData = function(turn,dices,sequence){
		this.turn=turn;
		this.dices = dices;
		this.sequence = sequence;
	}

	start();

	function start(){
		//playerIndex = 0;
		initBoard();
		drawButton();
	}

	function initBoard(){
	    for(var i=0;i<partition*partition;i++){
		var numberOfDices = Math.floor(Math.random() * (maxDices))+ 1;
		var whosePlace= Math.floor(Math.random() * 2);		
    	var masu = new masuData(whosePlace,numberOfDices,i);
    	board.push(masu);
    	}  
	}

	function drawButton(){
		if($('#board').length > 0){$('#board').empty();}
		for(var j=0;j<partition*partition;j++){
		    $('#board').append(
		    	$('<input type="button" class="buttons" value="' +turn[board[j].turn] + board[j].dices+'" id="id'+j+'">' ));
	    	if(j%2==1){
	    		$('#board').append($('<br>'));
	    	}
		}
		document.getElementById("turn").innerHTML="turn : "+player;
		document.getElementById("buttonInfo").innerHTML="buttonInfo : "+ buttonInfo;
	}

	$(".buttons").click(function(){
		id = $(this).attr("id");
		buttonInfo.push(id);
		document.getElementById("buttonInfo").innerHTML="buttonInfo : "+ buttonInfo;
	});


	//アタックした場所にサイコロを移し、自分の陣地にする
	function attack(attacker,attacked){
		board[attacked].dices = board[attacker].dices - 1;
		board[attacker].dices = 1;
		board[attacked].turn = board[attacker].turn;
	}

	/////////////////////////////////////////////////////////////////
	//補給する。
	function supply(){}

	function changeTurn(){
		if(playerIndex == turn.length){playerIndex = 0;}
		else{playerIndex = playerIndex + 1}
	}

}); 

