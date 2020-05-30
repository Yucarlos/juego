//VARIABLES GENERALES
var puntosAcumulados = 0;
var colE = [];
var filE = [];
var click = 0;
var move = 0;
var swmove=0;
//INICIO DEL JUEGP
$(function () {
  
   $(".btn-reinicio").on("click", function () {
      click++;
      $('.btn-reinicio').text('Reiniciar');
      puntosAcumulados = 0;
      white();
      cronometro();
      crearMatriz()
   })
})

// FUNCION QUE CREA UNA MATRIZ DE SEIS FILA Y SIETE COLUMNAS , LAS LLENA CON LAS NUMEROS ALEATORIOS
//DEL 1 AL 4, QUE SERAN LA REFERENCIA DE LAS IMAGENES Y LAS ANEXA EN  CADA <div> DEL HTML 
function crearMatriz() {
   if (click == 1) {
      var fila = 6;
      var colum = 7;
      var matriz = new Array();
      for (var i = 0; i < fila; i++) {
         matriz[i] = new Array();
         for (var j = 0; j < colum; j++) {
            var numero = Math.floor((Math.random() * 4) + 1);
            matriz[i][j] = numero;
            var col = j + 1;
            $(".col-" + col + "").append("<img src='image/" + numero + ".png'/>").sortable();
         }
      }
      buscarigualesH(matriz);
   } else {
      location.reload();
   }
}

//FUNCION QUE CAMBIA EL TITULO A BLANCO
function white() {
   $(".main-titulo").delay(500).animate({
      color: '#fff'
   }, 10, function () {
      yellow();
   })
}
//FUNCION QUE CAMBIA EL TITULO AMARILLO
function yellow() {
   $(".main-titulo").delay(500).animate({
      color: '#DCFF0E'
   }, 10, function () {
      white();
   })
}
//FUNCION QUE BUSCA NUMEROS IGUALES EN LAS FILAS DE LA MATRIZ Y CREA UN ARREGLO CON SOLO ELLOS
//PARA LUEGO SELECCIONAR LOS CONSECUTIVOS Y DESPUES LLAMA LA FUNCION QUE HARA LO MISMO EN LAS COLUMNAS
function buscarigualesH(matriz) {
   var fila = new Array();
   var newfila = new Array();
   var figura = 1;
   var filah = 0;
   for (var figura = 1; figura < 5; figura++) {
      for (var i = 0; i < 6; i++) {
         for (var j = 0; j < 7; j++) {
            fila.push(matriz[i][j]);
         }
         filah = i;
         var indice = fila.indexOf(figura);
         while (indice != -1) {
            newfila.push(indice);
            indice = fila.indexOf(figura, indice + 1);
         }

         long = newfila.length;
         consecutivosH(newfila, long, figura, filah, matriz);
         newfila = [];
         fila = [];
         filah = 0;

      }
      col1 = [];
   }

   buscarigualesV(matriz);
}

//FUNCION QUE BUSCA NUMEROS IGUALES EN LAS COLUMNAS DE LA MATRIZ PARA LUGO LLAMAR
// UNA FUNCION QUE SELECIONA SOLO LOS CONSECUTIVOS  Y CREA UN ARREGLO CON SOLO ELLOS
function buscarigualesV(matriz) {
   var coluv = [];
   var col = 0;
   newcolumn = [];
   var imagen = 0;
   while (imagen < 4) {
      imagen = imagen + 1;
      for (var col = 0; col < 7; col++) {
         for (var i = 0; i < 6; i++) {
            coluv.push(matriz[i][col]);
         }

         var indice = coluv.indexOf(imagen);
         while (indice != -1) {
            newcolumn.push(indice);
            indice = coluv.indexOf(imagen, indice + 1);
         }
         long = newcolumn.length;
         consecutivosV(newcolumn, col, long);
         coluv = [];
         newcolumn = [];
      }
   }
   eliminar(matriz);
}

//FUNCION QUE SOLO BUSCA LOS CONSECUTIVOS EN LAS FILAS DE LA MATRIZ QUE SEAN MAS DE TRES
//Y CREA UN ARREGLO CON SU UBICACION EN LA MATRIZ 
function consecutivosH(newfila, long, figura, filah, matriz) {
   var a = Math.round((long - 1) / 2);
   var b = newfila[a];
   var c = b - a;
   var puntos = 0;
   var result = newfila.filter((num, index) => (num == c + index)); {
      var largo = result.length;
      if (largo >= 3) {
         puntos = largo * 10;

         for (var h = 0; h < largo; h++) {
            var colu = result[h] + 1;
            var fil = filah + 1;
            colE.push(result[h]); filE.push(filah)
         }
      } puntosAcumulados = puntosAcumulados + puntos;
      $("#score-text").text(puntosAcumulados);
   }
}
//FUNCION QUE SOLO BUSCA LOS CONSECUTIVOS EN LAS COLUMNAS DE LA MATRIZ  QUE SEAN  MAS DE TRES
// CREA UN ARREGLO CON SU UBICACION EN LA MATRIZ, ASI COMO DEPURA SI EXISTE UN MACHT QUE COINCIDA 
//CON UNO UBICADO EN LA FILA

function consecutivosV(newcolumn, col, long) {
   var a = Math.round((long - 1) / 2);
   var b = newcolumn[a];
   var c = b - a;
   var puntos = 0;
   var result = newcolumn.filter((num, index) => (num == c + index)); {
      var largo = result.length;
      var colE1 = colE;
      var filE1 = filE;
      var revisarcolE = colE1.length;
      if (largo >= 3) {

         for (var h = 0; h < largo; h++) {
            for (var r = 0; r < revisarcolE; r++) {
               if (colE1[r] == col && filE1[r] == result[h]) {
                  colE.splice(r, 1); filE.splice(r, 1);
                  puntos = puntos - 1;
               }
            } colE.push(col); filE.push(result[h]);

         } colE1 = []; filE1 = []; puntos = largo * 10;
      }
      puntosAcumulados = puntosAcumulados + puntos;
      $("#score-text").text(puntosAcumulados);
   }
}
//FUNCION QUE ELIMINA LAS IMAGENES QUE SEAN MACHT EN EL HTML, ESTA TAMBIEN VERIFICA SI NO HAY MACHT Y 
//ACTIVA PARA LOS MOVIMIENTOS DEL JUGADOR 
function eliminar(matriz) {
   var longitud = colE.length;
   var columnaInsertar = [];
   if (longitud == 0) {

      $( "img" ).mousedown(function() {
     swmove=1;
  })
  .mouseup(function() {
   if(longitud==0 && swmove == 1){
      move++
   }
  $( "#movimientos-text" ).text( move );
     if (swmove==1){
      postMacht(longitud, columnaInsertar, matriz);
     }
   swmove=0;
  });

      
   } else {
      for (var e = 0; e < longitud; e++) {
         var ce = colE[e] + 1;
         var fe = filE[e] + 1;
         $(".col-" + ce).children("img:nth-child(" + fe + ")").hide("pulsate", 1000, function eliminar() {
            $(this).remove();
         });
         columnaInsertar.push(ce);
      }
      postMacht(longitud, columnaInsertar, matriz)

   }
}

//FUNCION QUE LLAMA DOS FUNCIONES PARA ADICIONAR IMAGENES EN EL HTML, Y LLENAR LA MATRIZ NUEVAMENTE 
//PARA VERIFICACION DE MACHT
function postMacht(longitud, columnaInsertar, matriz) {
   setTimeout(function () {
      addimgcolumnas(longitud, columnaInsertar);
   }, 1100);

   setTimeout(function () {
      llenarMatriz(matriz);
   }, 1500);
}

//FUNCION QUE AGREGA LAS IMAGENES EN EL HTML DESPUES DE HABER SIDO ELIMINADAS Y POCISIONA 
//NUEVAS IMAGENES ALEATORIAMENTE 
function addimgcolumnas(longitud, columnaInsertar) {
   for (var n = 0; n < longitud; n++) {
      var numero = Math.floor((Math.random() * 4) + 1);
      $(".col-" + columnaInsertar[n]).prepend("<img src='image/" + numero + ".png'/>").sortable();
   }
   colE = [];
   filE = [];
}
//FUNCION QUE LLENA LA MATRIZ CON LAS IMAGENES DEL HTML Y COMIENZA EL CICLO NUEVAMENTE
function llenarMatriz(matriz) {
   colu_insertar = [];

   for (var cli = 1; cli < 8; cli++) {
      var clo = cli - 1;
      for (var fli = 1; fli < 7; fli++) {
         $.each($('.col-' + cli).children("img:nth-child(" + fli + ")"), function (i, l) {
            var src = $(l).attr('src');
            var tarr = src.split('/');
            var file = tarr[tarr.length - 1];
            var num = file.split('.')[0];
            var numeral = parseInt(num);
            colu_insertar.push(numeral);

         });

      }
      $.each(colu_insertar, function (indice, nimg) {
         matriz[indice].splice(clo, 1, nimg);
      });

      colu_insertar = [];
   } 
     buscarigualesH(matriz);
}