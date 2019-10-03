
var gameStatus;
var gameSpeed=100;


function reset(){
	
	if(gameStatus==true){
		
		maingame();
	}
}

function startGame(){
	maingame();
	
}
function maingame(){
	
	
	
	gameStatus=false;
	

const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

const box=32;
const letter=26;
const letwidth=40;


const fruit=new Image();
const ground=new Image();

var count=0;


const drugs=new Image();


const txt="Score:";

fruit.src="kiafries.png";
ground.src="thistime.png";
drugs.src="drugimage.png";



let snakeCollisonX;
let snakeCollisionY;

let snake=[];

snake[0] = {
	x: 9 * box,
	y: 10 * box
};

// grafiki





let food = {
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box }
	
	
let drug = {
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
	
}

let score=0;

let d;

document.addEventListener("keydown",direction);

function direction(event){
if(event.keyCode==37 && d !="RIGHT"){
	d="LEFT";
	
}
else if(event.keyCode==38 && d!="DOWN"){
	d="UP";
	
	 
}
else if(event.keyCode==39 && d!="LEFT"){
	d="RIGHT";
}
else if(event.keyCode==40 && d!="UP"){
	d="DOWN";
	
}
}

function collision(head,array){
	for(let i=0; i< array.length; i++){
	if(head.x == array[i].x && head.y == array[i].y){
		
		snakeCollisionX=array[i].x;
		snakeCollisionY=array[i].y;
		console.log("IT COLLIDED WITH" + snakeCollisionX + snakeCollisionY);
		return true;
	}
	}
	return false;
	
	
}

function draw(){
	ctx.drawImage(ground,0,0);
	for(let i=0; i<snake.length; i++){
		
		
		ctx.fillStyle=(i==0)? "white" : "yellow"
		ctx.fillRect(snake[i].x, snake[i].y,box,box);
		
	  ctx.strokeStyle  ="red";
	  ctx.strokeRect(snake[i].x,snake[i].y,box,box);
		
	
	}

	ctx.drawImage(fruit,food.x,food.y);
	
	if(score>3){
	ctx.drawImage(drugs,drug.x,drug.y);
	}
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	
	 
	if(d == "LEFT"){ snakeX -=box;}
	if(d == "RIGHT"){ snakeX +=box;}
	if(d == "UP"){ snakeY -=box;}
	if(d == "DOWN"){snakeY +=box;}
	
	

	if(snakeX == food.x && snakeY == food.y ){
		
		score++;
		console.log("GameSpeed"+gameSpeed);
		food = {
		   
			x:Math.floor(Math.random()*17+1)*box,
			y:Math.floor(Math.random()*15+3)*box
		}
		
		// LOOPUJE WSZYSTKIE POZYCJE
		for (i=0; i<snake.length; i++){
			if(snake[i].x == food.x && snake[i].y == food.y){
				
				console.log("IT HAPPEND");
				food={
				x:Math.floor(Math.random()*17+1)*box,
				y:Math.floor(Math.random()*15+3)*box
				}
				
					
			}
			
			
			
		}
		if(food.x==drug.x && food.y == drug.y){
			food={
				x:Math.floor(Math.random()*17+1)*box,
				y:Math.floor(Math.random()*15+3)*box
				}
			
		}
		clearInterval(game);
		intv();
		
	}
	
	else{
		snake.pop();
	}
		
	if(snakeX == drug.x && snakeY == drug.y){
		drug={
			x:Math.floor(Math.random()*17+1)*box,
			y:Math.floor(Math.random()*15+3)*box
			
		}
		
		for (i=0; i<snake.length; i++){
			if(snake[i].x == drug.x && snake[i].y == drug.y){
				
				drug={
				x:Math.floor(Math.random()*17+1)*box,
				y:Math.floor(Math.random()*15+3)*box
				}
				
					
			}
			
			
			
		}
		if(drug.x==food.x && drug.y == food.y){
			drug={
				x:Math.floor(Math.random()*17+1)*box,
				y:Math.floor(Math.random()*15+3)*box
				}
			
		}
		
		clearInterval(game);
		drugSpeed();
		//setTimeout(changeSpeed,3000);
		
	}
	
	let newHead={
		x: snakeX,
		y: snakeY
	}
	
	
	if(snakeX < box || snakeX > 17*box || snakeY< 1*box  || snakeY >17*box || collision(newHead,snake)){
		
	if(collision(newHead,snake)==true){
		ctx.fillStyle= "purple";
		ctx.fillRect(snakeCollisionX, snakeCollisionY,box,box);
		
			
		ctx.strokeStyle="red";
		ctx.strokeRect(snakeCollisionX,snakeCollisionY,box,box);
		
		
	}
		
		
		 gameStatus= true;
		if(gameStatus==true){
			
			document.getElementById("wyniki").innerHTML+=" <br> Your last score was: " + score + "<br>";
			
		}
		gameSpeed=100;
		clearInterval(game);
		
		
	}
	 
		snake.unshift(newHead);
	 
	ctx.fillStyle="white";
	ctx.font="30px Special Elite";
	ctx.fillText(txt+score,letwidth,letter);
	
	
}
let game=setInterval(draw,gameSpeed);


function intv(){
	gameSpeed=gameSpeed-5;
	game=setInterval(draw,gameSpeed);
	
}



function drugSpeed(){

	gameSpeed=gameSpeed-30;
	clearInterval(game);
	game=setInterval(draw,gameSpeed);
	setTimeout(real,3000);
}

function real(){
	
		clearInterval(game);
		gameSpeed=100;
		console.log(gameSpeed);
		console.log(count);
		game=setInterval(draw,gameSpeed);
}


}

