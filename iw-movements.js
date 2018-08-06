;
'use strict';
var $ = jQuery.noConflict();

(function(MOVEMENTS, $){
	'use strict';

	MOVEMENTS.mostrarModeloFront = function(){
		$('#resumen-visible').animate({'opacity': 1,},'2000');
		$('#maniqui-wrapper-front').css({'opacity': 1});
		$('#maniqui-wrapper-back').css({'opacity': 0});
		$('.maniqui-wrapper').css({left: '0%'});
		$('.ilustracion').css({left: '250%'});
	}

	MOVEMENTS.mostrarModeloBack = function(flag){
		$('#maniqui-wrapper-front').animate({'opacity': 0}, 'medium');
		$('#maniqui-wrapper-back').animate({'opacity': 1}, 'medium');
	}

	MOVEMENTS.noMostrarModelo = function(data){
		$('#maniqui-wrapper-front').animate({'left': '250%', 'opacity':0}, 'medium');
	}

	MOVEMENTS.cambiarElForro = function (url, callback){
		let object_data = $(".ilustracion.forro > object").attr('data');
		$(".ilustracion.bajocuello").css({'left': '250%', 'opacity':0});
		$('#resumen-visible').animate({'opacity': 0,},'300');
		//if(TAILOR.isVisibleBajoCuello){	$('.ilustracion.bajocuello').css({'display': 'none'}); } 
		$(".ilustracion.forro > object").attr('data', url);

		setTimeout(callback, 300);
	}


}(MOVEMENTS, $));