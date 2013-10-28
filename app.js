$(function(){
	//N
	var partition = 2;
	var squareN = partition*partition;
	var maxDices = 3;
	var board = new Array();
	var turn = ["A","B"];
	var playerIndex = 0;
	var player=turn[playerIndex];
	var recentPasser　= "passer";
	var dicesToSupply=-1;

	var masuData = function(turn,dices,canAttackIndexes,numOfHarvests){
		this.turn=turn;
		this.dices = dices;
		this.canAttackIndexes = canAttackIndexes;
		this.numOfHarvests = numOfHarvests;
	}

	start();

	function start(){
		//playerIndex = 0;
		var sameFlag = true;
		do{
			initBoard();
			for(var i=0;i<squareN-1;i++){
				var j=i+1;
				if(board[i].turn != board[j].turn){
					sameFlag=false;
					break;
				}
			}
		}while(sameFlag === true)

		drawButton();
		findPlaceToAttack();
	}

	function initBoard(){
		var array = new Array();
	    for(var i=0;i<squareN;i++){
			var numberOfDices = Math.floor(Math.random() * (maxDices))+ 1;
			var whosePlace= Math.floor(Math.random() * 2);		
	    	var masu = new masuData(whosePlace,numberOfDices,array,array);
	    	board.push(masu);
    	}  
	}

	function drawButton(){
		if($('#board').length > 0){$('#board').empty();}
		for(var j=0;j<squareN;j++){
		    $('#board').append(
		    	$('<input type="button" value="' +turn[board[j].turn] + board[j].dices+'" id="id'+j+'">' ));
	    	if(j%2==1){
	    		$('#board').append($('<br>'));
	    	}
    	}
		document.getElementById("turn").innerHTML="turn : "+player;
	}

	$("#buttons").on("click", function() {//TODO　clickedNumber修正,処理を値の取得とその他に分ける
		var num = $(this).find('.attackPlaceButton').length;
		var clickedNumber = parseInt($(".attackPlaceButton").attr("value"));
		var attackerIndex;
		for(var i=0;i<squareN;i++){
			for(var j=0;j<board[i].canAttackIndexes.length;j++){
				if(board[i].canAttackIndexes[j]==clickedNumber){
					attackerIndex = i;
					attack(attackerIndex,clickedNumber);
					dicesToSupply+=board[i].numOfHarvests[j];
				}			
			}
		}
		findPlaceToAttack();
		drawButton();
	});

	function findPlaceToAttack(){
		//させるすべての場所
		var marksIndexes = new Array();
		for(var i = 0;i<squareN; i++){
			if(board[i].turn == playerIndex){
				findPlaceForCell(i);//各味方の情報にアタックできる情報を入れる
				for(j=0;j<board[i].canAttackIndexes.length;j++){
					var canAttackIndex = board[i].canAttackIndexes[j];
					if($.inArray(canAttackIndex, marksIndexes)<0){
						marksIndexes.push(canAttackIndex);
					}
				}
			}
		}
		marksIndexes.sort(
			function(a,b){
	    		if( a < b ) return -1;
	       	 	if( a > b ) return 1;
	        	return 0;
   			}
		);
		generateButtons(marksIndexes);	//AIの場合いらない
	}	

	function generateButtons(marksIndexes){
		if($('#buttons').length > 0){$('#buttons').empty();}
		document.getElementById("placeToAttack").innerHTML = "canAttackPlace : "+ marksIndexes;
		for(var i=0;i<marksIndexes.length;i++){
			$('#buttons').append(
		    		$('<input type="button" class="attackPlaceButton" value="' +marksIndexes[i]+'"id="'+marksIndexes[i]+'">' ));
		}
	}

	$("#passButton").click(function(){
		if(recentPasser!=player && recentPasser!= "passer") {end();}
		else{
			recentPasser = player;
			supply();
			dicesToSupply = -1;
			changeTurn();
			findPlaceToAttack();
			drawButton();
		}
	});


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
		var enemyToAttack = new Array();//敵のインデックス
		var enemyDices = new Array();
		for(var i=0;i<placeToAttack.length;i++){
			if((board[placeToAttack[i]].turn != playerIndex)
				&& (board[placeToAttack[i]].dices < board[attackerIndex].dices)){
					enemyToAttack.push(placeToAttack[i]);
					enemyDices.push(board[i].numberOfDices);
			}
		}
		//return enemyToAttack;
		board[attackerIndex].canAttackIndexes=enemyToAttack;
		board[attackerIndex].numOfHarvests=enemyDices;
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
	function supply(){
		var numOfSupply = dicesToSupply;//取り除いたサイコロ-1
		while(numOfSupply>0){
			for(var j=0;j<squareN;j++){
				if((board[j].turn==player)&&(board[j].numberOfDices<maxDices)){
					board[j].numberOfDices++;
					numOfSupply--;
				}
			}
		}
	}

	function changeTurn(){
		if(playerIndex == turn.length){playerIndex = 0;}
		else{playerIndex = playerIndex + 1;}
		player = turn[playerIndex];
	}

	function end(){//Nが増えたとき修正
		var numOfPlayerPlaces = new Array(turn.length);
		var winner;
		for(var j=0;j<turn.length;j++){
			numOfPlayerPlaces[j]=0;
			for(var i=0;i<squareN;i++){
				if(board[i].turn==j){
					numOfPlayerPlaces[j]++;
				}
			}
		}
		if(numOfPlayerPlaces[0]>numOfPlayerPlaces[1]){
			winner = turn[0];
		}else{
			winner = turn[1];
		}
		document.getElementById("turn").innerHTML="winner : "+winner;
	}
}); 

