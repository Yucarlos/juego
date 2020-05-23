function cronometro() {
	var s = 60;
	var m = 1;
	var tiempo = setInterval(micronometro, 1000);

	function micronometro() {
		s = s - 1;
		$('#timer').text("0" + m + ":" + s);

		if (s == 0 && m == 1) {
			m = 0;
			s = 60;
		}

		if (s == 0 && m == 0) {
			$('.panel-tablero').hide(900);
			$('.panel-score').animate({width: '100%'}, 1000, function () {
					$(this).prepend("<h2 class='titulo-over'>Juego Terminado</h2>")
				})
			$('.time').hide(500)
			$('#score-text').hide()
			$('.score').append("<span class='data-info' id='score-final'>" + puntosAcumulados + "</span>")
		}
	}
}
