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



		function setNivel_1(){

			//iwcontroll <=> button sube pestañas;
			$('.iwcontroll').click(function(event) {

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
						// 	button: "Lo haré",
						// });
						$('.capa').removeClass('zoom zoom-pantalon zoom-chaqueta'); 
						$('#maniqui-wrapper-front').animate({'opacity': 1, 'left': -25+'%'},'fast');
						$('#maniqui-wrapper-back').animate({'opacity': 1, 'left': +25+'%'},'fast');
						$('div#resumen-visible').css({'display': 'block'});
						// TAILOR.setSummary('iw-init.js');
						break;

						default: break;
					}

					//SUBO MI NIVEL
					$(this).parent('.iwctrls').find('.row-level-2').slideDown("fast");

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
		

		function setNivel_3(){
			return;
		}


		
		ACCORDION.init = function(){

			jQuery(document).ready(function($) {

				//Cambia la resolución al 68% del height del dispositivo;
				setScene();

				//Activa el NIVEL1 de la satrería (slideUp/slideDown)
				setNivel_1();

				//Activa el NIVEL2 de la sastrería (accordion)
				setNivel_2();

				//Activa el NIVEL3 de la sastrería (sacar opciones de cada selección)
				setNivel_3();

				swal({
					title: "¡Recuerda ser coherente con los colores de tu traje!",
					text: "No todos los colores quedan bien juntos... puedes dejarte asesorar por nuestros sastres en tu visita a tienda",
					icon: "success",
					button: "Lo haré",
				});

			});
			

		}

	}(ACCORDION, $, TAILOR));



