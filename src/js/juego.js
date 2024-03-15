const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');


let BALL_RADIUS = 30;
let DUMBBELL_RADIUS = 20;
let NUM_DUMBBELLS = 10;
let SPEED = 10;

const $dumbbellImage = document.getElementById('dumbbell');
const $gymnastImage = document.getElementById('gymnast');
const $syringeImage = document.getElementById('syringe');

const DUMBELLS_STATUS = {
    ACTIVE: 1,
    INACTIVE: 0
}

let level = 1;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = SPEED;
let dy = SPEED;

// Ajusta el tamaño del canvas
canvas.width = 800;
canvas.height = 600;

canvas.style.width = canvas.offsetWidth + 'px';
canvas.style.height = canvas.offsetHeight + 'px';
// Escala el contexto del canvas para que coincida con el nuevo tamaño del canvas
ctx.scale(canvas.width / canvas.offsetWidth, canvas.height / canvas.offsetHeight);


let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let isGamePaused = false;


let dumbbells = [];
let syringes = [];

let actual_NUM_DUMBBELLS = NUM_DUMBBELLS;

let isMessageShown = false;
let messageText = '';


document.getElementById('gameSettings').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe, lo que recargaría la página
    BALL_RADIUS = parseInt(document.getElementById('ballRadius').value);
    DUMBBELL_RADIUS = parseInt(document.getElementById('dumbbellRadius').value);
    NUM_DUMBBELLS = parseInt(document.getElementById('numDumbbells').value);
    SPEED = parseInt(document.getElementById('speed').value);
    dx = SPEED; // Actualiza dx
    dy = SPEED; // Actualiza dy
    level = 1;
    actual_NUM_DUMBBELLS = NUM_DUMBBELLS; // Restablece el número de pesas a 10
    restartGame();
    isGamePaused = false; // Asegura que el juego no esté en pausa después de hacer submit
});

function drawDumbbells(){
  for(let i = 0; i < actual_NUM_DUMBBELLS; i++){ // Y también aquí
      if(dumbbells[i].status === DUMBELLS_STATUS.ACTIVE){
          ctx.drawImage($dumbbellImage, dumbbells[i].x, dumbbells[i].y, DUMBBELL_RADIUS * 2, DUMBBELL_RADIUS * 2);
      }
  }
}

function coordenatesDumbbells(){
  dumbbells = [];
  for(let i = 0; i < actual_NUM_DUMBBELLS; i++){ // Usa actual_NUM_DUMBBELLS aquí
      dumbbells[i] = {
          x: DUMBBELL_RADIUS * 2 + Math.random() * (canvas.width - DUMBBELL_RADIUS * 4), 
          y: DUMBBELL_RADIUS * 2 + Math.random() * (canvas.height - DUMBBELL_RADIUS * 4),
          status: DUMBELLS_STATUS.ACTIVE};
  }
}
function collisionDumbbells(){
  for(let i = 0; i < actual_NUM_DUMBBELLS; i++){
      const currentDumbbell = dumbbells[i];
      if(currentDumbbell.status === DUMBELLS_STATUS.INACTIVE) continue;
      const dx = x - currentDumbbell.x;
      const dy = y - currentDumbbell.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if(distance < BALL_RADIUS + DUMBBELL_RADIUS){
          currentDumbbell.status = DUMBELLS_STATUS.INACTIVE;
      }
  }
}


function generatesSyringes() {
  syringes = [];
  for(let i = 0; i < level - 1; i++){
      syringes[i] = {
          x: Math.random() * (canvas.width - BALL_RADIUS * 2) + BALL_RADIUS, 
          y: Math.random() * (canvas.height - BALL_RADIUS * 2) + BALL_RADIUS
      };
  }
}


function drawSyringe() {
    for(let i = 0; i < syringes.length; i++){
        ctx.drawImage($syringeImage, syringes[i].x, syringes[i].y, BALL_RADIUS * 2, BALL_RADIUS * 2);
    }
}

function checksyringeCollision() {
  for(let i = 0; i < syringes.length; i++){
      if(Math.sqrt((x - syringes[i].x) ** 2 + (y - syringes[i].y) ** 2) < BALL_RADIUS * 2){
          loseGame();
          break;
      }
  }
}

function drawGymnast(){
    ctx.drawImage($gymnastImage, x - BALL_RADIUS, y - BALL_RADIUS, BALL_RADIUS * 2, BALL_RADIUS * 2);
}

function gymnastMovement(){
    if(rightPressed && x < canvas.width - BALL_RADIUS * 2){
        x += dx;
    } else if(leftPressed && x > BALL_RADIUS * 2){
        x -= dx;
    } else if(upPressed && y > BALL_RADIUS * 2){
        y -= dy;
    } else if(downPressed && y < canvas.height - BALL_RADIUS * 2){
        y += dy;
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

function initEvents() {
    document.addEventListener('keydown', handleKeyEvent);
    document.addEventListener('keyup', handleKeyEvent);
}

function handleKeyEvent(event) {
  const { key } = event;
  const isKeyDown = event.type === 'keydown';
  switch (key) {
      case ' ':
          if (isGamePaused && isMessageShown) {
              hideMessage();
              isGamePaused = false;
          }
          break;
      case 'Right':
      case 'ArrowRight':
      case 'd':
      case 'D':
          rightPressed = isKeyDown && !isGamePaused;
          break;
      case 'Left':
      case 'ArrowLeft':
      case 'a':
      case 'A':
          leftPressed = isKeyDown && !isGamePaused;
          break;
      case 'Up':
      case 'ArrowUp':
      case 'w':
      case 'W':
          upPressed = isKeyDown && !isGamePaused;
          break;
      case 'Down':
      case 'ArrowDown':
      case 's':
      case 'S':
          downPressed = isKeyDown && !isGamePaused;
          break;
  }
  event.preventDefault();
}

canvas.addEventListener('click', function() {
  if (isMessageShown) {
      hideMessage();
      isGamePaused = false;
  }
});

function drawLevel() {
    ctx.font = '16px Verdana';
    ctx.fillStyle = '#0095DD';
    ctx.textAlign = 'left'; // Añade esta línea
    ctx.fillText('Nivel: ' + level, 8, 20); // Muestra el nivel actual
    ctx.fillText('Pesas restantes: ' + dumbbells.filter(dumbbell => dumbbell.status === DUMBELLS_STATUS.ACTIVE).length, 8, 40);
}

function showMessage(message) {
  isMessageShown = true;
  isGamePaused = true;
  messageText = message;
}
function hideMessage() {
  isMessageShown = false;
  messageText = '';
}

function drawMessage() {
    if (isMessageShown) {
        // Dibuja un rectángulo semi-transparente sobre todo el canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Define las propiedades del "botón"
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonX = (canvas.width - buttonWidth) / 2;
        let buttonY = (canvas.height - buttonHeight) / 2;

        // Dibuja el "botón"
        ctx.fillStyle = 'blue';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        // Dibuja el texto en el "botón"
        ctx.fillStyle = 'white';
        ctx.font = '24px Verdana';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(messageText, canvas.width / 2, canvas.height / 2);

        // Dibuja el texto "Pulse espacio para continuar" debajo del mensaje principal
        ctx.fillText("Pulse espacio para continuar", canvas.width / 2, canvas.height / 2 + 40);
    }
}
function winGame(){
  showMessage("Has ganado!!");
  level++;
  actual_NUM_DUMBBELLS = (level * NUM_DUMBBELLS)/2; // Incrementa el número de pesas en función del nivel
  restartGame();
}


function loseGame(){
  showMessage("Perdiste UnU");
  level = 1;
  actual_NUM_DUMBBELLS = NUM_DUMBBELLS; // Restablece el número de pesas a 10
  syringes = []; // Vacía el array de bolas rojas
  restartGame();
}

function restartGame(){
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    x = canvas.width / 2; // Cambia la posición del jugador al centro del canvas
    y = canvas.height / 2; // Cambia la posición del jugador al centro del canvas
    coordenatesDumbbells();
    generatesSyringes();
    isGamePaused = true;
}

function drawElements() {
    cleanCanvas();
    drawDumbbells();
    drawGymnast();
    drawSyringe();
    drawLevel();
}

function checkCollisions() {
    collisionDumbbells();
    checksyringeCollision();
}

function draw() {
  drawElements();
  checkCollisions();
  if(dumbbells.every(dumbbell => dumbbell.status === DUMBELLS_STATUS.INACTIVE)){
      winGame();
  }
  gymnastMovement();
  drawMessage();
  requestAnimationFrame(draw);
}
initEvents();
coordenatesDumbbells();
draw();