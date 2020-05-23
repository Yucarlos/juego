var puntosAcumulados=0;
$(function () {
   
   $(".btn-reinicio").on("click", function () {
      $('.btn-reinicio').text('Reiniciar');
     puntosAcumulados=0;
      white();
      function white(){
         $(".main-titulo").delay(500).animate({
           color: '#fff'
         }, 10, function(){
           yellow();
         })
       }

       function yellow(){
         $(".main-titulo").delay(500).animate({
           color: '#DCFF0E'
         }, 10, function(){
           white();
         })
       }
      cronometro();
       
      var col1=[];
      var fila = 6;
      var colum = 7;
      var matriz = new Array();
      for (var i = 0; i < fila; i++) {
         matriz[i] = new Array();
         
         for (var j = 0; j < colum; j++) {
            var numero = Math.floor((Math.random() * 4) + 1);
            matriz[i][j] = numero;
            var col = j + 1;
            $(".col-" + col + "").append("<img src='image/" + numero + ".png'/>").sortable();;
         }
      } 
      $(".panel-tablero")
      buscarigualesH(matriz);
      buscarigualesV(matriz);
      
   })  
  })

 function buscarigualesH(matriz) {
   var fila = new Array();
   var newfila = new Array();
   var figura = 1;
   var filah=0;
   for (var figura = 1; figura < 5; figura++){
      for (var i = 0; i < 6; i++)  {
         for (var j = 0; j < 7; j++) {
         fila.push(matriz[i][j]);
         }
         filah=i;
         var indice = fila.indexOf(figura);
         while (indice != -1) {
            newfila.push(indice);
            indice = fila.indexOf(figura, indice + 1);
         }
      
         long = newfila.length;
         consecutivosH(newfila, long,figura,filah,matriz);
         newfila = [];
         fila = [];
         filah=0;
         
      }
      col1=[];
   } 
     
 }

function  buscarigualesV(matriz) { 
    var coluv=[];
    var col=0;
    newcolumn=[];
    var imagen=0;
    while  ( imagen < 4) {
      imagen=imagen+1;
      for (var col=0; col < 7; col++){
         for (var i=0; i < 6; i++){
            coluv.push(matriz[i][col]);
         } 
   
         var indice = coluv.indexOf(imagen);
         while (indice != -1) {
            newcolumn.push(indice);
            indice = coluv.indexOf(imagen, indice + 1);
         } 
          long=newcolumn.length;
          consecutivosV(newcolumn,col,long);
          coluv=[];
          newcolumn=[];
       }  
   }
    
 }
 
 function consecutivosH(newfila, long,figura,filah,matriz) {
   var a = Math.round((long-1)/2);
   var b = newfila[a];    
   var c = b-a;   
   var puntos= 0;
   var result = newfila.filter((num,index) => (num == c + index));{
      var largo= result.length; 
      if (largo >=3){
         puntos=largo * 10;
   
         for (var h=0; h < largo; h++){
            var colu= result[h] + 1;
            var fil = filah + 1;
           $(".col-" + colu ).children("img:nth-child("+fil+")").hide("pulsate",3000,function eliminar(){
               $(this).remove();
            });//matriz[filah].splice(result[h],1);console.log(filah,result[h]);
         }  
      }  puntosAcumulados= puntosAcumulados + puntos; 
         $("#score-text").text(puntosAcumulados);
   }
 } 

 function consecutivosV(newcolumn,col,long) {
   var a = Math.round((long-1)/2);
   var b = newcolumn[a];    
   var c = b-a;   
   var puntos= 0;
   var result = newcolumn.filter((num,index) => (num == c + index));{
      var largo= result.length; 
      if (largo >=3){
         puntos=largo * 10;
         for (var h=0; h < largo; h++){
            var fila= result[h] + 1;
            var clna = col + 1;
           $(".col-" + clna ).children("img:nth-child("+fila+")").hide("pulsate",3000,function eliminar(){
               $(this).remove();
            });
         }  
      }  puntosAcumulados= puntosAcumulados + puntos; 
         $("#score-text").text(puntosAcumulados);
   }
 } 
