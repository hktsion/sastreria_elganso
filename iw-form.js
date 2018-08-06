'use strict';
var $ = jQuery.noConflict();

(function(CONTACTO, DOC, $){


	function enviarFormulario(){
		$('#enviar-sastreria').click(function(ev){
			ev.preventDefault();
		
			//TAILORSHOP CONTIENE TODAS LAS PREFERENCIAS QUE HAYA SELECCIONADO EL USUARIO;
			//formdata => Contiene los datos del formulario (CUIDADO QUE NO ESTÁN VALIDADOS);

			//METER LA URL DONDE VA EL PHP CON LOS DATOS PARA LA INSERCIÓN DE PREFERENCIAS DE USUARIOS

			$.ajax({
				url: '/path/to/file',
				type: 'post',
				data: {
					'formu': formdata(),
					'tienda' : TAILORSHOP
				},
			})
			.done(function(data) {
				console.log("success");
			})
			.fail(function(err) {
				console.log("error");
			});
		
		});
	}


	function mostrarPopUp(){
		$('#iwopen').on('click', function(event){
			event.preventDefault();
			$('#iwform').fadeIn('slow');
			$('.iwform-overlay').fadeIn('slow');
			$('.iwform-overlay').height($(window).height());
			return false;
		});

		$('#close').on('click', function(){
			$('#iwform').fadeOut('slow');
			$('.iwform-overlay').fadeOut('slow');
			return false;
		});
	}

	function formdata(){

		let fdata = {};
		//let formu = $('#iwform-form');
		fdata['nombre'] = $('#iwnombre').val();
		fdata['apellidos'] = $('#iwapellidos').val();
		fdata['telefono'] = $('#iwtelefono').val();
		fdata['horario'] = $('#iwhorario').val();
		fdata['tienda'] = $('#iwtienda').val();

		return fdata;
	}


	function addListeners(){
		mostrarPopUp();
		enviarFormulario();
	}



	CONTACTO.init = function(){
		addListeners();
	}
}(CONTACTO, document, $));



