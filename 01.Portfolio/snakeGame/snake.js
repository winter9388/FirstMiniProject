const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const popup = document.querySelector(".popup");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";


// create snake

let snake = [];

snake[0] = {
  x : 9 * box,
  y : 10 * box
}

// create food
let food = {
  x : Math.floor(Math.random() * 17 + 1) * box,
  y : Math.floor(Math.random() * 15 + 3) * box
}

// create the score var
let score = 0;

// control the snake
let d;

document.addEventListener("keydown", direction);

function direction(event){
  console.log(event.keyCode)
  if (event.keyCode === 37 && d != "RIGHT"){
    left.play();
    d = "LEFT";
  }else if (event.keyCode === 38 && d != "DOWN"){
    up.play();
    d = "UP";
  }else if (event.keyCode === 39 && d != "LEFT"){
    right.play();
    d = "RIGHT";
  }else if (event.keyCode === 40 && d != "UP"){
    down.play();
    d = "DOWN";
  }
}

// check collision function
function collision(head, array){
  for(let i = 0; i < array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y){
      dead.play();
      return true;
    }
  }
  return false;
}

// draw everything to the canvas
function draw(){
  ctx.drawImage(ground,0,0);

  for(let i = 0; i < snake.length ; i++){
    ctx.fillStyle = (i == 0) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);

  }
  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if( d == "LEFT") snakeX -= box;
  if( d == "UP") snakeY -= box;
  if( d == "RIGHT") snakeX += box;
  if( d == "DOWN") snakeY += box;

  // if snake eats the food
  if(snakeX == food.x && snakeY == food.y){
    score++
    eat.play();
    food = {
      x : Math.floor(Math.random() * 17 + 1) * box,
      y : Math.floor(Math.random() * 15 + 3) * box
    }
  }else{
    // remove the tail
    snake.pop();
  }

  // add new head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over
  if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
    clearInterval(game);
    let wait = setTimeout(function(){
      playPop();
    },100);  
  }

  if(score == 20){
    clearInterval(game);
    let wait = setTimeout(function(){
      playPopWin();
    },100);  
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2*box, 1.6*box);

}

// call the draw function every 100 ms
let game = setInterval(draw, 100);


// play button popup
function playPop(){
  const play = document.createElement("p");
  play.textContent = "RePlay";
  popup.classList.add("play");
  popup.appendChild(play);
}

function playPopWin(){
  const play = document.createElement("p");
  play.textContent = "Win!";
  popup.classList.add("play");
  popup.appendChild(play);
}

// replay game when user click replay button
popup.addEventListener("click",(event)=>{
  if(event.target.parentElement.classList.contains("play")){
    event.target.remove();
    popup.classList.remove("play");
    history.go(0);
  }
  console.log(event.target.parentElement);
})
