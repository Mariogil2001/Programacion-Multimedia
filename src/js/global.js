
function CrearCards(id,cartas){
    let contenido = '';

    cartas.forEach(element => {
        contenido+=`<div class="card mb-3 carta"  >
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
    document.getElementById(id).innerHTML=contenido;
}