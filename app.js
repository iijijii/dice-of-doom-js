$(function(){
	//N
	var partition = 2;
	var maxDices = 3;
	var board = new Array();
	var turn = ["A","B"];

	var masuData = function(turn,dices,sequence){
		this.turn=turn;
		this.dices = dices;
		this.sequence = sequence;
	}

	makeMasu();
	draw();

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

}); 

//////////////////////////////////////////////////////////////
function attack(){

	if(canAttack){
		changePosition(attackX,attackY,aimX,aimY);
	}
	else{
		supply();
	}
	draw();
	changeTurn();
}

function canAttack(){
	return true;
}

//アタックした場所にサイコロを移し、自分の陣地にする
function changePosition(){
}

/////////////////////////////////////////////////////////////////
//補給する。
function supply(){}

function changeTurn(){
	if(turn="A"){turn ="B"}
	else{turn = "A"}
}
