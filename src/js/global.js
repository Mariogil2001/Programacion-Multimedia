var _Video = "Video";
var _Duracion = "Duracion";
var _Progress = "progress";

function CrearCardsAlimentacion(id, cartas) {
  let contenido = "";

  cartas.forEach((element) => {
    contenido += `<div class="card mb-3 carta"  >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${element.image}" class="img-fluid img-alimentacion" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">${element.title}</h1>
              <p class="card-text">${element.text}</p>
            </div>
          </div>
        </div>
      </div>`;
  });
  document.getElementById(id).innerHTML = contenido;
}

function CrearCardsmusica(id, cartasmusica)
{
  let contenido = "";
  let numero = 1;

  cartasmusica.forEach((element) => {
    contenido +=/*html */ `
    <div class="card mb-3 carta">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${element.image}" class="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-center align-items-center">
              <h1 class="card-title text-center">${element.title}</h1>
              <audio id="Cancion${numero}" src="${element.audio}" preload="auto"></audio>
              <div class="d-flex justify-content-center align-items-center mt-5">
                <button onclick="document.getElementById('Cancion${numero}').volume-=0.1" id="decreaseVolume" class="btn"><img src="../src/images/minus.svg" width="36"/></button>
                <button onclick="togglePlayPause('Cancion${numero}')" id="playPause${numero}" class="btn"><img id="playPauseImg${numero}" src="../src/images/play.svg" width="36"/></button>
                <button onclick="stopVideo('Cancion${numero}')" id="stop" class="btn"><img src="../src/images/stop.svg" width="36"/></button>
                <button onclick="document.getElementById('Cancion${numero}').volume+=0.1" id="increaseVolume" class="btn"><img src="../src/images/plus.svg" width="36"/></button>
            </div>
            <div class="card-text text-center">
            <progress id="progress${numero}" max="10" value="0"></progress>
            <p id="Duracion${numero}"></p>
            </div>
          </div>
        </div>
      </div>
  `;
    numero++;
  });
  document.getElementById(id).innerHTML = contenido;
  for (let i = 1; i <= cartasmusica.length; i++) {
    document.getElementById(`Cancion${i}`).addEventListener('loadeddata', function() {
      var progress = document.getElementById(`progress${i}`);
      var cancion = document.getElementById(`Cancion${i}`);
      if(isFinite(cancion.duration)){
        progress.max = cancion.duration;
        document.getElementById(`Duracion${i}`).innerHTML = Math.floor(cancion.duration) + ' segundos';
      }
    });
  
    document.getElementById(`Cancion${i}`).addEventListener('timeupdate', function() {
      var progress = document.getElementById(`progress${i}`);
      var cancion = document.getElementById(`Cancion${i}`);
      progress.value = cancion.currentTime;
      console.log(cancion.currentTime);
    }); 
  }
}

function CrearCardsvideo(id, cartasvideo){
  let contenido = "";
  let numero = 1;

  cartasvideo.forEach((element) => {
    contenido += /*html */`
    <div class="card mb-3 carta">
        <div class="row g-0">
          <div class="col-md-12">
            <div class="card-body">
              <h2 class="card-title">${element.title}</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="ratio ratio-16x9">
              <button onclick="togglePlayPause('Video${numero}')" id="playPause${numero}" class="btn ">
                <video id="Video${numero}" src="${element.video}" class=" video-boton" preload="auto"></video>
              </button>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">${element.text}</p>
              <p class="card-text text-center mt-5">
                <button onclick="document.getElementById('Video${numero}').playbackRate-=0.5" id="AvanzadoRapido" class="btn"><img src="../src/images/skipbackward.svg" width="24"/></button>
                <button onclick="document.getElementById('Video${numero}').volume-=0.1" id="decreaseVolume" class="btn"><img src="../src/images/minus.svg" width="36"/></button>
                <button onclick="togglePlayPause('Video${numero}')" id="playPause${numero}" class="btn"><img id="playPauseImg${numero}" src="../src/images/play.svg" width="36"/></button>
                <button onclick="stopVideo('Video${numero}')" id="stop" class="btn"><img src="../src/images/stop.svg" width="36"/></button>
                <button onclick="document.getElementById('Video${numero}').requestFullscreen()" id="fullscreen" class="btn"><img src="../src/images/fullscreen.svg" width="24"/></button>
                <button onclick="document.getElementById('Video${numero}').volume+=0.1" id="increaseVolume" class="btn"><img src="../src/images/plus.svg" width="36"/></button>
                <button onclick="document.getElementById('Video${numero}').playbackRate+=0.5" id="AvanzadoRapido" class="btn"><img src="../src/images/fastforward.svg" width="24"/></button>
                </p>
                <div class="card-text text-center">
                <progress id="progress${numero}" max="10" value="0"></progress>
                <p id="Duracion${numero}"></p>
                </div>
            </div>
          </div>
        </div>
      </div>
      
  `;
    numero++;
    
  });
  document.getElementById(id).innerHTML = contenido;
  
  for (let i = 1; i <= cartasvideo.length; i++) {
    document.getElementById(_Video+i).addEventListener('loadeddata', function() {
      var progress = document.getElementById(`progress${i}`);
      var video = document.getElementById(`Video${i}`);
      progress.max = video.duration;
      document.getElementById(`Duracion${i}`).innerHTML = Math.floor(video.duration) + ' segundos';
    });
  
    document.getElementById(`Video${i}`).addEventListener('timeupdate', function() {
      var progress = document.getElementById(`progress${i}`);
      var video = document.getElementById(`Video${i}`);
      progress.value = video.currentTime;
    }); 
  }
}

function togglePlayPause(mediaId) {
  const media = document.getElementById(mediaId);
  const playPauseImg = document.getElementById('playPauseImg' + mediaId.replace(/Video|Cancion/, ''));
  
  if (media.paused || media.ended) {
    media.play();
    playPauseImg.src = "../src/images/pause.svg";
  } else {
    media.pause();
    playPauseImg.src = "../src/images/play.svg";
  }
}

function stopVideo(videoId) {
  const video = document.getElementById(videoId);
  const playPauseImg = document.getElementById('playPauseImg' + videoId.replace(/Video|Cancion/, ''));
  
  video.pause();
  playPauseImg.src = "../src/images/play.svg"
  video.currentTime = 0;
}

