//Javascript
             
function invokeScript(divid)
{
	var scriptObj = divid.getElementsByTagName("SCRIPT");
	var len = scriptObj.length;

	for(var i=0; i<len; i++)
	{
		var scriptText = scriptObj[i].text;
		var scriptFile = scriptObj[i].src
		var scriptTag = document.createElement("SCRIPT");
		
		if ((scriptFile != null) && (scriptFile != "")){
			scriptTag.src = scriptFile;
		}
		scriptTag.text = scriptText;
		if (!document.getElementsByTagName("HEAD")[0]) {
			document.createElement("HEAD").appendChild(scriptTag)
		}
		else {
			document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
		}
	}
}
                 
function nuevaConexion()
{
	var xmlhttp=false;

	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e)
	{
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E)
		{ 
			xmlhttp = false;
		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined')
	{ 
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp; 
}

var yacreado = false;
function Cargar(url, capa)
{
	var contenido = document.getElementById(capa);
	var conexion = nuevaConexion();

	conexion.open("GET", url,true);
	conexion.onreadystatechange=function()
	{ 
		if((conexion.readyState == 4) && (conexion.status == 200))
		{
			contenido.innerHTML = conexion.responseText;
			invokeScript(document.getElementById(capa));
			if(url == "./src/html/alimentacion.html" && yacreado == false){
				var script = document.createElement('script');
				script.src = "./src/js/animacion3D.js";
				script.type = 'module';
				document.head.appendChild(script);
				yacreado = true;
			}
		}
	} 
	conexion.send(null);
} 

function cargarUrls(urls) {
	urls.forEach(function(obj) {
	  Cargar(obj.url, obj.capa);
	});
  }

function CargarForm(url, capa, valores)
{
	var contenido = document.getElementById(capa);
	var conexion = nuevaConexion();

	conexion.open("POST", url,true);
	conexion.onreadystatechange=function()
	{ 
		if((conexion.readyState == 4) && (conexion.status == 200))
		{
			contenido.innerHTML = conexion.responseText;
			invokeScript(document.getElementById(capa));
		}
	} 
	conexion.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	conexion.send(valores);
} 

function ProcesarForm(formulario, url, capa)
{
	var valores="";

	for (var i=0; i<formulario.elements.length;i++)
	{
		var nombre = formulario.elements[i].name;

		if (nombre!="")
		{
			if (!((formulario.elements[i].type == "radio") && (!formulario.elements[i].checked)))
			{
				valores += formulario.elements[i].name + "=";
				valores += formulario.elements[i].value + "&";	
			}
		}
	}
	CargarForm(url,capa,valores);
}

function EnviarCarrito(url, capa, valores)
{
	var contenido = document.getElementById(capa);
	var conexion = nuevaConexion();

	conexion.open("POST", url,true);
	conexion.onreadystatechange=function()
	{ 
		if((conexion.readyState == 4) && (conexion.status == 200))
		{
			contenido.innerHTML = conexion.responseText;
			invokeScript(document.getElementById(capa));
		}
	} 
	conexion.setRequestHeader('Content-Type','application/json; charset=utf-8');
	conexion.send(JSON.stringify(valores));
}

function CrearCards(cartas){
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
    return contenido;
}