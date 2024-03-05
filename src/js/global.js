function CrearCardsAlimentacion(id, cartas) {
  let contenido = "";

  cartas.forEach((element) => {
    contenido += `<div class="card mb-3 carta"  >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${element.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
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
    contenido += `<div class="card mb-3 carta"  >
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${element.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text mt-5">
          <audio id="Cancion${numero}" src="${element.audio}" preload="auto"></audio>
          <button onclick="document.getElementById('Cancion${numero}').play()" id="play" class="btn">Play</button>
          <button onclick="document.getElementById('Cancion${numero}').pause()" id="pause" class="btn">Pausa</button>
          <button onclick="document.getElementById('Cancion${numero}').stop()" id="stop" class="btn">Stop</button>
          <button onclick="document.getElementById('Cancion${numero}').volume+=0.1" id="increaseVolume" class="btn">Increase Volumen</button>
          <button onclick="document.getElementById('Cancion${numero}').volume-=0.1" id="decreaseVolume" class="btn">Decrease Volumen</button>
          </p>
        </div>
      </div>
    </div>
  </div>`;
    numero++;
  });
  document.getElementById(id).innerHTML = contenido;
}

function CrearCardsvideo(id, cartasvideo){
  let contenido = "";
  let numero = 1;

  cartasvideo.forEach((element) => {
    contenido += `<div class="card mb-3 carta"  >
    <div class="row g-0">
      <div class="col-md-4">
      <div class="ratio ratio-16x9">
      <video id="Video${numero}" src="${element.video}" class="object-fit-contain " preload="auto" controls></video>
      </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text mt-5">
          <button onclick="document.getElementById('Video${numero}').play()" id="play" class="btn">Play</button>
          <button onclick="document.getElementById('Video${numero}').pause()" id="pause" class="btn">Pausa</button>
          <button onclick="document.getElementById('Video${numero}').stop()" id="stop" class="btn">Stop</button>
          <button onclick="document.getElementById('Video${numero}').volume+=0.1" id="increaseVolume" class="btn">Increase Volumen</button>
          <button onclick="document.getElementById('Video${numero}').volume-=0.1" id="decreaseVolume" class="btn">Decrease Volumen</button>
          <button onclick="document.getElementById('Video${numero}').requestFullscreen()" id="fullscreen" class="btn">Maximizar</button>
          <button onclick="document.getElementById('Video${numero}').playbackRate+=0.5" id="AvanzadoRapido" class="btn">Avanzado Rapido</button>
          <button onclick="document.getElementById('Video${numero}').playbackRate-=0.5" id="AvanzadoRapido" class="btn">Retroceder Rapido</button>
          </p>
        </div>
      </div>
    </div>
  </div>`;
    numero++;
  });
  document.getElementById(id).innerHTML = contenido;
}