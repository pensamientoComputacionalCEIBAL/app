const api = new XMLHttpRequest ();

let urlCompleta, datosRecibidos, validadorConsulta;

let user = null; let pass = null;

const fechaActual = new Date();
const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', ];

let gruposCentro = [];
let centroSel = [];

$( document ).ready(function() {

// Página de inicio (index.html)
$( "#eIndex" ).click(function() { validarCamposIndex(); });
$( "#rIndex" ).click(function() { reiniciarInputsIndex(); });

//Página 'main.html' (al autenticarse)
$( "#buscarDocumentos" ).click(function() { buscarDocumentos(); });

// Página Consultas S.V.C
$( "#fruee" ).click(function() { cargarFiltroVisual(this); });
$( "#flocalidad" ).click(function() { cargarFiltroVisual(this); });
$( "#fdepartamento" ).click(function() { cargarFiltroVisual(this); });
$( "#fdocumentoda" ).click(function() { cargarFiltroVisual(this); });
$( "#fdocumentodr" ).click(function() { cargarFiltroVisual(this); });
$( "#fjurisdiccion" ).click(function() { cargarFiltroVisual(this); });
$( "#buscarCentrosAsociados" ).click(function() { buscarCentrosAsociados(); });

// Página Info. general de centros
$( "#frueeC" ).click(function() { cargarFiltroVisualCentros(this); });
$( "#fdepartamentoC" ).click(function() { cargarFiltroVisualCentros(this); });
$( "#fredglobalC" ).click(function() { cargarFiltroVisualCentros(this); });
$( "#fceilabC" ).click(function() { cargarFiltroVisualCentros(this); });
$( "#fcceI" ).click(function() { cargarFiltroVisualCentros(this); });
$( "#fcaT" ).click(function() { cargarFiltroVisualCentros(this); });
$( "#buscarCentrosAsociadosC" ).click(function() { buscarCentrosAsociadosC(); });

// Página contacto con escuelas 2021
$( "#buscarReportes2021" ).click(function() { buscarReportes2021(); });

// Página contacto con escuelas 2022
$( "#buscarReportes2022" ).click(function() { buscarReportes2022(); });


$("#user").keypress(function(e) {
var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13) { validarCamposIndex(); return false; } });

$("#pass").keypress(function(e) {
var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13) { validarCamposIndex(); return false; } });

$("#nombreDoc").keypress(function(e) {
var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13) { buscarDocumentos(); return false; } });

$("#valorfil").keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { buscarCentrosAsociados(); $("#valorfil").focus(); return false; } });

$("#valorfilC").keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { buscarCentrosAsociadosC(); $("#valorfilC").focus(); return false; } });

$("#valorIng").keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { buscarReportes2021(); $("#valorIng").focus(); return false; } });

$("#valorIng2022").keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { buscarReportes2022(); $("#valorIng2022").focus(); return false; } });
// Al 'Salir' del sistema

$( "#sSys" ).click(function() { salirSistema(); });

cargarPagina ();

});

// Mensajes.

let m1_Index = "<center><div class='alert alert-danger'role='alert'> ¡UPS! ¡No has completado todos los campos!</div></center>";
let m2_Index = "<center><div class='alert alert-danger'role='alert'> ¡UPS! ¡Parece que hay un problema de conexión!</div></center>";
let m3_Index = "<center><div class='alert alert-danger'role='alert'> ¡UPS! ¡Nombre de usuario y/o contraseña incorrecto/s!</div></center>";
let m1_Main = "<p class='h3 text-secondary'>¡Bienvenid@ " + sessionStorage.getItem('nombre') + "!</p>";
let m2_Main = "<i>Hoy es <strong>" + diasSemana [ fechaActual.getDay() ] + "</strong> del <strong>" +
fechaActual.toLocaleDateString() + "</strong>.</i>";
let m3_Main = "¡No hay mensajes pendientes!";
let m1_SVC = "<center><div class='alert alert-danger m-2'role='alert'> ¡UPS! ¡No hay resultados para la consulta!</div></center>";

// Funciones generales de la APP.

function cargarPagina () {
  let paginaActualCompleta = jQuery(location).attr('href');
  let paginaActual = paginaActualCompleta.slice(
  paginaActualCompleta.lastIndexOf("/") + 1, paginaActualCompleta.length);

  if (paginaActual.indexOf("#") != -1 ) { paginaActual = paginaActual.slice(0,paginaActual.indexOf("#")); }
  if (paginaActual != "index.html") { validarSession (); }
  menuNavegacion (paginaActual);  
  switch (paginaActual) {
    case "index.html":
      registrarSW ();
      $("input[type='text']").focus();
    break;
    case "main.html":
      construirMensajeBienvenida();
      $("#usuario").html(m1_Main);
      $("#avatar").attr("src", sessionStorage.getItem('urlImagen'));
      $("#fecha").html(m2_Main);
      $("input[type='text']").focus();
      getDatos("Main");
    break;
    case "svc.html":
      getDatos("SVC");
      $("#valorfil").focus();
    break;
    case "info_territorio.html":
      getDatos("info_territorio");
    break;
    case "info_centros.html":
      getDatos("info_centros");
    break;
    case "contacto_escuelas2021.html":
      getDatos("contacto_escuelas2021");
      $("#valorIng").focus();
    break;
    case "contacto_escuelas2022.html":
      getDatos("contacto_escuelas2022");
      $("#valorIng2022").focus();
    break;    
  }  }

function validarSession () {
  if (sessionStorage.getItem('nombre') == null ||
  sessionStorage.getItem('nombre') == 'null') {
    window.open("index.html","_self"); }  }

function registrarSW () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./94kfd34dsla.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW', err)) }  }

function errorSys(objeto,mensaje) {
  $(objeto).hide();
  $(objeto).html(mensaje);
  $(objeto).fadeIn(); }

function copiarA(val) { navigator.clipboard.writeText(val.innerText); }

function salirSistema () {
  sessionStorage.setItem('nombre', null);
  sessionStorage.setItem('urlImagen', null);
  sessionStorage.setItem('centro', null); }

function construirMensajeBienvenida () {
  if (sessionStorage.getItem('nombre') == "ghost") {
  m1_Main = "<p class='h3 text-secondary'>¡Bienvenid@ usuario administrador!</p>"; }
  }

function getDatos (pagina) {
  let apiKey = 'AIzaSyAVvMA2r0J3skLgWq2g0JX6facQN9BXsXM';
  let idSheets = null; let rangoSheets = null;
  
  switch(pagina) {
    case "Index":
      hashwasm.md5($('#user').val()).then(function(response){ user = response; });
      hashwasm.md5($('#pass').val()).then(function(response){ pass = response; }); 
      idSheets = "1uu4nCUKc5ArODeIv5NOOfMgR3Qd-YhYckGcGLlXv_ik";
      rangoSheets = "A:D";
    break;
    case "Main":
      idSheets = "1kXcitsVB06G-hv_2d2qdBCZWKn5U3yGCNUD-dwgUvRw";
      rangoSheets="A:A";
    break;
    case "Main_documentos":
      idSheets = "1wJAU-PQ0Ydvr_Vi2n7ricKATk8S5HCkSqJyYazteCLo";
      rangoSheets="A:B";
      $("#buscarDocumentos").addClass("disabled");
      $("#buscarDocumentos").text('Procesando...');      
    break;
    case "SVC":
      idSheets="1BmAUS7ePdEU0TKiZg_-0t2JH8kSr4FK9exik-BfP_QM";
      rangoSheets="A:AK";
      $("#buscarCentrosAsociados").addClass("disabled");
      $("#buscarCentrosAsociados").text('Procesando...');
    break;
    case "info_territorio":
      idSheets="1XS1ngb5eknIeXnfPsSHe5Hnk7XY5LcqQ1oD1DDjPHk0";
      rangoSheets="A:G";
    break;
    case "info_centros":
      //idSheets="1-8KpueE6kIuE6fsFPdy06Ui4AhLqf2EiPcbbPVzudcE";
      //rangoSheets="A:N";
      idSheets="1YOc1Zm99euNFMZs3Z7kpVogDxvgSkPziMuI7CKgUdbM";
      rangoSheets="A:Q";
      $("#buscarCentrosAsociadosC").addClass("disabled");
      $("#buscarCentrosAsociadosC").text('Procesando...');
    break;
    case "contacto_escuelas2021":
      idSheets="1kkFvGx51E2nypwDfdJqKYFgwsbFvPPAKSpzWdRw5Z-s";
      rangoSheets="A:GH";
      $("#buscarReportes2021").addClass("disabled");
      $("#buscarReportes2021").text('Procesando...');      
    break;
    case "contacto_escuelas2022":
      idSheets="1yEHgie4TwIQ8hhJDPs-XVhuUfcLkAZDLidMSCO88PFE";
      rangoSheets="A:GF";
      $("#buscarReportes2022").addClass("disabled");
      $("#buscarReportes2022").text('Procesando...');      
    break;    
  }

  urlCompleta = "https://content-sheets.googleapis.com/v4/spreadsheets/" + 
  idSheets + "/values/" + rangoSheets + "?access_token="+ apiKey +"&key="+ apiKey;
  api.open('GET',urlCompleta,true);
  api.send();

  api.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      datosRecibidos = JSON.parse (this.responseText);
      switch(pagina) {
        case "Index": loginIndex(datosRecibidos); break;
        case "Main": cargarMensaje(datosRecibidos); break;
        case "Main_documentos":
          $("#buscarDocumentos").text('Buscar');
          $("#buscarDocumentos").removeClass("disabled");          
          cargarInputsDocumentos (datosRecibidos);
        break;
        case "SVC": 
          $("#buscarCentrosAsociados").text('Buscar');
          $("#buscarCentrosAsociados").removeClass("disabled");
          cargarInputs(datosRecibidos); 
        break;
        case "info_territorio": cargarInfoTerritorio(datosRecibidos); break;
        case "info_centros":
          $("#buscarCentrosAsociadosC").text('Buscar');
          $("#buscarCentrosAsociadosC").removeClass("disabled");
          cargarInputsC (datosRecibidos);
        break;
        case "contacto_escuelas2021":
          $("#buscarReportes2021").text('Buscar');
          $("#buscarReportes2021").removeClass("disabled");
          cargarInputs2021 (datosRecibidos);
        break;
        case "contacto_escuelas2022":
          $("#buscarReportes2022").text('Buscar');
          $("#buscarReportes2022").removeClass("disabled");
          cargarInputs2022 (datosRecibidos);
        break;        
      }
    }

  }  }

function validarDatosRecibidos (datosRecibidos) {
  if (datosRecibidos == undefined || datosRecibidos.values.length < 1) {
    errorSys("#error", m2_Index); 
    return true; }
  else { return false; }  }

function menuNavegacion (p) {
  let cadena = "";
  cadena += '<nav class="navbar navbar-expand-lg navbar-light bg-light">';
  cadena += '<div class="container-fluid">';
  cadena += '<a class="navbar-brand" href="#">Menú</a>';
  cadena += '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
  cadena += '<span class="navbar-toggler-icon"></span></button>';
  cadena += '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
  cadena += '<ul class="navbar-nav me-auto mb-2 mb-lg-0">';

  cadena += '<li class="nav-item">';
  if (p == 'main.html') {
    cadena += '<a class="nav-link active fw-bolder" aria-current="page" href="main.html">Home</a></li>'; }
  else { cadena += '<a class="nav-link" aria-current="page" href="main.html">Home</a></li>'; }

  cadena += '<li class="nav-item">';
  if (p == 'svc.html') {
    cadena += '<a class="nav-link active fw-bolder" href="svc.html">Consultas S.V.C</a></li>'; }
  else { cadena += '<a class="nav-link" href="svc.html">Consultas S.V.C</a></li>'; }

  cadena += '<li class="nav-item dropdown">';
  cadena += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Registros de formularios</a>';
  cadena += '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
  if (p == 'enlaces_formularios.html') {
    cadena += '<li><a class="dropdown-item active fw-bolder" href="enlaces_formularios.html">¡Enlaces a formularios!</a></li>'; }
  else { cadena += '<li><a class="dropdown-item" href="enlaces_formularios.html">¡Enlaces a formularios!</a></li>'; }
  cadena += '<li><hr class="dropdown-divider"></li>';
  cadena += '<li><a class="dropdown-item" href="contacto_escuelas2022.html">Buscar contacto con escuelas</a></li>';
  cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1aCuJQlntiWBea2kuTHFOOO1RYWamXBg0yZxgBfXGRlU/edit?usp=sharing">Buscar contacto cen. priv. y ed. media</a></li>';  
  if (sessionStorage.getItem('nombre') == "ghost") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1STYY3S_qGXaG6jlteO8klAKizyFH9zzZNUy6pBRiU68/edit?usp=sharing">Planilla de información TOTAL</a></li>'; 
    cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1PCARLqz5yctNAP9r7h9cqMmavNMIOEhV-q_RMEWQvuk/edit?usp=sharing">Equipos de territorio 2022 (DGEIP)</a></li>';
    cadena += '<li><hr class="dropdown-divider"></li>';
    cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1H3WzhXfHnZS6eV9yMzdLvsAu7LSuXb3C0rwYVYTq9eQ/edit?usp=sharing">Planilla de estadísticas PC 2022</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1EgKgLQ8Yr8Hvk1b5L6ES8DwDDVLUZmKBRDWRd7fd7zA/edit?usp=sharing">Planilla DRs reportados (esp.)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/19qg2RUIAcjE1No5aP3kbtDYZpEeveMw_ODjDDKociwo/edit?usp=sharing">Planilla de prob. con equipos (21/22)</a></li>';
    
    cadena += '<li><hr class="dropdown-divider"></li>';
    cadena += '<li><a target="_blank" class="dropdown-item" href="https://drive.google.com/drive/folders/1gJBUKVne-1iqbRMp6AehKTWx9AKwrSRc?usp=sharing">Planillas comp. con DCTDs (carpeta)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item" href="https://drive.google.com/drive/folders/1h-nOqS4rSF_wbg57leDrujuzWWKgdusw?usp=sharing">Planillas comp. DRs report. (carpeta)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Fernando Sabaño") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1_oF5vqvgaaq4-CwFQcgk5z3UHDi_O4o13ZI6A9tlacw/edit?usp=sharing">Planilla de Fernando</a></li>'; 
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/18rFyDvmtTYN0DyqR-XcA2oIuCZBqOFU5o4fjqwdCLKY/edit?usp=sharing">Planilla de DCTD (Paysandú)</a></li>'; 
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1uHxICTh1xNzeAsCLOwMbByXXAemHESCWgpPI_oDcfAE/edit?usp=sharing">Planilla de DCTD (Salto)</a></li>'; 
  }
  else if (sessionStorage.getItem('nombre') == "Irina Rodriguez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/15kz31xv6drDYK1HIea62VDoHEzBjL5eU4Tg3yt2mH1o/edit?usp=sharing">Planilla de Irina</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1orJc-J7Xq2PkTjUpBtqGecUnR15puSJFSv7qdwZq9kI/edit?usp=sharing">Planilla de DCTD (Montevideo Centro)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1-ikb3Ppm20B-KaEaShNi9nh0LjsYru2JMpeWjpp1Y-Y/edit?usp=sharing">Planilla de DCTD (Montevideo Este)</a></li>';
  }  
  else if (sessionStorage.getItem('nombre') == "Tatiana Gilles") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1bdWyjx4Y7kScKbax4I9lrMo8sZm8rFY7TZZpSDHAAg4/edit?usp=sharing">Planilla de Tatiana</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1NMerXT5JKJAsWgIMebcmsHlopahVAxuz_6iMv22mPkw/edit?usp=sharing">Planilla de DCTD (Maldonado)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1DhBRa_FkSMaJ024Mkt5Fq4v8po1f-lolTe5R86MOvgs/edit?usp=sharing">Planilla de DCTD (Rocha)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1VBSe9Z_0H909OcfMBkwEepQyDzytGPAmYFDvlAoCezc/edit?usp=sharing">Planilla de DCTD (Lavalleja)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Lucia Crivelli") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1lUUBxmjapyzJg7rqalwx24IuWymLsWG7A8qetnqthg4/edit?usp=sharing">Planilla de Lucia (chik TNU)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1LXMzMxVzudr-gUV2Mp0xtKJziOADmroV6OETB597D8w/edit?usp=sharing">Planilla de DCTD (Canelones Costa)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1-ikb3Ppm20B-KaEaShNi9nh0LjsYru2JMpeWjpp1Y-Y/edit?usp=sharing">Planilla de DCTD (Montevideo Este)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Lourdes Vidal") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/177JMi8vq1QQQQ4kvKwwgORUp6XfGeXmUA3gcSoIXDvA/edit?usp=sharing">Planilla de Lourdes</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1pGg8wp2hmMOe6tS-LNmWZXRPpzTncxvIviWWubeuyP8/edit?usp=sharing">Planilla de DCTD (Flores)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/13tkb2X4k7z-fRp77YJCC6fwCmyVkuRy5MUz8k3uAtDg/edit?usp=sharing">Planilla de DCTD (Florida)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Evelyn Nuñez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/16fjO3If6ezSl4eC3YGDhiJlVB_jgmVVokJqAIqugdqY/edit?usp=sharing">Planilla de Evelyn</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1azkAIZbP7AnxKryXzcoLDWFy6U4eW9hcvO6nwoUQywI/edit?usp=sharing">Planilla de DCTD (Montevideo Oeste)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Giovanna Kaiser") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/176vqohGUu3-bN3StvfoErn_MA_GAy2BbY3t8OZ2fW24/edit?usp=sharing">Planilla de Giovanna</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/11JJvAOPjxB29ibSNC3Whw-UG0iKK-cEXwv6dDfiJ7-0/edit?usp=sharing">Planilla de DCTD (Artigas)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1PEn4YDEUiljTG5QPJOPEm0K_eDvAKX5rxlL0pYR_x4w/edit?usp=sharing">Planilla de DCTD (Tacuarembó)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Magela Araujo") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1RYrCKs3F7qwMDWOp5A34jd2BoAbHCUWtHfcmjgOM5jA/edit?usp=sharing">Planilla de Magela</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1shKFT8xJ6QQUr1_bZbgw4Z27hKiKuCfu-84VtcZbGZQ/edit?usp=sharing">Planilla de DCTD (Cerro Largo)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1eVzJ2Qn-4V_EpwI1DnMIa6UW5pTRN-UasiBvmzovEB0/edit?usp=sharing">Planilla de DCTD (Durazno)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/18xUUOfWtXzitwoMszbUA1XXi7wtqtSmeCg7Pzv2GUvE/edit?usp=sharing">Planilla de DCTD (Treinta y Tres)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Martin Martinez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/12eQC74OHVENNhDUw2YxNcJ6tJPfPJGKkqh5dGTi6L0I/edit?usp=sharing">Planilla de Martin <i>el fasha</i> Martinez</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1Y2YY0fofy2-4EZmThhElj4GNUpU1Fu85twLB_OZ8r1A/edit?usp=sharing">Planilla de DCTD (Río Negro)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1PsWocEcBp8tG_FD71kx7yW8-hbJN3unKT4NBFlctqV4/edit?usp=sharing">Planilla de DCTD (Soriano)</a></li>';
  }  
  else if (sessionStorage.getItem('nombre') == "Monica Gonzalez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1tslPET0Dwp8G732jEx5QBcLWYTJbmO_ayyHuo-UQAtA/edit?usp=sharing">Planilla de Monica</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1AFS-twV3ylVDpjvPW2SsWRZeyujKLbzTfcmaMHbAW5E/edit?usp=sharing">Planilla de DCTD (Canelones Centro)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1UkulhifK0HnCzybhIrrcc8pwtAYRHUyrvdANMpKIWDA/edit?usp=sharing">Planilla de DCTD (Canelones Oeste)</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Santiago Olivera") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1JhTMdySqX2rwfh2L-_lI9Dqq2LNFMAsDnwSBdKLs6bw/edit?usp=sharing">Planilla de Santiago</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1JThcrUK9mlpHLcti5FYzz6tYKHn4Xu3tnylb0YQFk_Q/edit?usp=sharing">Planilla de DCTD (San José)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1M28OAZOFre3H-f6uQAQrcTjV1oCBYG0HSvO1epqW7L0/edit?usp=sharing">Planilla de DCTD (Colonia)</a></li>';
  } 
  else if (sessionStorage.getItem('nombre') == "Silvana Salvador") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1y9BYrEq1CmQKrYnckx8jgt-L5AWfbMJH3DggGztQE7U/edit?usp=sharing">Planilla de Silvana</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1wI_OkVXjTXRcE65mslpQ6L6HkmYu5tByfcS9_hR3IWA/edit?usp=sharing">Planilla de DCTD (Rivera)</a></li>';
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1uHxICTh1xNzeAsCLOwMbByXXAemHESCWgpPI_oDcfAE/edit?usp=sharing">Planilla de DCTD (Salto)</a></li>';
  }
  cadena += '<li><hr class="dropdown-divider"></li>';
  cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1A1IOeV9LdKIYS0eGyGmPzeMK1a-b_mXOSWWME2MtbXQ/edit?usp=sharing">¡Alertas registradas!</a></li></ul>';
    

  cadena += '<li class="nav-item dropdown">';
  cadena += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Info. de territorio</a>';
  cadena += '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
  if (p == 'info_territorio.html') {
    cadena += '<li><a class="dropdown-item active fw-bolder" href="info_territorio.html">Info. general de territorio</a></li>'; }
  else { cadena += '<li><a class="dropdown-item" href="info_territorio.html">Info. general de territorio</a></li>'; }
  if (p == 'info_centros.html') {
    cadena += '<li><a class="dropdown-item active fw-bolder" href="info_centros.html">Info. general de centros</a></li>';
  }
  else { cadena += '<li><a class="dropdown-item" href="info_centros.html">Info. general de centros</a></li>'; }
  cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1cgwX9TR1RUMZZRN6pFN5KHqTyQp6ls9c2noc-uYSZKA/edit?usp=sharing">Centros PC 2022 (asig.)</a></li>';
  cadena += '<li><hr class="dropdown-divider"></li>';
  cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1AjYu5mRAOTnpxnQhxM4s-8wwwMHTS78R0rgjUT2-Lgc/edit?usp=sharing">Altas y bajas en S.V.C</a></li>';
  cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/1Q0MAXorXT5HPmV3IdLTwV9VXHIY2eJgcliYbntsLCww/edit?usp=sharing">DRs (datos y coordinadores)</a></li>';
  cadena += '<li><a target="_blank" class="dropdown-item" href="https://docs.google.com/spreadsheets/d/16Ny7nOUcbhT0CNPEWUjiU_iXfOHlSMTf-kp_Op0EBhI/edit?usp=sharing">Clases canceladas (PC)</a></li>';
  cadena += '<li><hr class="dropdown-divider"></li>';
  if (sessionStorage.getItem('nombre') == "Evelyn Nuñez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1cF6OUcBVEfLylRcRas8T1zjzIljm-7Hag-XlZ9Dr-rQ/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Fernando Sabaño") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1we54xQlaNvVN1YW_B-ng75RP_Kr3AeMyyMVDnmbT53s/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Giovanna Kaiser") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1H4dhn9zdwyOhUO0M74QhpGW8j_IwbQfODbnff1bAwGw/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Irina Rodriguez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1dERW6V0xcOXAEHlYZiU7P_0QEAMPaFU2xSWBb9wCUk0/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Lucia Crivelli") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1ImpSewifHQjyCgOQKQL9GZ2Y6SHbUYal9aMUUPtiOfo/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Lourdes Vidal") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1D3OwI8W6NMBZHw3_ZJjAhFodY415kJPiGBhTXyi8D5c/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Magela Araujo") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1_Yt3NzC4snHVM9tDTYT_Yt52hKhEJ1a84Y8GgGlK-w0/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Monica Gonzalez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1MrAQkOJXa_EVbHJ46SJbyor8gyNg8_rMK5LGXb5n77k/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Martin Martinez") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1HmPIpQzX16Hyh6kX22VgU7GCTIx93vIFhEdfWAOQym4/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Santiago Olivera") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/104-xvHf4Jetf4m3K80CdDHR-g4Y6Y0gTX719_-Uf-lk/edit?usp=sharing">Datos de territorio</a></li>';
  } 
  else if (sessionStorage.getItem('nombre') == "Silvana Salvador") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1W4zzigGLDTw6rxa1KJ4ntcg7AVERQey3s9fVnx7j2Sc/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "Tatiana Gilles") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/12_Ul32Og6OkPMkwgZ2ScOdosz2pbvLO13DtNk5128Qs/edit?usp=sharing">Datos de territorio</a></li>';
  }
  else if (sessionStorage.getItem('nombre') == "ghost") {
    cadena += '<li><a target="_blank" class="dropdown-item fw-bolder" href="https://docs.google.com/spreadsheets/d/1X7ZoCDHrXE6nu_-Xr4oZO6Vr-Zvls7sz-kzzzwvrqGY/edit?usp=sharing">Datos de territorio</a></li>';
  }
  cadena += '<li><hr class="dropdown-divider"></li>';
  
  if (p == 'contacto_escuelas2021.html') {
    cadena += '<li><a class="dropdown-item active fw-bolder" href="contacto_escuelas2021.html">Contacto con escuelas 2021</a></li>'; }
  else { cadena += '<li><a class="dropdown-item" href="contacto_escuelas2021.html">Contacto con escuelas 2021</a></li>'; }

  if (p == 'certificadospc.html') {
    cadena += '<li><a class="dropdown-item active fw-bolder" href="certificadospc.html">Certificados PC (2020 en adelante)</a></li>'; }
  else { cadena += '<li><a class="dropdown-item" href="certificadospc.html">Certificados PC (2020 en adelante)</a></li>'; }
  cadena += '</ul></li>';
  
  if (p == 'enlaces.html') {
    cadena += '<li class="nav-item"><a class="nav-link active fw-bolder" href="enlaces.html">Enlaces útiles</a></li>'; }
  else { cadena += '<li class="nav-item"><a class="nav-link" href="enlaces.html">Enlaces útiles</a></li>'; }
  
  cadena += '<li class="nav-item"><a class="nav-link" href="index.html" id="sSys">SALIR</a></li>';
  
  cadena += '<li class="nav-item"><a target="_blank" class="nav-link" href="Manual PWA 2022.pdf">?</a></li>';

  cadena += '</ul></div></div></nav>';
    
  $( "#menuNavegacion" ).html(cadena);

  }

// Página Index.

function loginIndex(datosRecibidos) {
  if (datosRecibidos == undefined || datosRecibidos.values.length <= 1) {
    errorSys("#error", m2_Index);
    $("#user").focus(); }
  else {
    let i = datosRecibidos.values.length - 1;
    while (i >= 0) {
      if (datosRecibidos.values[i][0] == user && datosRecibidos.values[i][1] == pass) {
        sessionStorage.setItem('nombre', datosRecibidos.values[i][2]);
        sessionStorage.setItem('urlImagen', datosRecibidos.values[i][3]);
        window.open("main.html","_self")
        return; }
    i--; }
    errorSys("#error", m3_Index); }  }

function validarCamposIndex() {
  if ($('#user').val() != '' && $('#pass').val() != '' ) { getDatos ("Index"); }
  else { 
    errorSys("#error", m1_Index);
    $("#user").focus(); }  }

function reiniciarInputsIndex () {
  $('#error').html('');
  $('input').val('');
  $("#user").focus();  }

// Página Main.

function cargarMensaje (datosRecibidos) {
  if (datosRecibidos == undefined || datosRecibidos.values.length <= 1) {
    errorSys("#mensajeGestion", m3_Main); }
  else {
    $("#mensajeGestion").html("<div class='h6'>" +
    datosRecibidos.values [1][0]) + "</div>"; 
    getDatos("Main_documentos"); }  }

function cargarInputsDocumentos (datosRecibidos) {
  let valores = [];
  if (validarDatosRecibidos (datosRecibidos) ) { $("#nombreDoc").focus(); }
  else {
    let i = datosRecibidos.values.length - 1;
    while (i > 0) {
      if (valores.indexOf(datosRecibidos.values [i][0])== -1) { 
        valores.push(datosRecibidos.values [i][0]); }
      i--; 
    }
  }
  valores.sort();
  $("#nombreDoc").autocomplete({ source: valores });  }

function buscarDocumentos () {
  $( "#error" ).html("");
  $( "#resultados" ).html("");
  if ( validarValor_nombreDoc () ) {
    let cadena = "";
    if ( !validarDatosRecibidos (datosRecibidos) ) {
      let i = datosRecibidos.values.length - 1;
      while (i > 0) {
        if (datosRecibidos.values [i][0].includes( $("#nombreDoc").val() )) {
          cadena = cadena + "<a class='btn btn-outline-secondary m-2' href='" + 
          datosRecibidos.values [i][1] + "' target='_blank' role='button'>" + datosRecibidos.values [i][0] + "</a>"; }  
      i--; }
    }
    if (cadena != "") { $( "#resultados" ).html(cadena); }
    else { errorSys("#error",m1_SVC); }
  }
  else { errorSys("#error",m1_SVC); }  
  $("#nombreDoc").focus();  }

function validarValor_nombreDoc () {
  if ( $("#nombreDoc").val() != null
  && $("#nombreDoc").val() != undefined
  && $("#nombreDoc").val() != "") { return true; }
  return false;  }

// Página S.V.C.

function cargarFiltroVisual(itemSel) {
  switch (itemSel.getAttribute("id")) {
    case "fruee": $("#valorfil").attr("placeholder","RUEE (NNNNCCC)"); break;
    case "flocalidad": $("#valorfil").attr("placeholder","Localidad (Ej.Quebracho)"); break;
    case "fdepartamento": $("#valorfil").attr("placeholder","Departamento (Ej. Rocha)"); break;
    case "fdocumentoda": $("#valorfil").attr("placeholder","Doc. DA (Ej. 47259101)"); break;
    case "fdocumentodr": $("#valorfil").attr("placeholder","Doc. DR (Ej. rt58936592)"); break;
    case "fjurisdiccion": $("#valorfil").attr("placeholder","Jurisdicción (Ej. Canelones Costa)"); break;
  }
  cargarInputs(datosRecibidos);
  $("#valorfil").val("");
  $("#valorfil").focus();  }

function determinarATR () {
  switch ($("#valorfil").attr("placeholder")) {
  case "RUEE (NNNNCCC)": return 0;
  case "Localidad (Ej.Quebracho)": return 3;
  case "Departamento (Ej. Rocha)": return 2;
  case "Doc. DA (Ej. 47259101)": return 11;
  case "Doc. DR (Ej. rt58936592)": return 25;
  case "Jurisdicción (Ej. Canelones Costa)": return 36; 
  return 0; }  }

function reiniciarElementosVisuales (val) {
  $( "#error" ).html("");
  switch (val) {
    case 1: $( "#resultados_c" ).html("");
    case 2: $( "#resultados_g" ).html("");
    case 3: $( "#resultados_i" ).html("");
  }  }

function cargarInputs(datosRecibidos) {
  let valores = [];
  if (validarDatosRecibidos (datosRecibidos) ) { $("#valorfil").focus(); }
  else {
    let atr = determinarATR ();
    let i = datosRecibidos.values.length - 1;
    while (i > 0) {
      if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][26] ||
      sessionStorage.getItem('nombre') == "ghost") {
        if (valores.indexOf(datosRecibidos.values [i][atr])== -1) { valores.push(datosRecibidos.values [i][atr]); }
      }
      i--; 
    }
  }
  $( "#valorfil" ).autocomplete({ source: valores });  }

function buscarCentrosAsociados() {
  reiniciarElementosVisuales (1);
  if ( validarValorFil () ) {
    if ( !validarDatosRecibidos (datosRecibidos) ) {
      let valores = []; gruposCentro = []; 
      let atr = determinarATR ();
      let i = datosRecibidos.values.length - 1;
      let cadena = null;
      while (i > 0) {
        if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][26] ||
        sessionStorage.getItem('nombre') == "ghost") {
          if (datosRecibidos.values [i][atr].includes( $("#valorfil").val() )) {
            cadena = "<a class='btn btn-outline-secondary m-2' id='" +
            datosRecibidos.values [i][0] + "' onclick='cargarGrupos(" + 
            datosRecibidos.values [i][0] + ")' href='#resultados_g' role='button'>" +
            datosRecibidos.values [i][0] + "</a>";
            if (valores.indexOf(cadena)==-1) { valores.push(cadena); }
          gruposCentro.push(datosRecibidos.values [i]); } 
        }
        i--; 
      }
      if (valores.length > 0) {
        valores.sort();
        valores.forEach(e => $( "#resultados_c" ).html( $( "#resultados_c" ).html() + e ));
      }
      else { errorSys("#error",m1_SVC); }
    }
  }
  else { errorSys("#error",m1_SVC); }
  $("#valorfil").focus();  }

function validarValorFil () {
  if ( $("#valorfil").val() != null
  && $("#valorfil").val() != undefined
  && $("#valorfil").val() != "") { return true; }
  return false;  }

function cargarGrupos (rueeID) {
  reiniciarElementosVisuales (2);
  gruposCentro.sort((a, b) => ( a[9] + a[8]) - (b[9] + b[8]) );
  gruposCentro.forEach( e => {
    let cadena = null; let valor = null;
    if (rueeID.toString() == e [0]) {
      cadena = "<a class='btn btn-outline-success m-2' id='" +
      e [0] + e [8] + e[9] + "' onclick='cargarInfo(this)' " +
      " href='#resultados_i' role='button'>" +
      e [8] + e[9] + "</a>";
      $( "#resultados_g" ).html( $( "#resultados_g" ).html() + cadena )
    } 
  }); }

function cargarInfo (rueeGID) {
  reiniciarElementosVisuales (3);
  gruposCentro.forEach( e => {
    let cadena = null; let datosContacto = "";
    if (rueeGID.getAttribute('id') == e[0] + e [8] + e[9]) {
      let referente = ""; let referente_a = "";
      let correoElectronico = ""; let celularContacto = "";
      let correoElectronico_DR = ""; let docenteRemoto = "";
      if (e [26] == "") { referente = "no asignado"; }
      else { referente = e [26]; }
      if (e [28] == "") { referente_a = "¡sin información!"; }
      else { referente_a = e [28]; }
      if (e [14] == "") { correoElectronico = "¡sin información!"; }
      else { correoElectronico = e [14]; }
      if (e [15] == "") { celularContacto = "¡sin información!"; }
      else { celularContacto = "0" + e [15]; }
      if (e [24] == "") { correoElectronico_DR = "¡sin información!"; }
      else { correoElectronico_DR = e [24]; }
      if (e [22] == "") { docenteRemoto = "¡sin información!"; }
      else { docenteRemoto = e [22] + " " + e [23] + " (" + e [25] + "), "; }      
  
      if (correoElectronico != "¡sin información!") {
        datosContacto = "<a class='btn btn-outline-dark text-start m-2'" +
        "role='button' onclick='copiarA(this)'>" + correoElectronico + "</a>"; }
      if (correoElectronico_DR != "¡sin información!") {
        datosContacto += "<a class='btn btn-outline-dark text-start m-2'" +
        "role='button' onclick='copiarA(this)'>" + correoElectronico_DR + "</a>"; }        
      if (celularContacto != "¡sin información!") {
        datosContacto += "<a class='btn btn-outline-dark text-start m-2'" +
        "role='button' href='tel:" + celularContacto +"'>" +
        "Llamar a: " + celularContacto + "(DA)</a>"; }

      cadena = "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='abrirDatosDelCentro(" + e [0] + ")'>" +
      "<b>Información del centro: </b>" + e [0] + " (" + "<b>ID N°</b> " + e [1]  + ")<br>" +
      "Departamento: " + e [2] + ", " + e [3] + "<br>" + e [4]  + " N° " + e [5] + " " + e [34] +
      "<br><span style='font-size: 20px; font-weight:bold;'>" + "Jurisdicción: " + e [36] + "</span>" +
      "<br><span style='font-size: 24px; font-weight:bold;'> Grupo " + e [8] + e [9] + " " + e [7] + "</span></a>" + 
      "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<b>Docente de aula: </b>" + e [12] + " " + e [13] + " (" + e [11] + "), " + "<br>Correo electrónico (DA): " + correoElectronico + "<br>Contacto tel. / celular: " + celularContacto + 
      "<br><b>Proveedor</b>: " + e [19] +
      "<br><b>Docente remoto: </b>" + docenteRemoto + "<br>Correo electrónico (DR): " + correoElectronico_DR +
      "</a><br>" + datosContacto + "<br>" +
      "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<b>Información de clases de Pensamiento Computacional</b><br>" +
      "Referente actual: " + referente + "<br>" +
      "Referente anterior: " + referente_a + "<br>" +
      "Coordinado para los días: " + e [30] + "<br>" +
      "A la hora: " + e [31] + "<br>" +
      "Desde la fecha: " + e [33] + "</a>";
      $( "#resultados_i" ).html(cadena);
      return;
    }
  });  }

function abrirDatosDelCentro (x) {
  sessionStorage.setItem('centro', x);
  window.open("info_centros.html","_self");
}

// Página Info. general de territorio

function cargarInfoTerritorio (datosRecibidos) {
  if (datosRecibidos == undefined || datosRecibidos.values.length <= 1 ) {
      errorSys("#a", m2_Index);
      $( "#infoTerritorio" ).html(""); }
  else {
    $( "#a" ).html("<strong>¡Atención!</strong> Última actualización del sistema "+
    "desde S.V.C: <strong>" + datosRecibidos.values [0][2] + "</strong>");
    let cadena = null;
    cadena = "- " + datosRecibidos.values [0][0] + ": <strong>" + datosRecibidos.values [0][1] + "</strong><br>" +
    "- " + datosRecibidos.values [1][0] + ": <strong>" + datosRecibidos.values [1][1] + "</strong><hr>";
    let i = 2;
    while (i < datosRecibidos.values.length) {
      cadena = cadena +
      "<a class='btn btn-outline-success m-1' role='button' onclick='copiarA(this)'>" + 
      datosRecibidos.values [i][0] + ", tiene <strong>" + datosRecibidos.values [i][2] +
      "</strong> grupos distribuidos en <strong>" + datosRecibidos.values [i][3] + "</strong> centros (" +
      "representa un <strong>" + datosRecibidos.values [i][4] + "</strong> % del total de centros)</a>" +
      "<a class='btn btn-outline-success m-1' role='button' onclick='copiarA(this)'>" + datosRecibidos.values [i][5] + "</a>" +
      "<a class='btn btn-outline-success m-1' role='button' onclick='copiarA(this)'>" + datosRecibidos.values [i][6] + "</a><br>" 
      i++;
    }
    $( "#infoTerritorio" ).html(cadena); }  }

// Página Info. general de centros

function cargarFiltroVisualCentros(itemSel) {
  switch (itemSel.getAttribute("id")) {
    case "frueeC": $("#valorfilC").attr("placeholder","RUEE (NNNNCCC)"); break;
    case "fdepartamentoC": $("#valorfilC").attr("placeholder","Departamento (Ej. Rocha)"); break;
    case "fredglobalC": $("#valorfilC").attr("placeholder","RUEE centro Red Global (NNNNCCC)"); break;
    case "fceilabC": $("#valorfilC").attr("placeholder","RUEE centro Ceilab (NNNNCCC)"); break;
    case "fcceI": $("#valorfilC").attr("placeholder","RUEE centro CEI (NNNNCCC)"); break;
    case "fcaT": $("#valorfilC").attr("placeholder","RUEE centro AT (NNNNCCC)"); break;
  }
  cargarInputsC(datosRecibidos);
  $("#valorfilC").val("");
  $("#valorfilC").focus();
  }

function determinarATRC () {
  switch ($("#valorfilC").attr("placeholder")) {
    case "RUEE (NNNNCCC)": return 0;
    case "Departamento (Ej. Rocha)": return 1;
    case "RUEE centro Ceilab (NNNNCCC)": return 11;
    case "RUEE centro AT (NNNNCCC)": return 12;
    case "RUEE centro Red Global (NNNNCCC)": return 13;
    case "RUEE centro CEI (NNNNCCC)": return 14;
  }   
  return 0;  }

function reiniciarElementosVisualesC () {
  $( "#error" ).html("");
  $( "#resultados_c" ).html("");
  $( "#resultados_i" ).html("");  }

function cargarInputsC(datosRecibidos) {
  let valores = [];
  if (validarDatosRecibidos (datosRecibidos) ) { $("#valorfilC").focus(); }
  else {
    let atr = determinarATRC (); 
    let i = datosRecibidos.values.length - 1;
    while (i > 0) {
      if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][10] ||
      sessionStorage.getItem('nombre') == "ghost") {
        if (atr == 11 &&
        datosRecibidos.values [i][atr] != "¡Sin mentor Ceilab!" &&
        valores.indexOf(datosRecibidos.values [i][0]) == -1) { valores.push(datosRecibidos.values [i][0]); }
        else if (atr == 12 &&
        datosRecibidos.values [i][atr] != "¡Sin mentor AT!" &&
        valores.indexOf(datosRecibidos.values [i][0]) == -1) { valores.push(datosRecibidos.values [i][0]); }          
        else if (atr == 13 && 
        datosRecibidos.values [i][atr] != "¡Sin mentor Red!" &&
        valores.indexOf(datosRecibidos.values [i][0]) == -1) { valores.push(datosRecibidos.values [i][0]); }
        else if (atr == 14 &&
        datosRecibidos.values [i][atr] != "¡Sin mentor CEI!" &&
        valores.indexOf(datosRecibidos.values [i][0]) == -1) { valores.push(datosRecibidos.values [i][0]); }
        else if (atr != 11 && atr != 12 && atr != 13 && atr != 14 &&
        valores.indexOf(datosRecibidos.values [i][atr])== -1) { valores.push(datosRecibidos.values [i][atr]); }
      }
      i--; 
    }
  }
  valores.sort();
  $("#valorfilC").autocomplete({ source: valores });
  if (sessionStorage.getItem('centro') != null &&
    sessionStorage.getItem('centro') != 'null') {
    $("#valorfilC").val( sessionStorage.getItem('centro') );
    buscarCentrosAsociadosC ();
    cargarInfoCentro ( sessionStorage.getItem('centro') );
    sessionStorage.setItem('centro', null); }
  $("#valorfilC").focus();  }

function buscarCentrosAsociadosC () {
  reiniciarElementosVisualesC ();
  if (validarValorFilC () ) {
    if ( !validarDatosRecibidos (datosRecibidos) ) {
      let valores = []; centroSel = [];
      let atr = determinarATRC ();
      let i = datosRecibidos.values.length - 1;
      let li = 0;
      let cadena = null;
      while (i > 0) {
        if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][10] ||
        sessionStorage.getItem('nombre') == "ghost") {
          li = 0;
          if (atr == 11 && datosRecibidos.values [i][atr] != "¡Sin mentor Ceilab!" &&
          datosRecibidos.values [i][0].includes($("#valorfilC").val()) ) { li = 1; }
          else if (atr == 12 && datosRecibidos.values [i][atr] != "¡Sin mentor AT!" &&
          datosRecibidos.values [i][0].includes($("#valorfilC").val()) ) { li = 1; }  
          else if (atr == 13 && datosRecibidos.values [i][atr] != "¡Sin mentor Red!" &&
          datosRecibidos.values [i][0].includes($("#valorfilC").val()) ) { li = 1; }
          else if (atr == 14 && datosRecibidos.values [i][atr] != "¡Sin mentor CEI!" &&
          datosRecibidos.values [i][0].includes($("#valorfilC").val()) ) { li = 1; }
          else if (atr != 11 && atr != 12 && atr != 13 && atr != 14 &&
          datosRecibidos.values [i][atr].includes($("#valorfilC").val()) ) { li = 1; } 
          if (li==1) {
            cadena = "<a class='btn btn-outline-secondary m-2' id='" +
            datosRecibidos.values [i][0] + "' onclick='cargarInfoCentro(" + 
            datosRecibidos.values [i][0] + ")' href='#resultados_i' role='button'>" +
            datosRecibidos.values [i][0] + "</a>";
            if (valores.indexOf(cadena)==-1) { valores.push(cadena); }
            centroSel.push(datosRecibidos.values [i]);
          } 
        }
        i--; 
      }
      if (valores.length > 0) {
        valores.sort();
        valores.forEach(e => $( "#resultados_c" ).html( $( "#resultados_c" ).html() + e ));
      }
      else { errorSys("#error",m1_SVC); }
    }
  }
  else { errorSys("#error",m1_SVC); }
  $("#valorfilC").focus();  }

function validarValorFilC () {
  if ( $("#valorfilC").val() != null
  && $("#valorfilC").val() != undefined
  && $("#valorfilC").val() != "") { return true; }
  return false;  }

function cargarInfoCentro (rueeID) {
  $( "#error" ).html("");
  $( "#resultados_i" ).html("");
  centroSel.sort();
  centroSel.forEach( e => {
    let cadena = null;
    let valor = null;
    if (rueeID.toString() == e [0]) {
      cadena = "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<b>Información del centro: </b>" + e [0] + "<br>" +
      "- Departamento: " + e [1] + "<br>- Teléfonos (centro): " + e [2] + "<br>" +
      "- Email/s (centro): " + e [3] + "<br>- Proyectos de abordaje en curso: " +  e [4] + "<br>" +
      "- Nombre Completo Director/a: " + e [5] + "<br>- Teléfonos Director/a: " +  e [6] + "<br>" +
      "- Email/s Director/a: " + e [7] + "<br>- Videoconferencia: " + e [8] + "<br>" +
      "- Tipo Acceso: " + e [9] + "<br></a>" +
      "<a class='btn btn-outline-dark text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<strong>Pensamiento Computacional:</strong> " + e [10] + "<br>" +
      "<strong>Red Global de Aprendizaje:</strong> " + e [13] + "<br>" +
      "<strong>CeiLab:</strong> " + e [11] + "<br>" +
      "<strong>Ceibal en Inglés:</strong> " + e [14] + "<br>" +
      "<strong>Aprender Todos:</strong> " + e [12] + "<br>" +
      "<strong>Valijas viajeras:</strong> " + e [15] + "<br>" +
      "<strong>Centro DEC (diseñando el cambio):</strong> " + e [16] + "</a>";
      $( "#resultados_i" ).html(cadena);
      return;
    } 
  });  }

// Página contacto con escuelas 2021

function cargarInputs2021 () {
  let valores = [];
  if (validarDatosRecibidos (datosRecibidos) ) { $("#valorIng").focus(); }
  else {
    let i = datosRecibidos.values.length - 1;
    while (i > 0) {
        if (valores.indexOf(datosRecibidos.values [i][3])== -1) { 
          valores.push(datosRecibidos.values [i][3]); }
      i--; 
    }
  }
  valores.sort();
  $( "#valorIng" ).autocomplete({ source: valores }); }

function buscarReportes2021 () {
  reiniciarElementosVisuales2021 (1);
  if (validarValorIng () ) {
    if ( !validarDatosRecibidos (datosRecibidos) ) {
      let valores = []; centroSel = [];
      let i = datosRecibidos.values.length - 1;
      let cadena = null;
      while (i > 0) {
        if ( datosRecibidos.values [i][3] == $("#valorIng").val() ) {
          cadena = "<a class='btn btn-outline-secondary m-2' id='" +
          datosRecibidos.values [i][1] + "' onclick='cargarGruposAsociados(" + 
          "this)' href='#grupos' role='button'>" +
          datosRecibidos.values [i][1] + "</a>";
          valores.push(cadena);
          centroSel.push(datosRecibidos.values [i]);
        }
        i--;
      }
      if (valores.length > 0) {
        //valores.sort();
        valores.sort((a, b) => ( a[0] + a[0]) - (b[0] + b[0]) );
        valores.forEach(e => $( "#reportes" ).html( $( "#reportes" ).html() + e )); }
      else { errorSys("#error",m1_SVC); }
    }
  }
  else { errorSys("#error",m1_SVC); }
  $("#valorIng").focus();  }

function reiniciarElementosVisuales2021 (val) {
  $( "#error" ).html("");
  switch (val) {
    case 1: $( "#reportes" ).html("");
    case 2: $( "#grupos" ).html("");
    case 3: $( "#info" ).html("");
  }  }

function validarValorIng() {
  if ( $("#valorIng").val() != null
  && $("#valorIng").val() != undefined
  && $("#valorIng").val() != "") { return true; }
  return false;  }

let reporteSel;

function cargarGruposAsociados (reporteFecha) {
  reporteSel = null;
  reiniciarElementosVisuales2021 (2);
  centroSel.sort();
  centroSel.forEach( e => {
    let cadena = null;
    if (reporteFecha.getAttribute("id") == e [1]) {
      reporteSel = e;
      cadena = "<a class='btn btn-outline-success text-start m-2'" +
      "role='button' id='Centro' onclick='copiarA(this)'>" + 
      "Fecha de creación del reporte: " + e [0] + "<br>" +
      "Fecha de registro del reporte: " + e [1] + "<br>" +
      "Referente/s: " + e [2] + "<br>" +
      "Centro: " + e [3] + "<br>" +
      "Objetivo principal del contacto: " + e [4] + "<br>" +
      "Tipo de contacto: " + e [5] + "<br>" +
      "</a><br>";

      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='Centro' onclick='CargarDatosCentro2021()'>Centro</a>";

      if (e [186] == "Sí") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='Alerta' onclick='CargarAlerta2021()'>¡Alerta reportada!</a>"; }

      if (e [14] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4A' onclick='CargarInformacion2021(this)'>4A</a>"; }
      if (e [27] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4B' onclick='CargarInformacion2021(this)'>4B</a>"; }
      if (e [40] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4C' onclick='CargarInformacion2021(this)'>4C</a>"; }
      if (e [53] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4D' onclick='CargarInformacion2021(this)'>4D</a>"; }
 
      if (e [66] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5A' onclick='CargarInformacion2021(this)'>5A</a>"; }
      if (e [79] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5B' onclick='CargarInformacion2021(this)'>5B</a>"; }
      if (e [92] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5C' onclick='CargarInformacion2021(this)'>5C</a>"; }
      if (e [105] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5D' onclick='CargarInformacion2021(this)'>5D</a>"; }

      if (e [118] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6A' onclick='CargarInformacion2021(this)'>6A</a>"; }
      if (e [131] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6B' onclick='CargarInformacion2021(this)'>6B</a>"; }
      if (e [144] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6C' onclick='CargarInformacion2021(this)'>6C</a>"; }
      if (e [157] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6D' onclick='CargarInformacion2021(this)'>6D</a>"; }
      
      if (e [171] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='Multi.' onclick='CargarInformacion2021(this)'>Multi.</a>"; }
      
      $( "#grupos" ).html(cadena);
      return;
    } 
  }); }


let pp, dispM, dispP, DR_dp, DR_ve, DR_app, DR_c, DA_app, DA_p, DA_i, E_m, E_d, com;

function CargarInformacion2021 (val) {
  if (reporteSel != null) {
    reiniciarElementosVisuales2021(3);
    determinarValoresGrupos2021 (val.getAttribute("id"))
    let cadena = null;

    cadena = "<a class='btn btn-outline-success text-start m-2'" +
    "role='button' onclick='copiarA(this)'>" +
    "<b>Disponibilidad de máquinas:</b> " + dispM + "<br>" +
    "<b>Disponibilidad de placas Micro:Bit:</b> " + dispP + "<br>" +
    "<b>Propuesta pedagógica:</b> " + pp + "<br><br><b>Dimensión “Docente remoto”</b><br>" +
    "- Dupla pedagógica: " + DR_dp + "<br>" +
    "- Vínculo con estudiantes: " + DR_ve + "<br>" +
    "- Adaptación de la PP: " + DR_app + "<br>" +
    "- Compromiso: " + DR_c + "<br><br><b>Dimensión “Docente de aula”</b><br>" +
    "- Apropiación de las propuestas pedagógicas: " + DA_app + "<br>" +
    "- Proactividad: " + DA_p + "<br>" +
    "- Intereses en formación PC: " + DA_i +
    "<br><br><b>Desempeño del grupo</b><br>" +
    "- Motivación: " + E_m + "<br>" +
    "- Desempeño: " + E_d + "</a>";
    
    if (com != "") {
      cadena = cadena + "<a class='btn btn-outline-success text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "Comentarios del grupo:<br> " + com + "</a>";
    }
    
    $( "#info" ).html(cadena);
  }
  else { errorSys("#error",m1_SVC); }   }

function determinarValoresGrupos2021 (val) {
  switch (val) {
    case "4A":
      pp = reporteSel [13]; dispM = reporteSel [23]; dispP = reporteSel [24];
      DR_dp = reporteSel [14]; DR_ve = reporteSel [15]; DR_app = reporteSel [16]; DR_c = reporteSel [17];
      DA_app = reporteSel [18]; DA_p = reporteSel [19]; DA_i = reporteSel [20];
      E_m = reporteSel [21]; E_d = reporteSel [22]; com = reporteSel [25];   
    break;
    case "4B":
      pp = reporteSel [26]; dispM = reporteSel [36]; dispP = reporteSel [37];
      DR_dp = reporteSel [27]; DR_ve = reporteSel [28]; DR_app = reporteSel [29]; DR_c = reporteSel [30];
      DA_app = reporteSel [31]; DA_p = reporteSel [32]; DA_i = reporteSel [33];
      E_m = reporteSel [34]; E_d = reporteSel [35]; com = reporteSel [38];   
    break;
    case "4C":
      pp = reporteSel [39]; dispM = reporteSel [49]; dispP = reporteSel [50];
      DR_dp = reporteSel [40]; DR_ve = reporteSel [41]; DR_app = reporteSel [42]; DR_c = reporteSel [43];
      DA_app = reporteSel [44]; DA_p = reporteSel [45]; DA_i = reporteSel [46];
      E_m = reporteSel [47]; E_d = reporteSel [48]; com = reporteSel [51];   
    break;
    case "4D":
      pp = reporteSel [52]; dispM = reporteSel [62]; dispP = reporteSel [63];
      DR_dp = reporteSel [53]; DR_ve = reporteSel [54]; DR_app = reporteSel [55]; DR_c = reporteSel [56];
      DA_app = reporteSel [57]; DA_p = reporteSel [58]; DA_i = reporteSel [59];
      E_m = reporteSel [60]; E_d = reporteSel [61]; com = reporteSel [64];   
    break;    
    case "5A":
      pp = reporteSel [65]; dispM = reporteSel [75]; dispP = reporteSel [76];
      DR_dp = reporteSel [66]; DR_ve = reporteSel [67]; DR_app = reporteSel [68]; DR_c = reporteSel [69];
      DA_app = reporteSel [70]; DA_p = reporteSel [71]; DA_i = reporteSel [72];
      E_m = reporteSel [73]; E_d = reporteSel [74]; com = reporteSel [77];    
    break;
    case "5B":
      pp = reporteSel [78]; dispM = reporteSel [88]; dispP = reporteSel [89];
      DR_dp = reporteSel [79]; DR_ve = reporteSel [80]; DR_app = reporteSel [81]; DR_c = reporteSel [82];
      DA_app = reporteSel [83]; DA_p = reporteSel [84]; DA_i = reporteSel [85];
      E_m = reporteSel [86]; E_d = reporteSel [87]; com = reporteSel [90];    
    break;    
    case "5C":
      pp = reporteSel [91]; dispM = reporteSel [101]; dispP = reporteSel [102];
      DR_dp = reporteSel [92]; DR_ve = reporteSel [93]; DR_app = reporteSel [94]; DR_c = reporteSel [95];
      DA_app = reporteSel [96]; DA_p = reporteSel [97]; DA_i = reporteSel [98];
      E_m = reporteSel [99]; E_d = reporteSel [100]; com = reporteSel [103];
    break;
    case "5D":
      pp = reporteSel [104]; dispM = reporteSel [114]; dispP = reporteSel [115];
      DR_dp = reporteSel [105]; DR_ve = reporteSel [106]; DR_app = reporteSel [107]; DR_c = reporteSel [108];
      DA_app = reporteSel [109]; DA_p = reporteSel [110]; DA_i = reporteSel [111];
      E_m = reporteSel [112]; E_d = reporteSel [113]; com = reporteSel [116];    
    break;
    case "6A":
      pp = reporteSel [117]; dispM = reporteSel [127]; dispP = reporteSel [128];
      DR_dp = reporteSel [118]; DR_ve = reporteSel [119]; DR_app = reporteSel [120]; DR_c = reporteSel [121];
      DA_app = reporteSel [122]; DA_p = reporteSel [123]; DA_i = reporteSel [124];
      E_m = reporteSel [125]; E_d = reporteSel [126]; com = reporteSel [129];    
    break; 
    case "6B":
      pp = reporteSel [130]; dispM = reporteSel [140]; dispP = reporteSel [141];
      DR_dp = reporteSel [131]; DR_ve = reporteSel [132]; DR_app = reporteSel [133]; DR_c = reporteSel [134];
      DA_app = reporteSel [135]; DA_p = reporteSel [136]; DA_i = reporteSel [137];
      E_m = reporteSel [138]; E_d = reporteSel [139]; com = reporteSel [142];    
    break;
    case "6C":
      pp = reporteSel [143]; dispM = reporteSel [153]; dispP = reporteSel [154];
      DR_dp = reporteSel [144]; DR_ve = reporteSel [145]; DR_app = reporteSel [146]; DR_c = reporteSel [147];
      DA_app = reporteSel [148]; DA_p = reporteSel [149]; DA_i = reporteSel [150];
      E_m = reporteSel [151]; E_d = reporteSel [152]; com = reporteSel [155];    
    break;
    case "6D":
      pp = reporteSel [156]; dispM = reporteSel [166]; dispP = reporteSel [167];
      DR_dp = reporteSel [157]; DR_ve = reporteSel [158]; DR_app = reporteSel [159]; DR_c = reporteSel [160];
      DA_app = reporteSel [161]; DA_p = reporteSel [162]; DA_i = reporteSel [163];
      E_m = reporteSel [164]; E_d = reporteSel [165]; com = reporteSel [168];    
    break;
    case "Multi.":
      pp = reporteSel [170]; dispM = reporteSel [180]; dispP = reporteSel [181];
      DR_dp = reporteSel [171]; DR_ve = reporteSel [172]; DR_app = reporteSel [173]; DR_c = reporteSel [174];
      DA_app = reporteSel [175]; DA_p = reporteSel [176]; DA_i = reporteSel [177];
      E_m = reporteSel [178]; E_d = reporteSel [179]; com = reporteSel [182];    
    break;  
  }    }

function CargarAlerta2021 () {
  reiniciarElementosVisuales2021(3);
  let cadena = null;
  cadena = "<a class='btn btn-outline-success text-start m-2'" +
  "role='button' onclick='copiarA(this)'>" +
  "<b>Referente/s:</b> " + reporteSel [2] + "<br>" +
  "<b>Centro:</b> " + reporteSel [3] + "<br>" +
  "<b>Fecha de registro del reporte:</b> " + reporteSel [1] + "<br>" +
  "<b>Grupos reportados:</b> " + reporteSel [188] + "<br>" +
  "<b>Comentarios:</b><br>" + reporteSel [189] +  "</a>";
  $( "#info" ).html(cadena);  }

function CargarDatosCentro2021 () {
  reiniciarElementosVisuales2021(3);
  let cadena = null, com_c = null;
  if (reporteSel != null) {
    if (reporteSel [185] != "") { com_c = reporteSel [185];  }
    else { com_c = "¡sin comentarios!"; }
    cadena = "<a class='btn btn-outline-success text-start m-2'" +
    "role='button' onclick='copiarA(this)'>" +
    "<b>Referente/s:</b> " + reporteSel [2] + "<br>" +
    "<b>Centro:</b> " + reporteSel [3] + "<br>" +
    "<b>Fecha de registro del reporte:</b> " + reporteSel [1] + "<br>" +
    "<b>Clima general de trabajo:</b> " + reporteSel [184] + "<br>" +
    "<b>Apoyo del equipo de dirección:</b> " + reporteSel [183] + "<br>" +  
    "<b>Comentarios del centro:</b><br>" + com_c + "</a>";
    $( "#info" ).html(cadena); }
  else { errorSys("#error",m1_SVC); }   }

// Página contacto con escuelas 2022

function cargarInputs2022 () {
  let valores = [];
  if (validarDatosRecibidos (datosRecibidos) ) { $("#valorIng2022").focus(); }
  else {
    let i = datosRecibidos.values.length - 1;
    while (i > 0) {
      if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][2] ||
      sessionStorage.getItem('nombre') == "ghost") {
        if (valores.indexOf(datosRecibidos.values [i][3])== -1) { 
          valores.push(datosRecibidos.values [i][3]); }
      }    
      i--; 
    }
  }
  valores.sort();
  $( "#valorIng2022" ).autocomplete({ source: valores }); }

function buscarReportes2022 () {
  reiniciarElementosVisuales2021 (1);
  if (validarValorIng2022 () ) {
    if ( !validarDatosRecibidos (datosRecibidos) ) {
      let valores = []; centroSel = [];
      let i = datosRecibidos.values.length - 1;
      let cadena = null;
      while (i > 0) {
        if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][2] ||
        sessionStorage.getItem('nombre') == "ghost") {

        if ( datosRecibidos.values [i][3] == $("#valorIng2022").val() ) {
          cadena = "<a class='btn btn-outline-secondary m-2' id='" +
          datosRecibidos.values [i][0] + "' onclick='cargarGruposAsociados2022(" + 
          "this)' href='#grupos' role='button'>" +
          datosRecibidos.values [i][0] + "</a>";
          valores.push(cadena);
          centroSel.push(datosRecibidos.values [i]);
        } }
        i--;
      }
      if (valores.length > 0) {
        //valores.sort();
        valores.sort((a, b) => ( a[0] + a[0]) - (b[0] + b[0]) );
        valores.forEach(e => $( "#reportes" ).html( $( "#reportes" ).html() + e )); }
      else { errorSys("#error",m1_SVC); }
    }
  }
  else { errorSys("#error",m1_SVC); }
  $("#valorIng2022").focus();  }

function validarValorIng2022() {
  if ( $("#valorIng2022").val() != null
  && $("#valorIng2022").val() != undefined
  && $("#valorIng2022").val() != "") { return true; }
  return false;  }

function cargarGruposAsociados2022 (reporteFecha) {
  reporteSel = null;
  reiniciarElementosVisuales2021 (2);
  centroSel.sort();
  centroSel.forEach( e => {
    let cadena = null;
    if (reporteFecha.getAttribute("id") == e [0]) {
      reporteSel = e;
      cadena = "<a class='btn btn-outline-success text-start m-2'" +
      "role='button' id='Centro' onclick='copiarA(this)'>" + 
      "Fecha de creación del reporte: " + e [0] + "<br>" +
      "Fecha de registro del reporte: " + e [1] + "<br>" +
      "Referente/s: " + e [2] + "<br>" +
      "Centro: " + e [3] + "<br>" +
      "Objetivo principal del contacto: " + e [4] + "<br>" +
      "Tipo de contacto: " + e [5] + "<br>" +
      "</a><br>";

      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='Centro' onclick='CargarDatosCentro2022()'>Centro</a>";

      if (e [180] == "Sí") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='Alerta' onclick='CargarAlerta2022()'>¡Alerta reportada!</a>"; }

      if (e [7] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4A' onclick='CargarInformacion2022(this)'>4A</a>"; }
      if (e [20] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4B' onclick='CargarInformacion2022(this)'>4B</a>"; }
      if (e [33] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4C' onclick='CargarInformacion2022(this)'>4C</a>"; }
      if (e [46] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='4D' onclick='CargarInformacion2022(this)'>4D</a>"; }
 
      if (e [59] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5A' onclick='CargarInformacion2022(this)'>5A</a>"; }
      if (e [72] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5B' onclick='CargarInformacion2022(this)'>5B</a>"; }
      if (e [85] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5C' onclick='CargarInformacion2022(this)'>5C</a>"; }
      if (e [98] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='5D' onclick='CargarInformacion2022(this)'>5D</a>"; }

      if (e [111] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6A' onclick='CargarInformacion2022(this)'>6A</a>"; }
      if (e [124] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6B' onclick='CargarInformacion2022(this)'>6B</a>"; }
      if (e [137] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6C' onclick='CargarInformacion2022(this)'>6C</a>"; }
      if (e [150] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='6D' onclick='CargarInformacion2022(this)'>6D</a>"; }
      
      if (e [164] != "") {
      cadena = cadena + "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' href='#info' id='Multi.' onclick='CargarInformacion2022(this)'>Multi.</a>"; }
      
      $( "#grupos" ).html(cadena);
      return;
    } 
  }); }

function CargarInformacion2022 (val) {
  if (reporteSel != null) {
    reiniciarElementosVisuales2021(3);
    determinarValoresGrupos2022 (val.getAttribute("id"))
    let cadena = null;

    cadena = "<a class='btn btn-outline-success text-start m-2'" +
    "role='button' onclick='copiarA(this)'>" +
    "<b>Disponibilidad de máquinas:</b> " + dispM + "<br>" +
    "<b>Disponibilidad de placas Micro:Bit:</b> " + dispP + "<br>" +
    "<b>Propuesta pedagógica:</b> " + pp + "<br><br><b>Dimensión “Docente remoto”</b><br>" +
    "- Dupla pedagógica: " + DR_dp + "<br>" +
    "- Vínculo con estudiantes: " + DR_ve + "<br>" +
    "- Adaptación de la PP: " + DR_app + "<br>" +
    "- Compromiso: " + DR_c + "<br><br><b>Dimensión “Docente de aula”</b><br>" +
    "- Apropiación de las propuestas pedagógicas: " + DA_app + "<br>" +
    "- Proactividad: " + DA_p + "<br>" +
    "- Intereses en formación PC: " + DA_i +
    "<br><br><b>Desempeño del grupo</b><br>" +
    "- Motivación: " + E_m + "<br>" +
    "- Desempeño: " + E_d + "</a>";
    
    if (com != "") {
      cadena = cadena + "<a class='btn btn-outline-success text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "Comentarios del grupo:<br> " + com + "</a>";
    }
    
    $( "#info" ).html(cadena);
  }
  else { errorSys("#error",m1_SVC); }   }

function determinarValoresGrupos2022 (val) {
  switch (val) {
    case "4A":
      pp = reporteSel [7]; dispM = reporteSel [17]; dispP = reporteSel [18];
      DR_dp = reporteSel [8]; DR_ve = reporteSel [9]; DR_app = reporteSel [10]; DR_c = reporteSel [11];
      DA_app = reporteSel [12]; DA_p = reporteSel [13]; DA_i = reporteSel [14];
      E_m = reporteSel [15]; E_d = reporteSel [16]; com = reporteSel [19];   
    break;
    case "4B":
      pp = reporteSel [20]; dispM = reporteSel [30]; dispP = reporteSel [31];
      DR_dp = reporteSel [21]; DR_ve = reporteSel [22]; DR_app = reporteSel [23]; DR_c = reporteSel [24];
      DA_app = reporteSel [25]; DA_p = reporteSel [26]; DA_i = reporteSel [27];
      E_m = reporteSel [28]; E_d = reporteSel [29]; com = reporteSel [32];   
    break;
    case "4C":
      pp = reporteSel [33]; dispM = reporteSel [43]; dispP = reporteSel [44];
      DR_dp = reporteSel [34]; DR_ve = reporteSel [35]; DR_app = reporteSel [36]; DR_c = reporteSel [37];
      DA_app = reporteSel [38]; DA_p = reporteSel [39]; DA_i = reporteSel [40];
      E_m = reporteSel [41]; E_d = reporteSel [42]; com = reporteSel [45];   
    break;
    case "4D":
      pp = reporteSel [46]; dispM = reporteSel [56]; dispP = reporteSel [57];
      DR_dp = reporteSel [47]; DR_ve = reporteSel [48]; DR_app = reporteSel [49]; DR_c = reporteSel [50];
      DA_app = reporteSel [51]; DA_p = reporteSel [52]; DA_i = reporteSel [53];
      E_m = reporteSel [54]; E_d = reporteSel [55]; com = reporteSel [58];   
    break;    
    case "5A":
      pp = reporteSel [59]; dispM = reporteSel [69]; dispP = reporteSel [70];
      DR_dp = reporteSel [60]; DR_ve = reporteSel [61]; DR_app = reporteSel [62]; DR_c = reporteSel [63];
      DA_app = reporteSel [64]; DA_p = reporteSel [65]; DA_i = reporteSel [66];
      E_m = reporteSel [67]; E_d = reporteSel [68]; com = reporteSel [71];    
    break;
    case "5B":
      pp = reporteSel [72]; dispM = reporteSel [82]; dispP = reporteSel [83];
      DR_dp = reporteSel [73]; DR_ve = reporteSel [74]; DR_app = reporteSel [75]; DR_c = reporteSel [76];
      DA_app = reporteSel [77]; DA_p = reporteSel [78]; DA_i = reporteSel [79];
      E_m = reporteSel [80]; E_d = reporteSel [81]; com = reporteSel [84];    
    break;    
    case "5C":
      pp = reporteSel [85]; dispM = reporteSel [95]; dispP = reporteSel [96];
      DR_dp = reporteSel [86]; DR_ve = reporteSel [87]; DR_app = reporteSel [88]; DR_c = reporteSel [89];
      DA_app = reporteSel [90]; DA_p = reporteSel [91]; DA_i = reporteSel [92];
      E_m = reporteSel [93]; E_d = reporteSel [94]; com = reporteSel [97];
    break;
    case "5D":
      pp = reporteSel [98]; dispM = reporteSel [108]; dispP = reporteSel [109];
      DR_dp = reporteSel [99]; DR_ve = reporteSel [100]; DR_app = reporteSel [101]; DR_c = reporteSel [102];
      DA_app = reporteSel [103]; DA_p = reporteSel [104]; DA_i = reporteSel [105];
      E_m = reporteSel [106]; E_d = reporteSel [107]; com = reporteSel [110];    
    break;
    case "6A":
      pp = reporteSel [111]; dispM = reporteSel [121]; dispP = reporteSel [122];
      DR_dp = reporteSel [112]; DR_ve = reporteSel [113]; DR_app = reporteSel [114]; DR_c = reporteSel [115];
      DA_app = reporteSel [116]; DA_p = reporteSel [117]; DA_i = reporteSel [118];
      E_m = reporteSel [119]; E_d = reporteSel [120]; com = reporteSel [123];    
    break; 
    case "6B":
      pp = reporteSel [124]; dispM = reporteSel [134]; dispP = reporteSel [135];
      DR_dp = reporteSel [125]; DR_ve = reporteSel [126]; DR_app = reporteSel [127]; DR_c = reporteSel [128];
      DA_app = reporteSel [129]; DA_p = reporteSel [130]; DA_i = reporteSel [131];
      E_m = reporteSel [132]; E_d = reporteSel [133]; com = reporteSel [136];    
    break;
    case "6C":
      pp = reporteSel [137]; dispM = reporteSel [147]; dispP = reporteSel [148];
      DR_dp = reporteSel [138]; DR_ve = reporteSel [139]; DR_app = reporteSel [140]; DR_c = reporteSel [141];
      DA_app = reporteSel [142]; DA_p = reporteSel [143]; DA_i = reporteSel [144];
      E_m = reporteSel [145]; E_d = reporteSel [146]; com = reporteSel [149];    
    break;
    case "6D":
      pp = reporteSel [150]; dispM = reporteSel [160]; dispP = reporteSel [161];
      DR_dp = reporteSel [151]; DR_ve = reporteSel [152]; DR_app = reporteSel [153]; DR_c = reporteSel [154];
      DA_app = reporteSel [155]; DA_p = reporteSel [156]; DA_i = reporteSel [157];
      E_m = reporteSel [158]; E_d = reporteSel [159]; com = reporteSel [162];    
    break;
    case "Multi.":
      pp = reporteSel [164]; dispM = reporteSel [174]; dispP = reporteSel [175];
      DR_dp = reporteSel [165]; DR_ve = reporteSel [166]; DR_app = reporteSel [167]; DR_c = reporteSel [168];
      DA_app = reporteSel [169]; DA_p = reporteSel [170]; DA_i = reporteSel [171];
      E_m = reporteSel [172]; E_d = reporteSel [173]; com = reporteSel [176];    
    break;  
  }    }  

function CargarAlerta2022 () {
  reiniciarElementosVisuales2021(3);
  let cadena = null;
  cadena = "<a class='btn btn-outline-success text-start m-2'" +
  "role='button' onclick='copiarA(this)'>" +
  "<b>Referente/s:</b> " + reporteSel [2] + "<br>" +
  "<b>Centro:</b> " + reporteSel [3] + "<br>" +
  "<b>Fecha de registro del reporte:</b> " + reporteSel [1] + "<br>" +
  "<b>Tipo de alerta:</b> " + reporteSel [184] + "<br>" +
  "<b>Grupos reportados:</b> " + reporteSel [182] + "<br>" +
  "<b>Comentarios:</b><br>" + reporteSel [183] +  "</a>";
  $( "#info" ).html(cadena);  }

function CargarDatosCentro2022 () {
  reiniciarElementosVisuales2021(3);
  let cadena = null, com_c = null, centro_pcs = null, centro_placas = null;
  let comentario_dctd = null;
  let archivoCentro = "";
  if (reporteSel != null) {
    if (reporteSel [179] != "") { com_c = reporteSel [179];  }
    else { com_c = "¡sin comentarios!"; }
    if (reporteSel [185] != "" && reporteSel [185] != undefined ) { centro_pcs = reporteSel [185]; }
    else { centro_pcs = "¡sin información!"; }
    if (reporteSel [186] != "" && reporteSel [186] != undefined ) { centro_placas = reporteSel [186]; }
    else { centro_placas = "¡sin información!"; }
    if (reporteSel [181] != "" && reporteSel [181] != undefined ) { 
      archivoCentro = "<a href='" + reporteSel [181] + 
      "' target='_blank' class='btn btn-outline-dark text-start m-2'" +
      "role='button'>" + "Abrir documento adjunto" + "</a>"; }
    else { archivoCentro = ""; }
    if (reporteSel [187] != "" && reporteSel [187] != undefined ) {
      comentario_dctd = "<a target='_blank' class='btn btn-outline-dark text-start m-2'" +
      "role='button' onclick='copiarA(this)'><strong>Comentario para DCTD (público):</strong><br>"
      + reporteSel [187] + "</a><br>"; }
    else { comentario_dctd = ""; }   
    cadena = "<a class='btn btn-outline-success text-start m-2'" +
    "role='button' onclick='copiarA(this)'>" +
    "<b>Referente/s:</b> " + reporteSel [2] + "<br>" +
    "<b>Centro:</b> " + reporteSel [3] + "<br>" +
    "<b>Fecha de registro del reporte:</b> " + reporteSel [1] + "<br>" +
    "<b>Clima general de trabajo:</b> " + reporteSel [178] + "<br>" +
    "<b>Apoyo del equipo de dirección:</b> " + reporteSel [177] + "<br>" + 
    "<b>Cant. de equipos (PC’s) en modalidad biblioteca: </b> " + centro_pcs + "<br>" + 
    "<b>Cant. de placas Micro:Bit en modalidad biblioteca: </b> " + centro_placas + "<br>" + 
    "<b>Comentarios del centro:</b><br>" + com_c + "</a><br>" + comentario_dctd + archivoCentro;
    $( "#info" ).html(cadena); }
  else { errorSys("#error",m1_SVC); }   }

