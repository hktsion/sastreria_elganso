'use strict';
var $ = jQuery.noConflict();

(function(CONTACTO, DOC, $){

	var nombre = $('#iwnombre');
	var apellidos = DOC.getElementById('iwapellidos');
	var email = DOC.getElementById('iwemail');
	var telefono = DOC.getElementById('iwtelefono');
	var patt = null;


	function enviarFormulario(){
		$('#enviar-sastreria').click(function(ev){
			ev.preventDefault();
			if(validarform()){
				//TAILORSHOP CONTIENE TODAS LAS PREFERENCIAS QUE HAYA SELECCIONADO EL USUARIO;
				console.log(TAILORSHOP);
				//formdata => Contiene los datos del formulario (CUIDADO QUE NO ESTÁN VALIDADOS);
				console.log(formdata());

				//METER LA URL DONDE VA EL PHP CON LOS DATOS PARA LA INSERCIÓN DE PREFERENCIAS DE USUARIOS
				$.ajax({
					url: 'URL DE DESTINO',
					type: 'post',
					data: {
						'cliente': formdata(),
						'sastreria' : TAILORSHOP
					}
				})
				.done(function(data) {
					console.log("success");
					console.log(data);
				})
				.fail(function(err) {
					console.log(err);
					console.log("error");
				});
			}
		});
	}


	function validarform(){
		var datafdata = formdata();
		var res1 = false;
		var res2 = false;
		var res3 = false;
		var res4 = false;

		//validación de nombre
		if('' == datafdata['nombre'].trim()){
			$('#iwnombre').parents('.field').find('p.iwerror').text('Introduce tu nombre.');
			$('#iwnombre').parents('.field').find('p.iwerror').slideDown('400');
			res1 = false;
		}else{
			$('#iwnombre').parents('.field').find('p.iwerror').text('');
			$('#iwnombre').parents('.field').find('p.iwerror').slideUp('400');
			res1 = true;
		}

		//validación de apellidos
		if('' == datafdata['apellidos'].trim()){
			$('#iwapellidos').parents('.field').find('p.iwerror').text('Introduce tus apellidos.');
			$('#iwapellidos').parents('.field').find('p.iwerror').slideDown('400');
			res2=false;
		}else{
			$('#iwapellidos').parents('.field').find('p.iwerror').text('');
			$('#iwapellidos').parents('.field').find('p.iwerror').slideUp('400');
			res2=true;
		}


		//validación de email
		if('' == datafdata['email'].trim()){
			$('#iwemail').parents('.field').find('p.iwerror').text('El campo email no puede quedar vacío.');
			$('#iwemail').parents('.field').find('p.iwerror').slideDown('400');
			res3=false;
		}else{
			patt = new RegExp("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})");
			if(patt.test(datafdata['email'])){
				$('#iwemail').parents('.field').find('p.iwerror').text('');
				$('#iwemail').parents('.field').find('p.iwerror').slideUp('400');
				res3=true;
			}else{
				$('#iwemail').parents('.field').find('p.iwerror').text('Introduce un email válido.');
				$('#iwemail').parents('.field').find('p.iwerror').slideDown('400');
				res3=false;
			}
		}

		//validación de teléfono
		if('' == datafdata['telefono'].trim()){
			$('#iwtelefono').parents('.field').find('p.iwerror').text('Introduce un teléfono de contacto.');
			$('#iwtelefono').parents('.field').find('p.iwerror').slideDown('400');
			res4=false;
		}else{
			patt = new RegExp("[6|9][0-9]{8}");
			if(patt.test(datafdata['telefono'])){
				$('#iwtelefono').parents('.field').find('p.iwerror').text('');
				$('#iwtelefono').parents('.field').find('p.iwerror').slideUp('400');
				res4=true;
			}else{
				$('#iwtelefono').parents('.field').find('p.iwerror').text('Introduce un teléfono de contacto válido.');
				$('#iwtelefono').parents('.field').find('p.iwerror').slideDown('400');
				res4=false;
			}
			
			res4=true;
		}
		
		return res1&&res2&&res3&&res4;
	}



	function mostrarPopUp(){
		$('#iwopen').on('click', function(event){
			event.preventDefault();
			$('#iwform').fadeIn('slow');
			$('.iwform-overlay').fadeIn('slow');
			$('.iwform-overlay').height($(window).height());
			return false;
		});

		$('#iwopenmobile').on('click touchstart', function(event){
			event.preventDefault();
			$('#iwform').fadeIn('slow');
			$('.iwform-overlay').fadeIn('slow');
			$('.iwform-overlay').height($(window).height());
			$('.iwform-overlay').css({'background': 'rgba(0,0,0,0.7)'});
			return false;
		});

		$('#close').on('click', function(){
			$('#iwform').fadeOut('slow');
			$('.iwform-overlay').fadeOut('slow');
			return false;
		});
	}

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

	function formdata(){

		var fdata = {};
		//let formu = $('#iwform-form');
		fdata['nombre'] = $('#iwnombre').val().trim().toLowerCase();
		fdata['apellidos'] = $('#iwapellidos').val().trim().toLowerCase();
		fdata['email'] = $('#iwemail').val().trim().toLowerCase();
		fdata['telefono'] = $('#iwtelefono').val().trim().toLowerCase();
		fdata['horario'] = $('#iwhorario').val().trim().toLowerCase();
		fdata['tienda'] = $('#iwtienda').val().trim().toLowerCase();

		fdata['nombre'] = fdata['nombre'].replace(/[|&;$%@"<>()+,]/g, "");
		fdata['apellidos'] = fdata['nombre'].replace(/[|&;$%@"<>()+,]/g, "");
		fdata['email'] = fdata['nombre'].replace(/[|&;$%@"<>()+,]/g, "");
		fdata['telefono'] = fdata['nombre'].replace(/[|&;$%@"<>()+,]/g, "");
		fdata['horario'] = fdata['horario'].replace(/[|&;$%@"<>()+,]/g, "");
		fdata['tienda'] = fdata['tienda'].replace(/[|&;$%@"<>()+,]/g, "");

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



