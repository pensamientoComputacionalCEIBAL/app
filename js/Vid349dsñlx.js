const _0x2b318a=_0x5ae8;(function(_0x4c537a,_0x18af95){const _0x166d63=_0x5ae8,_0x4f413e=_0x4c537a();while(!![]){try{const _0x54b7fa=-parseInt(_0x166d63(0x104))/0x1*(-parseInt(_0x166d63(0x124))/0x2)+parseInt(_0x166d63(0x139))/0x3*(parseInt(_0x166d63(0x15b))/0x4)+-parseInt(_0x166d63(0x14d))/0x5*(-parseInt(_0x166d63(0xe4))/0x6)+-parseInt(_0x166d63(0x108))/0x7*(-parseInt(_0x166d63(0x161))/0x8)+-parseInt(_0x166d63(0x134))/0x9+-parseInt(_0x166d63(0x101))/0xa*(parseInt(_0x166d63(0x129))/0xb)+parseInt(_0x166d63(0x132))/0xc*(-parseInt(_0x166d63(0x163))/0xd);if(_0x54b7fa===_0x18af95)break;else _0x4f413e['push'](_0x4f413e['shift']());}catch(_0x22c12c){_0x4f413e['push'](_0x4f413e['shift']());}}}(_0x4b3d,0xb696e));const api=new XMLHttpRequest();let urlCompleta,datosRecibidos,validadorConsulta,user=null,pass=null;const fechaActual=new Date(),diasSemana=[_0x2b318a(0x110),_0x2b318a(0x11c),_0x2b318a(0x12e),'miércoles','jueves','viernes',_0x2b318a(0xe9)];let gruposCentro=[];$(document)[_0x2b318a(0xfe)](function(){const _0x2c1d00=_0x2b318a;$(_0x2c1d00(0x13b))[_0x2c1d00(0x16e)](function(){validarCamposIndex();}),$('#rIndex')[_0x2c1d00(0x16e)](function(){reiniciarInputsIndex();}),$(_0x2c1d00(0xf3))[_0x2c1d00(0x16e)](function(){vaciarCache();}),$(_0x2c1d00(0xf9))[_0x2c1d00(0x16e)](function(){cargarFiltroVisual(this);}),$(_0x2c1d00(0x131))[_0x2c1d00(0x16e)](function(){cargarFiltroVisual(this);}),$(_0x2c1d00(0x12d))[_0x2c1d00(0x16e)](function(){cargarFiltroVisual(this);}),$(_0x2c1d00(0x115))['click'](function(){cargarFiltroVisual(this);}),$('#fdocumentodr')[_0x2c1d00(0x16e)](function(){cargarFiltroVisual(this);}),$(_0x2c1d00(0xf4))[_0x2c1d00(0x16e)](function(){buscarCentrosAsociados();}),$(_0x2c1d00(0xef))[_0x2c1d00(0x165)](function(_0x362926){const _0x3493e9=_0x2c1d00;var _0x4793e0=_0x362926[_0x3493e9(0x144)]?_0x362926[_0x3493e9(0x144)]:_0x362926[_0x3493e9(0x171)];if(_0x4793e0==0xd)return validarCamposIndex(),![];}),$(_0x2c1d00(0x126))['keypress'](function(_0x22525a){const _0x671e71=_0x2c1d00;var _0x343216=_0x22525a[_0x671e71(0x144)]?_0x22525a[_0x671e71(0x144)]:_0x22525a[_0x671e71(0x171)];if(_0x343216==0xd)return validarCamposIndex(),![];}),$('#valorfil')['keypress'](function(_0x29d187){const _0x4ef5a1=_0x2c1d00;var _0x49db14=_0x29d187[_0x4ef5a1(0x144)]?_0x29d187[_0x4ef5a1(0x144)]:_0x29d187[_0x4ef5a1(0x171)];if(_0x49db14==0xd)return buscarCentrosAsociados(),$(_0x4ef5a1(0x155))[_0x4ef5a1(0x13a)](),![];}),$(_0x2c1d00(0x162))[_0x2c1d00(0x16e)](function(){salirSistema();}),cargarPagina();});let m1_Index=_0x2b318a(0x13c),m2_Index=_0x2b318a(0x15c),m3_Index=_0x2b318a(0x148),m1_Main=_0x2b318a(0x13f)+sessionStorage[_0x2b318a(0x147)](_0x2b318a(0x10a))+_0x2b318a(0x119),m2_Main=_0x2b318a(0x160)+diasSemana[fechaActual['getDay']()]+_0x2b318a(0x106)+fechaActual[_0x2b318a(0x152)]()+'</strong>.</i>',m3_Main='¡No\x20hay\x20mensajes\x20pendientes!',m1_SVC=_0x2b318a(0x125);function cargarPagina(){const _0x52b17a=_0x2b318a;let _0x57e122=jQuery(location)[_0x52b17a(0x12b)](_0x52b17a(0x168)),_0x582b98=_0x57e122[_0x52b17a(0x133)](_0x57e122[_0x52b17a(0xf5)]('/')+0x1,_0x57e122[_0x52b17a(0x149)]);_0x582b98['indexOf']('#')!=-0x1&&(_0x582b98=_0x582b98['slice'](0x0,_0x582b98[_0x52b17a(0xe6)]('#')));_0x582b98!=_0x52b17a(0xf0)&&validarSession();switch(_0x582b98){case _0x52b17a(0xf0):registrarSW(),$('input[type=\x27text\x27]')['focus']();break;case _0x52b17a(0xff):$(_0x52b17a(0xf7))['html'](m1_Main),$(_0x52b17a(0xfa))[_0x52b17a(0x12b)]('src',sessionStorage[_0x52b17a(0x147)](_0x52b17a(0x10f))),$('#fecha')[_0x52b17a(0x103)](m2_Main),getDatos('Main');break;case _0x52b17a(0x10c):getDatos(_0x52b17a(0x15a)),$(_0x52b17a(0x155))[_0x52b17a(0x13a)]();break;case _0x52b17a(0x14a):getDatos(_0x52b17a(0x111));break;}}function validarSession(){const _0x27fb30=_0x2b318a;(sessionStorage['getItem'](_0x27fb30(0x10a))==null||sessionStorage[_0x27fb30(0x147)](_0x27fb30(0x10a))==_0x27fb30(0x123))&&window['open'](_0x27fb30(0xf0),_0x27fb30(0x159));}function registrarSW(){const _0x1cb34d=_0x2b318a;_0x1cb34d(0x128)in navigator&&navigator[_0x1cb34d(0x128)][_0x1cb34d(0x11d)](_0x1cb34d(0x12a))[_0x1cb34d(0xf1)](_0x398140=>console['log']('Registro\x20de\x20SW\x20exitoso',_0x398140))[_0x1cb34d(0x122)](_0x55ccc5=>console[_0x1cb34d(0x137)](_0x1cb34d(0x151),_0x55ccc5));}function vaciarCache(){const _0x35d88c=_0x2b318a;$(_0x35d88c(0xef))[_0x35d88c(0x13a)]();}function errorSys(_0xdecb4b,_0x289ecf){const _0x1f1bc7=_0x2b318a;$(_0xdecb4b)[_0x1f1bc7(0x105)](),$(_0xdecb4b)[_0x1f1bc7(0x103)](_0x289ecf),$(_0xdecb4b)['fadeIn']();}function copiarA(_0x59ec32){const _0x224f12=_0x2b318a;navigator['clipboard'][_0x224f12(0xe3)](_0x59ec32[_0x224f12(0x107)]);}function salirSistema(){const _0x289d0c=_0x2b318a;sessionStorage[_0x289d0c(0xfb)](_0x289d0c(0x10a),null),sessionStorage[_0x289d0c(0xfb)](_0x289d0c(0x10f),null);}function getDatos(_0x4cd866){const _0x45c604=_0x2b318a;let _0x3e250b='AIzaSyAVvMA2r0J3skLgWq2g0JX6facQN9BXsXM',_0x57320f=null,_0x2284aa=null;switch(_0x4cd866){case _0x45c604(0x138):hashwasm[_0x45c604(0x164)]($(_0x45c604(0xef))[_0x45c604(0xf6)]())[_0x45c604(0xf1)](function(_0x19a479){user=_0x19a479;}),hashwasm['md5']($('#pass')[_0x45c604(0xf6)]())['then'](function(_0x530d3e){pass=_0x530d3e;}),_0x57320f='1uu4nCUKc5ArODeIv5NOOfMgR3Qd-YhYckGcGLlXv_ik',_0x2284aa='A:D';break;case _0x45c604(0x166):_0x57320f=_0x45c604(0xfd),_0x2284aa='A:A';break;case _0x45c604(0x15a):_0x57320f=_0x45c604(0x14f),_0x2284aa='A:AJ';break;case'info_territorio':_0x57320f=_0x45c604(0x102),_0x2284aa=_0x45c604(0x145);break;}urlCompleta=_0x45c604(0x100)+_0x57320f+_0x45c604(0x11a)+_0x2284aa+'?access_token='+_0x3e250b+_0x45c604(0x15d)+_0x3e250b,api[_0x45c604(0x170)]('GET',urlCompleta,!![]),api[_0x45c604(0x142)](),api['onreadystatechange']=function(){const _0x52cac2=_0x45c604;if(this['status']==0xc8&&this['readyState']==0x4){datosRecibidos=JSON['parse'](this[_0x52cac2(0x11b)]);switch(_0x4cd866){case _0x52cac2(0x138):loginIndex(datosRecibidos);break;case _0x52cac2(0x166):cargarMensaje(datosRecibidos);break;case _0x52cac2(0x15a):cargarInputs(datosRecibidos);break;case _0x52cac2(0x111):cargarInfoTerritorio(datosRecibidos);break;}}};}function loginIndex(_0x20be7f){const _0x15f7cc=_0x2b318a;if(_0x20be7f==undefined||_0x20be7f[_0x15f7cc(0x121)]['length']<=0x1)errorSys(_0x15f7cc(0xee),m2_Index),$('#user')[_0x15f7cc(0x13a)]();else{let _0x37c2df=_0x20be7f[_0x15f7cc(0x121)][_0x15f7cc(0x149)]-0x1;while(_0x37c2df>=0x0){if(_0x20be7f[_0x15f7cc(0x121)][_0x37c2df][0x0]==user&&_0x20be7f[_0x15f7cc(0x121)][_0x37c2df][0x1]==pass){sessionStorage[_0x15f7cc(0xfb)](_0x15f7cc(0x10a),_0x20be7f[_0x15f7cc(0x121)][_0x37c2df][0x2]),sessionStorage[_0x15f7cc(0xfb)](_0x15f7cc(0x10f),_0x20be7f['values'][_0x37c2df][0x3]),window[_0x15f7cc(0x170)](_0x15f7cc(0xff),_0x15f7cc(0x159));return;}_0x37c2df--;}errorSys(_0x15f7cc(0xee),m3_Index);}}function validarCamposIndex(){const _0x3d43ad=_0x2b318a;$('#user')['val']()!=''&&$(_0x3d43ad(0x126))[_0x3d43ad(0xf6)]()!=''?getDatos(_0x3d43ad(0x138)):(errorSys('#error',m1_Index),$(_0x3d43ad(0xef))['focus']());}function reiniciarInputsIndex(){const _0x5b8e12=_0x2b318a;$(_0x5b8e12(0xee))['html'](''),$(_0x5b8e12(0x136))['val'](''),$(_0x5b8e12(0xef))['focus']();}function cargarMensaje(_0x4d0808){const _0xcc1565=_0x2b318a;_0x4d0808==undefined||_0x4d0808[_0xcc1565(0x121)][_0xcc1565(0x149)]<=0x1?errorSys(_0xcc1565(0x156),m3_Main):$(_0xcc1565(0x156))['html']('<div\x20class=\x27h6\x27>'+_0x4d0808['values'][0x1][0x0])+_0xcc1565(0x15f);}function cargarFiltroVisual(_0x19787b){const _0xa27aaf=_0x2b318a;switch(_0x19787b['getAttribute']('id')){case _0xa27aaf(0x172):$(_0xa27aaf(0x155))['attr']('placeholder',_0xa27aaf(0x15e));break;case _0xa27aaf(0xea):$(_0xa27aaf(0x155))[_0xa27aaf(0x12b)](_0xa27aaf(0x169),_0xa27aaf(0x158));break;case'fdepartamento':$(_0xa27aaf(0x155))['attr'](_0xa27aaf(0x169),'Departamento\x20(Ej.\x20Rocha)');break;case _0xa27aaf(0x16d):$(_0xa27aaf(0x155))[_0xa27aaf(0x12b)](_0xa27aaf(0x169),_0xa27aaf(0x13d));break;case _0xa27aaf(0x10b):$(_0xa27aaf(0x155))[_0xa27aaf(0x12b)]('placeholder',_0xa27aaf(0x109));break;}getDatos(_0xa27aaf(0x15a)),$(_0xa27aaf(0x155))[_0xa27aaf(0xf6)](''),$('#valorfil')[_0xa27aaf(0x13a)]();}function cargarInputs(_0x4bfc1e){const _0x42f03c=_0x2b318a;let _0x22f709=[];if(_0x4bfc1e==undefined||_0x4bfc1e[_0x42f03c(0x121)]['length']<=0x1)errorSys('#error',m2_Index),$(_0x42f03c(0x155))[_0x42f03c(0x13a)]();else{let _0x37260d=null;switch($(_0x42f03c(0x155))[_0x42f03c(0x12b)]('placeholder')){case _0x42f03c(0x15e):_0x37260d=0x0;break;case _0x42f03c(0x158):_0x37260d=0x3;break;case _0x42f03c(0x12c):_0x37260d=0x2;break;case _0x42f03c(0x13d):_0x37260d=0xb;break;case'Doc.\x20DR\x20(Ej.\x20rt58936592)':_0x37260d=0x19;break;}let _0x194d71=_0x4bfc1e[_0x42f03c(0x121)]['length']-0x1;while(_0x194d71>=0x0){(sessionStorage[_0x42f03c(0x147)]('nombre')==_0x4bfc1e['values'][_0x194d71][0x1a]||sessionStorage[_0x42f03c(0x147)](_0x42f03c(0x10a))=='test'||sessionStorage[_0x42f03c(0x147)](_0x42f03c(0x10a))==_0x42f03c(0x14c))&&(_0x22f709['indexOf'](_0x4bfc1e['values'][_0x194d71][_0x37260d])==-0x1&&_0x22f709[_0x42f03c(0x153)](_0x4bfc1e[_0x42f03c(0x121)][_0x194d71][_0x37260d])),_0x194d71--;}}$(_0x42f03c(0x155))[_0x42f03c(0x13e)]({'source':_0x22f709});}function buscarCentrosAsociados(){const _0x24750a=_0x2b318a;$(_0x24750a(0xee))[_0x24750a(0x103)](''),$(_0x24750a(0x14b))[_0x24750a(0x103)](''),$('#resultados_g')['html'](''),$(_0x24750a(0xeb))[_0x24750a(0x103)]('');if($('#valorfil')[_0x24750a(0xf6)]()!=null&&$('#valorfil')[_0x24750a(0xf6)]()!=undefined&&$(_0x24750a(0x155))[_0x24750a(0xf6)]()!=''){let _0x47a77d=[];if(datosRecibidos==undefined||datosRecibidos[_0x24750a(0x121)][_0x24750a(0x149)]<=0x1)errorSys('#error',m2_Index);else{let _0x41c554=null;switch($('#valorfil')['attr'](_0x24750a(0x169))){case'RUEE\x20(NNNNCCC)':_0x41c554=0x0;break;case _0x24750a(0x158):_0x41c554=0x3;break;case _0x24750a(0x12c):_0x41c554=0x2;break;case _0x24750a(0x13d):_0x41c554=0xb;break;case _0x24750a(0x109):_0x41c554=0x19;break;}gruposCentro=[];let _0x5a9ecd=datosRecibidos[_0x24750a(0x121)][_0x24750a(0x149)]-0x1,_0x3477ec=null;while(_0x5a9ecd>=0x0){(sessionStorage[_0x24750a(0x147)](_0x24750a(0x10a))==datosRecibidos[_0x24750a(0x121)][_0x5a9ecd][0x1a]||sessionStorage[_0x24750a(0x147)]('nombre')==_0x24750a(0x118)||sessionStorage[_0x24750a(0x147)]('nombre')=='ghost')&&(datosRecibidos[_0x24750a(0x121)][_0x5a9ecd][_0x41c554][_0x24750a(0x141)]($(_0x24750a(0x155))[_0x24750a(0xf6)]())&&(_0x3477ec=_0x24750a(0x140)+datosRecibidos[_0x24750a(0x121)][_0x5a9ecd][0x0]+_0x24750a(0x116)+datosRecibidos[_0x24750a(0x121)][_0x5a9ecd][0x0]+_0x24750a(0x154)+datosRecibidos[_0x24750a(0x121)][_0x5a9ecd][0x0]+_0x24750a(0x14e),_0x47a77d['indexOf'](_0x3477ec)==-0x1&&_0x47a77d['push'](_0x3477ec),gruposCentro[_0x24750a(0x153)](datosRecibidos[_0x24750a(0x121)][_0x5a9ecd]))),_0x5a9ecd--;}_0x47a77d[_0x24750a(0x149)]>0x0?(_0x47a77d[_0x24750a(0x150)](),_0x47a77d[_0x24750a(0x112)](_0x847979=>$(_0x24750a(0x14b))[_0x24750a(0x103)]($(_0x24750a(0x14b))['html']()+_0x847979))):errorSys('#error',m1_SVC);}$(_0x24750a(0x155))[_0x24750a(0x13a)]();}else errorSys(_0x24750a(0xee),m1_SVC),$(_0x24750a(0x155))[_0x24750a(0x13a)]();}function cargarGrupos(_0x410c2a){const _0x3c2866=_0x2b318a;$(_0x3c2866(0xee))[_0x3c2866(0x103)](''),$(_0x3c2866(0x114))[_0x3c2866(0x103)](''),$(_0x3c2866(0xeb))[_0x3c2866(0x103)](''),gruposCentro[_0x3c2866(0x150)]((_0x2fc245,_0x4ac592)=>_0x2fc245[0x9]+_0x2fc245[0x8]-(_0x4ac592[0x9]+_0x4ac592[0x8])),gruposCentro['forEach'](_0x30ecfd=>{const _0x41fadc=_0x3c2866;let _0x51c9f7=null,_0x18c75e=null;_0x410c2a[_0x41fadc(0x117)]()==_0x30ecfd[0x0]&&(_0x51c9f7=_0x41fadc(0xec)+_0x30ecfd[0x0]+_0x30ecfd[0x8]+_0x30ecfd[0x9]+_0x41fadc(0xf2)+'\x20href=\x27#resultados_i\x27\x20role=\x27button\x27>'+_0x30ecfd[0x8]+_0x30ecfd[0x9]+_0x41fadc(0x14e),$(_0x41fadc(0x114))[_0x41fadc(0x103)]($('#resultados_g')['html']()+_0x51c9f7));});}function _0x4b3d(){const _0x26e0f2=['<i>Hoy\x20es\x20<strong>','816MDBIaL','#sSys','13559MKrMmV','md5','keypress','Main','</a><a\x20class=\x27btn\x20btn-outline-primary\x20text-start\x20m-2\x27','href','placeholder','<br>Correo\x20electrónico\x20(DA):\x20','<a\x20class=\x27btn\x20btn-outline-primary\x20text-start\x20m-2\x27','role=\x27button\x27\x20onclick=\x27copiarA(this)\x27>','fdocumentoda','click','<br>Correo\x20electrónico\x20(DR):\x20','open','which','fruee','</a><br>','writeText','6ADWZTy','<br><b>Docente\x20remoto:\x20</b>','indexOf','<br><b>Proveedor</b>:\x20','Coordinado\x20para\x20los\x20días:\x20','sábado','flocalidad','#resultados_i','<a\x20class=\x27btn\x20btn-outline-success\x20m-2\x27\x20id=\x27','<br>\x20Grupo\x20','#error','#user','index.html','then','\x27\x20onclick=\x27cargarInfo(this)\x27\x20','#aIndex','#buscarCentrosAsociados','lastIndexOf','val','#usuario','<b>ID\x20N°</b>\x20','#fruee','#avatar','setItem','Desde\x20la\x20fecha:\x20','1kXcitsVB06G-hv_2d2qdBCZWKn5U3yGCNUD-dwgUvRw','ready','main.html','https://content-sheets.googleapis.com/v4/spreadsheets/','6505630ngTRrP','1XS1ngb5eknIeXnfPsSHe5Hnk7XY5LcqQ1oD1DDjPHk0','html','441992DMPGdu','hide','</strong>\x20del\x20<strong>','innerText','17528Ewybea','Doc.\x20DR\x20(Ej.\x20rt58936592)','nombre','fdocumentodr','svc.html','</strong>\x20centros\x20(','representa\x20un\x20<strong>','urlImagen','domingo','info_territorio','forEach',':\x20<strong>','#resultados_g','#fdocumentoda','\x27\x20onclick=\x27cargarGrupos(','toString','test','!</p>','/values/','responseText','lunes','register','<b>Información\x20de\x20clases\x20de\x20Pensamiento\x20Computacional</b><br>','<b>Información\x20del\x20centro:\x20</b>',')<br>','values','catch','null','6MBZXgW','<center><div\x20class=\x27alert\x20alert-danger\x20m-2\x27role=\x27alert\x27>\x20¡UPS!\x20¡No\x20hay\x20resultados\x20para\x20la\x20consulta!</div></center>','#pass','Departamento:\x20','serviceWorker','11LdDgwj','./94kfd34dsla.js','attr','Departamento\x20(Ej.\x20Rocha)','#fdepartamento','martes','</strong>\x20grupos\x20distribuidos\x20en\x20<strong>','</strong>\x20%\x20del\x20total\x20de\x20centros)</a>','#flocalidad','12936HRnWir','slice','1729377gISSht','),\x20','input','warn','Index','120cpkLuP','focus','#eIndex','<center><div\x20class=\x27alert\x20alert-danger\x27role=\x27alert\x27>\x20¡UPS!\x20¡No\x20has\x20completado\x20todos\x20los\x20campos!</div></center>','Doc.\x20DA\x20(Ej.\x2047259101)','autocomplete','<p\x20class=\x27h2\x20text-secondary\x27>¡Bienvenid@\x20','<a\x20class=\x27btn\x20btn-outline-secondary\x20m-2\x27\x20id=\x27','includes','send','<a\x20class=\x27btn\x20btn-outline-success\x20m-1\x27\x20role=\x27button\x27\x20onclick=\x27copiarA(this)\x27>','keyCode','A:G','#infoTerritorio','getItem','<center><div\x20class=\x27alert\x20alert-danger\x27role=\x27alert\x27>\x20¡UPS!\x20¡Nombre\x20de\x20usuario\x20y/o\x20contraseña\x20incorrecto/s!</div></center>','length','info_territorio.html','#resultados_c','ghost','1479260OzdUQY','</a>','12kLL0bz0mwkP3EYJRrBG2aOUgEFcrRG3iIhm3n_fuQ8','sort','Error\x20al\x20tratar\x20de\x20registrar\x20el\x20SW','toLocaleDateString','push',')\x27\x20href=\x27#resultados_g\x27\x20role=\x27button\x27>','#valorfil','#mensajeGestion','getAttribute','Localidad\x20(Ej.Quebracho)','_self','SVC','83772uxYgDo','<center><div\x20class=\x27alert\x20alert-danger\x27role=\x27alert\x27>\x20¡UPS!\x20¡Parece\x20que\x20hay\x20un\x20problema\x20de\x20conexión!</div></center>','&key=','RUEE\x20(NNNNCCC)','</div>'];_0x4b3d=function(){return _0x26e0f2;};return _0x4b3d();}function _0x5ae8(_0x218059,_0x3d3486){const _0x4b3d78=_0x4b3d();return _0x5ae8=function(_0x5ae89e,_0x1597f9){_0x5ae89e=_0x5ae89e-0xe3;let _0x117ad5=_0x4b3d78[_0x5ae89e];return _0x117ad5;},_0x5ae8(_0x218059,_0x3d3486);}function cargarInfo(_0x377264){const _0x3deecd=_0x2b318a;$(_0x3deecd(0xee))[_0x3deecd(0x103)](''),$(_0x3deecd(0xeb))[_0x3deecd(0x103)](''),gruposCentro[_0x3deecd(0x112)](_0x4fb2b8=>{const _0x5d3fb7=_0x3deecd;let _0x3d8153=null;if(_0x377264[_0x5d3fb7(0x157)]('id')==_0x4fb2b8[0x0]+_0x4fb2b8[0x8]+_0x4fb2b8[0x9]){_0x3d8153=_0x5d3fb7(0x16b)+'role=\x27button\x27\x20onclick=\x27copiarA(this)\x27>'+_0x5d3fb7(0x11f)+_0x4fb2b8[0x0]+'\x20('+_0x5d3fb7(0xf8)+_0x4fb2b8[0x1]+_0x5d3fb7(0x120)+_0x5d3fb7(0x127)+_0x4fb2b8[0x2]+',\x20'+_0x4fb2b8[0x3]+'<br>'+_0x4fb2b8[0x4]+'\x20N°\x20'+_0x4fb2b8[0x5]+'\x20'+_0x4fb2b8[0x22]+_0x5d3fb7(0xed)+_0x4fb2b8[0x8]+_0x4fb2b8[0x9]+'\x20'+_0x4fb2b8[0x7]+_0x5d3fb7(0x14e)+_0x5d3fb7(0x16b)+_0x5d3fb7(0x16c)+'<b>Docente\x20de\x20aula:\x20</b>'+_0x4fb2b8[0xc]+'\x20'+_0x4fb2b8[0xd]+'\x20('+_0x4fb2b8[0xb]+'),\x20'+_0x5d3fb7(0x16a)+_0x4fb2b8[0xe]+'<br>Contacto\x20tel.\x20/\x20celular:\x20'+_0x4fb2b8[0xf]+_0x5d3fb7(0xe7)+_0x4fb2b8[0x13]+_0x5d3fb7(0xe5)+_0x4fb2b8[0x16]+'\x20'+_0x4fb2b8[0x17]+'\x20('+_0x4fb2b8[0x19]+_0x5d3fb7(0x135)+_0x5d3fb7(0x16f)+_0x4fb2b8[0x18]+_0x5d3fb7(0x167)+'role=\x27button\x27\x20onclick=\x27copiarA(this)\x27>'+_0x5d3fb7(0x11e)+_0x5d3fb7(0xe8)+_0x4fb2b8[0x1e]+'<br>'+'A\x20la\x20hora:\x20'+_0x4fb2b8[0x1f]+'<br>'+_0x5d3fb7(0xfc)+_0x4fb2b8[0x21]+_0x5d3fb7(0x14e),$(_0x5d3fb7(0xeb))[_0x5d3fb7(0x103)](_0x3d8153);return;}});}function cargarInfoTerritorio(_0x3dc52b){const _0x3a3380=_0x2b318a;if(_0x3dc52b==undefined||_0x3dc52b[_0x3a3380(0x121)][_0x3a3380(0x149)]<=0x1)errorSys('#a',m2_Index),$('#infoTerritorio')[_0x3a3380(0x103)]('');else{$('#a')[_0x3a3380(0x103)]('<strong>¡Atención!</strong>\x20Última\x20actualización\x20del\x20sistema\x20'+'desde\x20S.V.C:\x20<strong>'+_0x3dc52b[_0x3a3380(0x121)][0x0][0x2]+'</strong>');let _0x1a6f1b=null;_0x1a6f1b='-\x20'+_0x3dc52b[_0x3a3380(0x121)][0x0][0x0]+':\x20<strong>'+_0x3dc52b[_0x3a3380(0x121)][0x0][0x1]+'</strong><br>'+'-\x20'+_0x3dc52b[_0x3a3380(0x121)][0x1][0x0]+_0x3a3380(0x113)+_0x3dc52b['values'][0x1][0x1]+'</strong><hr>';let _0x2d63f1=0x2;while(_0x2d63f1<_0x3dc52b['values'][_0x3a3380(0x149)]){_0x1a6f1b=_0x1a6f1b+_0x3a3380(0x143)+_0x3dc52b[_0x3a3380(0x121)][_0x2d63f1][0x0]+',\x20tiene\x20<strong>'+_0x3dc52b[_0x3a3380(0x121)][_0x2d63f1][0x2]+_0x3a3380(0x12f)+_0x3dc52b['values'][_0x2d63f1][0x3]+_0x3a3380(0x10d)+_0x3a3380(0x10e)+_0x3dc52b['values'][_0x2d63f1][0x4]+_0x3a3380(0x130)+_0x3a3380(0x143)+_0x3dc52b[_0x3a3380(0x121)][_0x2d63f1][0x5]+_0x3a3380(0x14e)+_0x3a3380(0x143)+_0x3dc52b['values'][_0x2d63f1][0x6]+_0x3a3380(0x173),_0x2d63f1++;}$(_0x3a3380(0x146))[_0x3a3380(0x103)](_0x1a6f1b);}}