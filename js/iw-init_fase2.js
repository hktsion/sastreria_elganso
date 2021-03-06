'use strict';
var $ = jQuery.noConflict();

(function(ACCORDION, $){


	/*Hace que la escena se adapte al ancho y largo de la pantalla del usuario*/
	function setScene(){
		$('#iwmain').width(screen.width);
		$('#iwmain').height(0.68*screen.height);
	}

	function setNivel_2(){
			//ACORDEÓN
			let acc = document.getElementsByClassName("accordion");

			for (let i = 0; i < acc.length; i++) {
				acc[i].addEventListener("click", function() {
					this.classList.toggle("active");

					//hace que sólo se abra una pestaña
					$(this).parent('.row-level-2')
					.siblings('.row-level-2')
					.find('.panel')
					.css({ display: 'none'});

					//quita la clase active (Color gris)
					$(this).parent('.row-level-2')
					.siblings('.row-level-2')
					.find('.accordion').removeClass('active');

					//panel que contiene las opciones para cada una de las propiedades: liso/ojodeperdiz/rayadiplomatica...
					let panel = this.nextElementSibling;

					if (panel.style.maxHeight){
						if(!$(this).hasClass('active')){
							panel.style.opacity = 0;
							panel.style.display = 'none';
							panel.style.maxHeight = null;
						}else{
							let op = 0;
							panel.style.display = 'block';
							let idinterval = setInterval(function(){
								op+=0.18;
								panel.style.opacity = op;
								if(op>1){ panel.style.opacity = 1; clearInterval(idinterval);}
							}, 45);
							panel.style.maxHeight = panel.scrollHeight + "px";
						}
					} else {
						let op = 0;
						panel.style.display = 'block';
						let idinterval = setInterval(function(){
							op+=0.18;
							panel.style.opacity = op;
							if(op>1){ panel.style.opacity = 1; clearInterval(idinterval);}
						}, 45);
						panel.style.maxHeight = panel.scrollHeight + "px";
					} 
				});
			}
		}

	// 	function detectmob() { 
	// 		if( navigator.userAgent.match(/Android/i)
	// 			|| navigator.userAgent.match(/webOS/i)
	// 			|| navigator.userAgent.match(/iPhone/i)
	// 			|| navigator.userAgent.match(/iPad/i)
	// 			|| navigator.userAgent.match(/iPod/i)
	// 			|| navigator.userAgent.match(/BlackBerry/i)
	// 			|| navigator.userAgent.match(/Windows Phone/i)
	// 			){
	// 			return true;
	// 	}
	// 	else {
	// 		return false;
	// 	}
	// }

	// function isMobile(){
	// 	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {return true;}
	// 	return false;
	// }

	function isMobile() {
		if(window.innerWidth < 800) {
			return true;
		} else {
			return false;
		}
	}

	function setNivelesMobile(){
		$('#resumen-visible-mobile section').css({'display': 'none'});
		$('#resumen-visible-mobile .opcion').css({'display': 'none'});
		console.log('********** resumen visible para mobile ****************');
		console.log($('#resumen-visible-mobile section'));
		console.log('********** resumen visible para mobile ****************');
	}



	function setNivel_1(){

			//iwcontroll <=> button sube pestañas;
			$('.iwcontroll').on('click touch', function(event) {

				//Muestra el modelo, por si hay alguna ilustración en pantalla;
				MOVEMENTS.mostrarModeloFront();

				//Paneles cerrados cada vez que se hace click en una ventana;
				$('.panel').css({display: 'none' });
				$('.accordion').removeClass('active');

				if($(this).attr('data-up') == 'false'){
					//Zoom sobre el hombrecillo: chaqueta/pantalón
					switch (event.target.dataset.value) {
						case 'chaqueta':
						$('.capa').addClass('zoom zoom-chaqueta'); 
						$('.capa').removeClass('zoom-pantalon');
						$('#maniqui-wrapper-front').css({'opacity': 1});
						$('#maniqui-wrapper-back').css({'opacity': 0});
						break;

						case 'pantalon': 
						$('.capa').addClass('zoom zoom-pantalon');
						$('.capa').removeClass('zoom-chaqueta'); 
						$('#maniqui-wrapper-front').css({'opacity': 1});
						$('#maniqui-wrapper-back').css({'opacity': 0});
						break;

						case 'resumen':  
						// swal({
						// 	title: "¡Recuerda ser coherente con los colores de tu traje!",
						// 	text: "No todos los colores quedan bien juntos... puedes dejarte asesorar por nuestros sastres en tu visita a tienda",
						// 	icon: "success",
						// 	button: "Cerrar",
						// });

						/*giro del personaje*/
						$('.capa').removeClass('zoom zoom-pantalon zoom-chaqueta'); 

						$('#maniqui-wrapper-front').animate({'opacity': 1, 'left': -25+'%'},'fast');
						$('#maniqui-wrapper-back').animate({'opacity': 1, 'left': +25+'%'},'fast');

						//resumen visible para vesión STANDARD
						if(!isMobile){ 
							$('div#resumen-visible').css({'display': 'block'}); 
							$('#maniqui-wrapper-front').animate({'opacity': 1, 'left': -19+'%'},'fast');
							$('#maniqui-wrapper-back').animate({'opacity': 1, 'left': +40+'%'},'fast');
						}
						break;

						default: break;
					}


					/*********************************  R E S U M E N   M O B I L E  ******************************************/
					/**********************************************************************************************************/

					//SUBIR NIVEL DE RESUMEN;
					if(event.target.dataset.value == 'resumen' && !isMobile()){
						$(this).parent('.iwctrls').find('.row-level-2').slideDown("fast");
						$('#iwmain .iwctrls.resumencontroll .row-level-2').css({'display': 'none'});
						//$(this).removeAttr('data-up');
						$(this).attr({'data-up': 'true'});
						$(this).parent('.iwctrls').siblings('.iwctrls').find('.row-level-2').slideUp("fast");
						return;
						//#resumen-visible-mobile
						//#iwmain .iwctrls.resumencontroll .row-level-2
					}

					//es resumen y móvil => sube el nivel
					if(event.target.dataset.value == 'resumen' && isMobile()){
						$(this).parent('.iwctrls').find('.row-level-2').slideDown("slow");
						$('#resumen-visible-mobile').css({'display': 'block'});
						
						//$('#resumen-visible-mobile section').css({'display': 'none'});
						//$('#resumen-visible-mobile .opcion').css({'display': 'none'});
					}
					//subo el nivel
					if(event.target.dataset.value != 'resumen'){
						$(this).parent('.iwctrls').find('.row-level-2').slideDown("fast");
					}
					/**********************************************************************************************************/

					$(this).parent('.iwctrls').find('.row-level-2').slideDown("fast");
					$('#iwmain .iwctrls.resumencontroll .row-level-2').css({'display': 'none'});
					//$(this).removeAttr('data-up');
					$(this).attr({'data-up': 'true'});

					//BAJO EL RESTO DE NIVELES
					$(this).parent('.iwctrls').siblings('.iwctrls').find('.row-level-2').slideUp("fast");

					//PONGO LOS ATTRS DE LOS BROTHERS A FALSE
					$.each($(this).parent('.iwctrls').siblings('.iwctrls').find('.iwcontroll'), function(index, val) {
						$(this).attr({'data-up': 'false'});
					});

					//MI BUTTON LO PONGO A TRUE (está desplegado/subido)
					$(this).attr({ 'data-up': 'true' });
					return;
				}

				if($(this).attr('data-up') == 'true'){
					$('.capa').removeClass('zoom zoom-pantalon zoom-chaqueta');
					//BAJO MI NIVEL
					$(this).parent('.iwctrls').find('.row-level-2').slideUp("fast");
					$(this).attr({ 'data-up': 'false' });
					return;
				}
			});
}


ACCORDION.init = function(){

	jQuery(document).ready(function($) {

				//Cambia la resolución al 68% del height del dispositivo;
				//setScene();

				//Activa el NIVEL1 de la satrería (slideUp/slideDown)
				setNivel_1();

				//Activa el NIVEL2 de la sastrería (accordion)
				setNivel_2();

				//setNivelesMobile();
				
				// swal({
				// 	title: "¡Recuerda ser coherente con los colores de tu traje!",
				// 	text: "No todos los colores quedan bien juntos... puedes dejarte asesorar por nuestros sastres en tu visita a tienda",
				// 	icon: "success",
				// 	button: "Lo haré",
				// });

			});


}

}(ACCORDION, $, TAILOR));



