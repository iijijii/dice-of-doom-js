$(function(){
	//N
	var partition = 2;
	var maxDices = 3;
	var board = new Array();
	var turn = ["A","B"];
	//var attacker = turn[0];

	//攻撃する、されるボタン情報格納
	var buttonInfo = new Array();

	var masuData = function(turn,dices,sequence){
		this.turn=turn;
		this.dices = dices;
		this.sequence = sequence;
	}

	makeMasu();
	draw();
	makeButton();

	function makeMasu(){
	    for(var i=0;i<partition*partition;i++){
		var numberOfDices = Math.floor(Math.random() * (maxDices))+ 1;
		var player= Math.floor(Math.random() * 2);
		
    	var masu = new masuData(player,numberOfDices,i);
    	board.push(masu);
    	}	    
	}

	function draw(){ 
		
		var line='';
	    for(var j=0;j<partition*partition;j++){
        	line += turn[board[j].turn] + board[j].dices.toString();
        	if(j%2==1){
        		line+="<br>" ;
        	}
    	}   
	    document.getElementById("board").innerHTML=line;
	    document.getElementById("turn").innerHTML="turn : "+turn;
	}

	function makeButton(){
		for(var j=0;j<partition*partition;j++){
		    $('#board').append(
		    	$('<input type="button" class="buttons" value="' +turn[board[j].turn] + board[j].dices+'" id="id'+j+'">' ));
	    	if(j%2==1){
	    		$('#board').append($('<br>'));
	    	}
		}
	}

	$(".buttons").click(function(){
		id = $(this).attr("id");
		buttonInfo.push(id);
		document.getElementById("buttonInfo").innerHTML=buttonInfo;
	});

	$("#submit").click(function(){
		attack();
	})

	//////////////////////////////////////////////////////////////
	function attack(){

		if(canAttack){
			changePosition(1,2);
		}
		else{
			supply();
		}
		draw();
		makeButton();
		changeTurn();
	}

	function canAttack(){
		return true;
	}

	//アタックした場所にサイコロを移し、自分の陣地にする
	function changePosition(mySequence,yourSequence){
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
		if(turn==0){turn = 1;}
		else{turn = 0;}
	}

}); 

