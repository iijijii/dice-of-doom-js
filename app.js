$(function(){
	//N
	var partition = 2;
	var maxDices = 3;
	var board = new Array();
	var turn = ["A","B"];
	var attacker;

	//攻撃する、されるボタン情報格納
	var buttonInfo = new Array();

	var masuData = function(turn,dices,sequence){
		this.turn=turn;
		this.dices = dices;
		this.sequence = sequence;
	}

	start();

	function start(){
		attacker = turn[0];
		initBoard();
		drawButton();
	}

	function initBoard(){
	    for(var i=0;i<partition*partition;i++){
		var numberOfDices = Math.floor(Math.random() * (maxDices))+ 1;
		var player= Math.floor(Math.random() * 2);
		
    	var masu = new masuData(player,numberOfDices,i);
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
		document.getElementById("turn").innerHTML="turn : "+attacker;
	}

	$(".buttons").click(function(){
		id = $(this).attr("id");
		buttonInfo.push(id);

	});

	$("#submit").click(function(){
		attack();
	});

	//////////////////////////////////////////////////////////////
	function attack(){
		console.log(buttonInfo.length);
		var NumOfClicked = buttonInfo.length; 
		var attackerIndex　= 0;
		var attackedIndex = 0;

		if(NumOfClicked.length==2){
			//console.log(buttonInfo.length);
			var attackerIndex = parseInt(buttonInfo[NumOfClicked-2].substring(2,3));
			attackedIndex = parseInt(buttonInfo[NumOfClicked-1].substring(2.3));
			console.log("a");
		}else{
			//空にする
		}

		if(canAttack()){
			changePosition(attackerIndex,attackedIndex);
		}
		else{
			supply();
			changeTurn();
		}
		drawButton();
	}

	function canAttack(){
		return true;
	}

	//アタックした場所にサイコロを移し、自分の陣地にする
	function changePosition(mySequence,yourSequence){
		console.log("a");
		board[yourSequence].dices = board[mySequence].dices - 1;
		board[mySequence].dices = 1;
		var enemy = board[yourSequence].turn ;
		if(enemy == 0){ enemy = 1;}
		else{ enemy = 0;}
		board[yourSequence].turn = enemy;
	}

	/////////////////////////////////////////////////////////////////
	//補給する。
	function supply(){}

	function changeTurn(){
		if(attacker=="A"){attacker = "B";}
		else{attacker = "A";}
	}

}); 

