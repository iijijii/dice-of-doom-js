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
		for(var x=0;x<partition;x++){
	        board[x]=new Array();
	        for(var y=0;y<partition;y++){
	            board[x][y]= desideWhosePlace()+desideNumOfDices();
	        }
	    }
	}

    //各ヘックスのサイコロの数を決める
	function desideNumOfDices(){
		var numberOfDices = Math.floor(Math.random() * (maxDices))+ 1;
		return numberOfDices;
	}
	//各ヘックスがだれの陣地かを決める
	function desideWhosePlace(){
		var randomNumber = Math.floor(Math.random() * 2);
		if(randomNumber == 0){return "A";}
		else{return "B";}
	}

	function draw(){ 
		var line='';
	    for(var y=0;y<partition;y++){
	        for(var x=0;x<partition;x++){line+=board[x][y];}
	        line+="<br>"
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
