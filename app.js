$(function(){
	//N
	var partition = 2;
	var squareN = partition*partition;
	var maxDices = 3;
	var board = new Array();
	var turn = ["A","B"];
	var playerIndex = 0;
	var player=turn[playerIndex];

	var masuData = function(turn,dices,sequence){
		this.turn=turn;
		this.dices = dices;
		this.sequence = sequence;
	}

	start();

	function start(){
		document.getElementById("turn").innerHTML="turn : "+player;
		//playerIndex = 0;
		initBoard();
		drawButton();
	}

	function initBoard(){
	    for(var i=0;i<squareN;i++){
		var numberOfDices = Math.floor(Math.random() * (maxDices))+ 1;
		var whosePlace= Math.floor(Math.random() * 2);		
    	var masu = new masuData(whosePlace,numberOfDices,i);
    	board.push(masu);
    	}  
	}

	function drawButton(){
		if($('#board').length > 0){$('#board').empty();}
		for(var j=0;j<squareN;j++){
		    $('#board').append(
		    	$('<input type="button" class="buttons" value="' +turn[board[j].turn] + board[j].dices+'" id="id'+j+'">' ));
	    	if(j%2==1){
	    		$('#board').append($('<br>'));
	    	}
		}
		document.getElementById("turn").innerHTML="turn : "+player;
	}

	$("#submit").click(function(){		
		submitClicked();
	});

	function submitClicked(){
		findPlaceToAttack();
	}

	function findPlaceToAttack(){
		//させるすべての場所
		var marks = new Array();
		for(var i = 0;i<squareN; i++){
			if(board[i].turn == playerIndex){
				var placeForCell=findPlaceForCell(i);
				for(var j = 0; j< placeForCell.length; j++){
					if(findPlaceForCell != null){
						marks.push(placeForCell[j]);
					}	
				}
			}
		}
		document.getElementById("placeToAttack").innerHTML+="marks : "+marks;
	}	


	//ある場所にいる攻撃者がさせる場所
	//TODO!Nが増えたとき修正
	function findPlaceForCell(attackerIndex){
		var indexForDirections=[(attackerIndex-partition-1),//左上
						(attackerIndex-partition),   //上
						(attackerIndex-1),           //左
						(attackerIndex+1),            //右
						(attackerIndex+partition),   //左下
						(attackerIndex+partition+1)];//右下	
		
		//indexForDirectionsのインデックス格納
		var directionsToAttack = new Array();
		switch(attackerIndex){
			case 0: 
				directionsToAttack = [3,4,5];
				break;
			//右上端
			case (partition - 1):
				directionsToAttack = [2,4];
				break;
			//左下端
			case (partition*(partition-1)):
				directionsToAttack = [1,3];
				break;
			//右下端
			case(squareN-1):
				directionsToAttack = [0,1,2];	
				break;		
		}

		var placeToAttack = new Array();//自分の位置からさせる場所のインデックス
		for(var i=0;i<directionsToAttack.length;i++){
			placeToAttack.push(indexForDirections[directionsToAttack[i]]);
		}
		
		//敵の陣地かつ敵のサイコロの数より多いか？
		var enemyToAttack = new Array();
		for(var i=0;i<placeToAttack.length;i++){
			if((board[placeToAttack[i]].turn != playerIndex)
				&& (board[placeToAttack[i]].dices < board[attackerIndex].dices)){
					enemyToAttack.push(placeToAttack[i]);
			}
		}
		//document.getElementById("placeToAttack").innerHTML+="canAttackCell : "+enemyToAttack +"  index"+attackerIndex;
		return enemyToAttack;
		//上に対して点数（取り除いたサイコロの数）が最大になるところを先頭にするように並び替え
	}

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

