const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');

const ballradius = 7;
const dumbbellradius = 2;

const DUMBELLS_STATUS={
    ACTIVE: 1,
    INACTIVE: 0
}

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let dumbbells = [];
let num_dumbbells = 10;


function drawDumbbells(){
    for(let i = 0; i < num_dumbbells; i++){
        if(dumbbells[i].status === DUMBELLS_STATUS.ACTIVE){
        ctx.beginPath();
        ctx.arc(dumbbells[i].x,dumbbells[i].y,dumbbellradius,0,Math.PI*2);
        ctx.fillStyle = 'rgb(0, 125, 0)';
        ctx.fill();
        ctx.closePath();
        }
    }
}

function coordenatesDumbbells(){
    for(let i = 0; i < num_dumbbells; i++){
        dumbbells[i] = {
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height,
            status: DUMBELLS_STATUS.ACTIVE};
    }
}

function collisionDumbbells(){
    for(let i = 0; i < num_dumbbells; i++){
        const currentDumbbell = dumbbells[i];
        if(currentDumbbell.status === DUMBELLS_STATUS.INACTIVE) continue;
        const dx = x - currentDumbbell.x;
        const dy = y - currentDumbbell.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < ballradius + dumbbellradius){
            currentDumbbell.status = DUMBELLS_STATUS.INACTIVE;
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballradius,0,Math.PI*2);
    ctx.fillStyle = 'rgb(0, 125, 250)';
    ctx.fill();
    ctx.closePath();
}

function ballMovement(){
    if(rightPressed && x < canvas.width - ballradius){
        x += dx;
    } else if(leftPressed && x > ballradius){
        x -= dx;
    } else if(upPressed && y > ballradius){
        y -= dy;
    } else if(downPressed && y < canvas.height - ballradius){
        y += dy;
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

function initEvents() {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    function keyDownHandler(event) {
      const { key } = event
      if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
        rightPressed = true;
        event.preventDefault();
      } else if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
        leftPressed = true;
        event.preventDefault();
      } else if (key === 'Up' || key === 'ArrowUp' || key.toLowerCase() === 'w') {
        upPressed = true;
        event.preventDefault();
      } else if (key === 'Down' || key === 'ArrowDown' || key.toLowerCase() === 's') {
        downPressed = true;
        event.preventDefault();
      }
    }

    function keyUpHandler(event) {
      const { key } = event
      if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
        rightPressed = false;
        event.preventDefault();
      } else if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
        leftPressed = false;
        event.preventDefault();
      } else if (key === 'Up' || key === 'ArrowUp' || key.toLowerCase() === 'w') {
        upPressed = false;
        event.preventDefault();
      } else if (key === 'Down' || key === 'ArrowDown' || key.toLowerCase() === 's') {
        downPressed = false;
        event.preventDefault();
      }
    }
  }

  function GameOver(){
    if(dumbbells.every(dumbbell => dumbbell.status === DUMBELLS_STATUS.INACTIVE)){
        alert("You win");
        restartGame();
    }
  }

  function restartGame(){
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    coordenatesDumbbells();
  }

function draw() {
    cleanCanvas();
    drawBall();
    ballMovement();
    drawDumbbells();
    collisionDumbbells();
    GameOver();
    window.requestAnimationFrame(draw);
}

initEvents();
coordenatesDumbbells();
draw();