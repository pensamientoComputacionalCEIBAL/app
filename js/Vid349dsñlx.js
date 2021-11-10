const api = new XMLHttpRequest ();

let urlCompleta, datosRecibidos, validadorConsulta;

let user = null; let pass = null;

const fechaActual = new Date();
const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', ];

let gruposCentro = [];

$( document ).ready(function() {

// Página de inicio (index.html)
$( "#eIndex" ).click(function() { validarCamposIndex(); });
$( "#rIndex" ).click(function() { reiniciarInputsIndex(); });

// Página Consultas S.V.C
$( "#fruee" ).click(function() { cargarFiltroVisual(this); });
$( "#flocalidad" ).click(function() { cargarFiltroVisual(this); });
$( "#fdepartamento" ).click(function() { cargarFiltroVisual(this); });
$( "#fdocumentoda" ).click(function() { cargarFiltroVisual(this); });
$( "#fdocumentodr" ).click(function() { cargarFiltroVisual(this); });
$( "#buscarCentrosAsociados" ).click(function() { buscarCentrosAsociados(); });

$("#valorfil").keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) {
    buscarCentrosAsociados();
    $("#valorfil").focus();
    return false; } });

// Al 'Salir' del sistema

$( "#sSys" ).click(function() { salirSistema(); });

cargarPagina ();

});

// Mensajes.

let m1_Index = "<center><div class='alert alert-danger'role='alert'> ¡UPS! ¡No has completado todos los campos!</div></center>";
let m2_Index = "<center><div class='alert alert-danger'role='alert'> ¡UPS! ¡Parece que hay un problema de conexión!</div></center>";
let m3_Index = "<center><div class='alert alert-danger'role='alert'> ¡UPS! ¡Nombre de usuario y/o contraseña incorrecto/s!</div></center>";
let m1_Main = "<p class='h2 text-secondary'>¡Bienvenid@ " + sessionStorage.getItem('nombre') + "!</p>"
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
  switch (paginaActual) {
    case "index.html":
      registrarSW ();
      $("input[type='text']").focus();
    break;
    case "main.html":
      $("#usuario").html(m1_Main);
      $("#avatar").attr("src", sessionStorage.getItem('urlImagen'));
      $("#fecha").html(m2_Main);
      getDatos("Main");
    break;
    case "svc.html":
      getDatos("SVC");
      $("#valorfil").focus();
    break;
    case "info_territorio.html":
      getDatos("info_territorio");
    break;
  }
}

function validarSession () {
  if (sessionStorage.getItem('nombre') == null ||
  sessionStorage.getItem('nombre') == 'null') {
    window.open("index.html","_self"); }
}

function registrarSW () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./94kfd34dsla.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW', err)) } 
}

function errorSys(objeto,mensaje) {
  $(objeto).hide();
  $(objeto).html(mensaje);
  $(objeto).fadeIn(); }

function copiarA(val) {
  navigator.clipboard.writeText(val.innerText);
  }

function salirSistema () {
  sessionStorage.setItem('nombre', null);
  sessionStorage.setItem('urlImagen', null);
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
    case "SVC":
      idSheets="12kLL0bz0mwkP3EYJRrBG2aOUgEFcrRG3iIhm3n_fuQ8";
      rangoSheets="A:AJ";
    break;
    case "info_territorio":
      idSheets="1XS1ngb5eknIeXnfPsSHe5Hnk7XY5LcqQ1oD1DDjPHk0";
      rangoSheets="A:G";
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
        case "SVC": cargarInputs(datosRecibidos); break;
        case "info_territorio": cargarInfoTerritorio(datosRecibidos); break;
      }
    }
  }
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
    errorSys("#error", m3_Index); } 
}

function validarCamposIndex() {
  if ($('#user').val() != '' && $('#pass').val() != '' ) { getDatos ("Index"); }
  else { 
    errorSys("#error", m1_Index);
    $("#user").focus(); } 
}

function reiniciarInputsIndex () {
  $('#error').html('');
  $('input').val('');
  $("#user").focus(); 
}

// Página Main.

function cargarMensaje (datosRecibidos) {
  if (datosRecibidos == undefined || datosRecibidos.values.length <= 1) {
    errorSys("#mensajeGestion", m3_Main);
  }
  else {
    $("#mensajeGestion").html("<div class='h6'>" +
    datosRecibidos.values [1][0]) + "</div>"; }
}

// Página S.V.C.
function cargarFiltroVisual(itemSel) {
  switch (itemSel.getAttribute("id")) {
    case "fruee": $("#valorfil").attr("placeholder","RUEE (NNNNCCC)"); break;
    case "flocalidad": $("#valorfil").attr("placeholder","Localidad (Ej.Quebracho)"); break;
    case "fdepartamento": $("#valorfil").attr("placeholder","Departamento (Ej. Rocha)"); break;
    case "fdocumentoda": $("#valorfil").attr("placeholder","Doc. DA (Ej. 47259101)"); break;
    case "fdocumentodr": $("#valorfil").attr("placeholder","Doc. DR (Ej. rt58936592)"); break;
  }
  getDatos("SVC");
  $("#valorfil").val("");
  $("#valorfil").focus();
}

function cargarInputs(datosRecibidos) {
  let valores = [];
  if (datosRecibidos == undefined || datosRecibidos.values.length <= 1) {
    errorSys("#error", m2_Index);
    $("#valorfil").focus(); }
  else {
    let atr = null;
    switch ($("#valorfil").attr("placeholder")) {
      case "RUEE (NNNNCCC)": atr = 0; break;
      case "Localidad (Ej.Quebracho)": atr = 3; break;
      case "Departamento (Ej. Rocha)": atr = 2; break;
      case "Doc. DA (Ej. 47259101)": atr = 11; break;
      case "Doc. DR (Ej. rt58936592)": atr = 25; break; }
    let i = datosRecibidos.values.length - 1;
    while (i >= 0) {
      if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][26] ||
      sessionStorage.getItem('nombre') == "test" ||
      sessionStorage.getItem('nombre') == "ghost") {
        if (valores.indexOf(datosRecibidos.values [i][atr])== -1) { valores.push(datosRecibidos.values [i][atr]); }
      }
      i--; 
    }
  }
  $( "#valorfil" ).autocomplete({ source: valores });
}

function buscarCentrosAsociados() {
  $( "#error" ).html("");
  $( "#resultados_c" ).html("");
  $( "#resultados_g" ).html("");
  $( "#resultados_i" ).html("");
  if ($("#valorfil").val() != null && $("#valorfil").val() != undefined
  && $("#valorfil").val() != "" ) {
    let valores = [];
    if (datosRecibidos == undefined || datosRecibidos.values.length <= 1 ) {
      errorSys("#error", m2_Index); }
    else {
      let atr = null;
      switch ($("#valorfil").attr("placeholder")) {
        case "RUEE (NNNNCCC)": atr = 0; break;
        case "Localidad (Ej.Quebracho)": atr = 3; break;
        case "Departamento (Ej. Rocha)": atr = 2; break;
        case "Doc. DA (Ej. 47259101)": atr = 11; break;
        case "Doc. DR (Ej. rt58936592)": atr = 25; break; }
      gruposCentro = [];
      let i = datosRecibidos.values.length - 1;
      let cadena = null;
      while (i >= 0) {
        if (sessionStorage.getItem('nombre') == datosRecibidos.values [i][26] ||
        sessionStorage.getItem('nombre') == "test" || 
        sessionStorage.getItem('nombre') == "ghost") {
          if (datosRecibidos.values [i][atr].includes($("#valorfil").val())) {
            cadena = "<a class='btn btn-outline-secondary m-2' id='" +
            datosRecibidos.values [i][0] + "' onclick='cargarGrupos(" + 
            datosRecibidos.values [i][0] + ")' href='#resultados_g' role='button'>" +
            datosRecibidos.values [i][0] + "</a>";
            if (valores.indexOf(cadena)==-1) { valores.push(cadena); }
          gruposCentro.push(datosRecibidos.values [i]);
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
  $("#valorfil").focus();
  }
  else { 
    errorSys("#error",m1_SVC);
    $("#valorfil").focus(); }  
}

function cargarGrupos (rueeID) {
  $( "#error" ).html("");
  $( "#resultados_g" ).html("");
  $( "#resultados_i" ).html("");
  gruposCentro.sort();
  gruposCentro.forEach( e => {
    let cadena = null;
    let valor = null;
    if (rueeID.toString() == e [0]) {
      cadena = "<a class='btn btn-outline-success m-2' id='" +
      e [0] + e [8] + e[9] + "' onclick='cargarInfo(this)' " +
      " href='#resultados_i' role='button'>" +
      e [8] + e[9] + "</a>";
      $( "#resultados_g" ).html( $( "#resultados_g" ).html() + cadena )
    } 
  });
}

function cargarInfo (rueeGID) {
  $( "#error" ).html("");
  $( "#resultados_i" ).html("");
  gruposCentro.forEach( e => {
    let cadena = null;
    if (rueeGID.getAttribute('id') == e[0] + e [8] + e[9]) {
      cadena = "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<b>Información del centro: </b>" + e [0] + " (" + "<b>ID N°</b> " + e [1]  + ")<br>" +
      "Departamento: " + e [2] + ", " + e [3] + "<br>" + e [4]  + " N° " + e [5] + " " + e [34] +
      "<br> Grupo " + e [8] + e [9] + " " + e [7] + "</a>" + 
      "<a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<b>Docente de aula: </b>" + e [12] + " " + e [13] + " (" + e [11] + "), " + "<br>Correo electrónico (DA): " + e [14] + "<br>Contacto tel. / celular: " + e [15] + 
      "<br><b>Proveedor</b>: " + e [19] +
      "<br><b>Docente remoto: </b>" + e [22] + " " + e [23] + " (" + e [25] + "), " + "<br>Correo electrónico (DR): " + e [24] +
      "</a><a class='btn btn-outline-primary text-start m-2'" +
      "role='button' onclick='copiarA(this)'>" +
      "<b>Información de clases de Pensamiento Computacional</b><br>" +
      "Coordinado para los días: " + e [30] + "<br>" +
      "A la hora: " + e [31] + "<br>" +
      "Desde la fecha: " + e [33] + "</a>";
      $( "#resultados_i" ).html(cadena);
      return;
    }
  });
}

function cargarInfoTerritorio (datosRecibidos) {
  if (datosRecibidos == undefined || datosRecibidos.values.length <= 1 ) {
      errorSys("#a", m2_Index);
      $( "#infoTerritorio" ).html("");
  }
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
    $( "#infoTerritorio" ).html(cadena);
  }
}