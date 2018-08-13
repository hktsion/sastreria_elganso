'use strict';

(function(TAILOR, DOC, SS, SUMMARY, $){

	//------------------------------------------------------------------> VARIABLES
	let otherLayer = '';
	let mainkeys = '';
	let fillcolor = '';

	//------------------------------------------------------------------> VARIABLES DE VISUALIZACIÓN
	TAILOR.isVisibleForro = false;
	TAILOR.isVisibleBajoCuello = false;
	TAILOR.isVisibleModeloFront = false;
	TAILOR.isVisibleModeloBack = false;
	TAILOR.isVisiblePantalon = false;

	//------------------------------------------------------------------> ALMACENAMIENTO
	
	SS.TAILORSHOP = {};


	//------------------------------------------------------------------> INICIALIZACIÓN DE LA APP
	//@mainkeys: ['cahqueta', 'pantalon']
	//@addlisteners: añade por primera vez los listeners al DOM
	function inicializarApp(){
		//$('#resumen-visible').slideUp();
		mainkeys = Object.keys(TAILORSHOP);
		initSVG();
		addRadioListeners();
		addSpecialButtonListeners('.accordion');
	}

	//------------------------------------------------------------------> FUNCIONES DE INICIALIZACIÓN

	//Inicializa los SVG para que no tengan puntitos
	function initSVG(){
		let docframes = DOC.querySelectorAll('object');
		for (let i = 0; i < docframes.length; i++) {
			let fillElements = (docframes[i].contentDocument).querySelectorAll('.color2');
			for (let j = fillElements.length - 1; j >= 0; j--) {
				fillElements[j].setAttribute('fill', 'transparent');
			}
		}
	}

	//Cambiar la función por la función que verifique si es
	function isMobile() {
		if(window.innerWidth < 800) {
			return true;
		} else {
			return false;
		}
	}

	//------------------------------------------------------------------ FUNCIONES DE ILUSTRACIONES
	//Muestra ILUSTRACIÓN COMPLETA
	TAILOR.mostrarIlustracion = function(datav_a, datav_b){
		//Quita de pantalla estos elementos
		$('.maniqui-wrapper').css({'left': '100%'	});
		$('.maniqui-wrapper').removeClass('zoom');


		$('#resumen-visible').animate({'opacity': 0,},'200');	
		//if(!isMobile()){$('#resumen-visible').animate({'opacity': 0,},'200');}

		if(datav_b == 'bajocuello'){$('.ilustracion.forro').css({left: 250+'%', 'opacity':0});}
		if(datav_b == 'forro'){ $('.ilustracion.bajocuello').css({left: 250+'%', 'opacity':0});}
		if(datav_b == 'pantalon'){$('.ilustracion.pantalon').css({left: 250+'%', 'opacity':0});}
		if(datav_b == 'detalleinterior'){ $('.ilustracion.detalleinterior').css({left: 250+'%', 'opacity':0});}
		//Pone en panaralla mi elemento
		$('.'+datav_a+'.'+datav_b).css({'left': 0+'%', 'opacity': 1});
	}

	//muestra las ilustracines la primera vez que se renderizan;
	function addIlustracion(datatype, esto){
		let datailustracion = $(esto).data('ilustracion');
		if(datailustracion != undefined){
			datailustracion = datailustracion.trim().toLowerCase();
			switch (datailustracion){
				case 'forro': TAILOR.isVisibleForro = true; break;
				case 'bajocuello': TAILOR.isVisibleBajoCuello = true; break;
				default: break;
			}
			initSVG();
			TAILOR.mostrarIlustracion(datatype, $(esto).data(datatype));
		}else{
			MOVEMENTS.mostrarModeloFront();
		}
	}

	//------------------------------------------------------------------ FUNCIONES DE MOVIMIENTO DE ELEMENTOS Y CAMBIOS DE VISTAS
	function addSpecialButtonListeners (selector) {
		//Muestra el modelo y ESCONDE TODAS LAS ILUSTRACIONES
		$(selector).click(function(event) {

			//Aparece la ilustración y desaparece el maniquí;
			let datatype = $(this).data('type'); 
			if(datatype != undefined){
				datatype = datatype.trim().toLowerCase();

				switch (datatype){
					case 'coderas': 
					MOVEMENTS.mostrarModeloBack(false);
					break;
					case 'ilustracion':
					MOVEMENTS.mostrarModeloFront();
					addIlustracion(datatype, this);
					break;
					default: break;
				}
			}else {
				//no hay ilustraciones que meter (tampoco hay que mostrar el back del modelo);
				MOVEMENTS.mostrarModeloFront();
			}		
		});
	}

	//------------------------------------------------------------------ FUNCIONES SVG
	//Rellena el SVG con los colores seleccionados en los inputs; //SÓLO FUNCIONANDO PARA EL BAJO CUELLO
	function fillSVG(cosa, val){
		//console.log('___________   FILLCOSA __________');
		let elpadredelacosa = $(cosa).parents('.check-content').data('val');
		let fillcolor, objects_svg;
		let fillcolortype, pseudodoc,
		contentDocumentFills, contentDocumentTopos,
		contentDocumentFills2, contentDocumentTopos2,
		contentDocumentFills3, contentDocumentTopos3 = '';
		if(val.indexOf('colorbajocuello')>-1){
			fillcolor = SVGCOLORS_BAJOCUELLO[val];
			objects_svg = document.querySelectorAll('.ilustracion.bajocuello object');
		}
		if(val.indexOf('colorforro')>-1){
			fillcolor = SVGCOLORS_FORRO[val];
			objects_svg = document.querySelectorAll('.ilustracion.forro object');
		}
		if(val.indexOf('detalleexterior')>-1){
			fillcolor = SVGCOLORS_PANTALON_EXTERIOR[val];
			objects_svg = document.querySelectorAll('.ilustracion.pantalon object');
		}
		if(val.indexOf('detalleinterior')>-1){
			fillcolor = SVGCOLORS_DETALLEINTERIOR[val];
			objects_svg = document.querySelectorAll('.ilustracion.detalleinterior object');
		}
		if(fillcolor != undefined && (fillcolor.constructor === {}.constructor)){
			for(let i=0; i<objects_svg.length; i++){
				pseudodoc = objects_svg[i].contentDocument;

				contentDocumentFills = pseudodoc.querySelectorAll(fillcolor['bg'][0]);
				contentDocumentTopos = pseudodoc.querySelectorAll(fillcolor['topos'][0]);

				//Para las pretinas
				if(undefined!=fillcolor['bg2']){
					contentDocumentFills2 = pseudodoc.querySelectorAll(fillcolor['bg2'][0]);
					contentDocumentTopos2 = pseudodoc.querySelectorAll(fillcolor['topos2'][0]);

					contentDocumentFills3 = pseudodoc.querySelectorAll(fillcolor['bg3'][0]);
					contentDocumentTopos3 = pseudodoc.querySelectorAll(fillcolor['topos3'][0]);

					for(let j=0; j<contentDocumentFills2.length; j++){		
						if(undefined !=contentDocumentFills2[j]){
							contentDocumentFills2[j].setAttribute('fill', fillcolor['bg2'][1]);
						}
					}

					for(let j=0; j<contentDocumentFills3.length; j++){		
						if(undefined !=contentDocumentFills3[j]){
							contentDocumentFills3[j].setAttribute('fill', fillcolor['bg3'][1]);
						}
						if(undefined!=contentDocumentTopos3[j]){
							contentDocumentTopos3[j].setAttribute('fill', fillcolor['topos3'][1]);
						}
					}
				}
				
				//Resto de rellenos
				for(let j=0; j<contentDocumentFills.length; j++){		
					if(undefined !=contentDocumentFills[j]){
						contentDocumentFills[j].setAttribute('fill', fillcolor['bg'][1]);
					}
					if(undefined!=contentDocumentTopos[j]){
						contentDocumentTopos[j].setAttribute('fill', fillcolor['topos'][1]);
					}
				}
			}
		}
		//console.log('______________________________________');
	}



	//------------------------------------------------------------------ FUNCIONES DE RADIO
	/*Evalúa los elementos del input seleccionado para ver si tenemos que poner una imagen o metemos la selección directamente en la TAILORSHOP*/
	function getVal(this_one, clase){
		let res = '';
		switch (clase) {
			case 'radiobox':
			res = $(this_one).parents('.check-content').data('val')+'_'+$(this_one).val();
			break;
			case null: 
			res=$(this_one).val();
			break;
			default: $(this_one).val(); break;
		}
		return res;
	}

	function addRadioColorsListeners(that, val){

		if($(that).hasClass('radiobox')){ 

			//Elimina elmarcado de los del mismo grupo;
			$(that).parents('.box').siblings('.box').removeClass('boxed');
			//pone el "checkeado" al párrafo seleccionado y quita el de los hermanos
			$(that).parents('.check-content').find('p').addClass('checkeado');
			$(that).parents('.check-content').siblings('.check-content').find('p').removeClass('checkeado');
			//Elimina el marcado de otros grupos;
			$(that).parents('.check-content').siblings('.check-content').find('.box').removeClass('boxed');
			//Pone el recuadro a mi input seleccionado;
			$(that).parents('.box').addClass('boxed');
			//Recoge el radiobutton
			val = getVal(that, 'radiobox');
			//Rellena el SVG si encuentra el valor;
			fillSVG(that, val);

			//Borra los elementos de color de la pantalla
			//$(that).parents('.level-3').css({'display': 'none'});


		}else{
			//Cuando "NO EXISTE UN SEGUNDO NIVEL"
			val = getVal(that, null);
		}

		TAILOR.reset(val);
		return val;
	}

	//Cambia los COLORES DE HILO >> botones & Ojales
	function seleccionarColoresHilo_Botones(data){
		//Elimina capas anteriores
		let figures = $("[data-ref="+data[2]+"]");
		if(figures.length > 0){ $("[data-ref="+data[2]+"]").remove(); }
		//Añade la capa
		TAILOR.addImageLayer(data, 'front'); //añade la imagen al modelo
	}

	function activarOpcionesColoresBajoCuello(that, desactivar){
		$(".ilustracion.forro").css({'left': '250%', 'opacity':0});
		
		desactivar = $(that).parents('.check-content').data('option');

		for(let i=0; i< input_hide_colorbajocuello.length; i++){
			$("[data-val='"+input_hide_colorbajocuello[i]+"']").hide();
		}

		for (let i = 0; i < trad_delete_colorbajocuello[desactivar].length; i++) {
			$('#'+trad_delete_colorbajocuello[desactivar][i]).css({'left': '250%', 'opacity':0});
			$('#'+desactivar).css({'left': '0%', 'opacity':1});
		}

		for(let i=0; i< input_show_colorbajocuello[desactivar].length; i++){
			$("[data-val='"+input_show_colorbajocuello[desactivar][i]+"']").show();
		}
	}

	function activarOpcionesColoresForro(that, desactivar){
		$(".ilustracion.bajocuello").css({'left': '250%', 'opacity':0});
		
		desactivar = $(that).parents('.check-content').data('option');

		for(let i=0; i< input_hide_colorforro.length; i++){
			$("[data-val='"+input_hide_colorforro[i]+"']").hide();
		}

		for (let i = 0; i < trad_delete_colorforro[desactivar].length; i++) {
			$('#'+trad_delete_colorforro[desactivar][i]).css({'left': '250%', 'opacity':0});
			$('#'+desactivar).css({'left': '0%', 'opacity':1});
		}

		for(let i=0; i< input_show_colorforro[desactivar].length; i++){
			$("[data-val='"+input_show_colorforro[desactivar][i]+"']").show();
		}
	}

	function addRadioListeners(){

		//INICIO RADIOS <<< important!!! SON RADIOS >>> HAY QUE TRATAR LOS CHECKS A PARTE;
		$('input:radio').change(function(){

			let val = '';
			let add_image = true;

			if($(this).is(':checked')){

				//Clases BOX (con un segundo nivel de opciones) => por ejemplo CHAQUETA > TEJIDOS
				//Ejecuta una u otra función depenciendo de si hay que poner una imagen o no en el maniquí;
				data  = pretty(addRadioColorsListeners(this, val));

				if(data == null || data == undefined){return;}
				(data.data).map((el)=>{ return el.trim().toLowerCase(); });


				//HABILITAR OPCIONES :: habilita COLOR una vez pulsado un input (ej: BAJOCUELLO - COLORBAJOCUELL0)
				if ($("[data-bind='"+data.data[0]+'-'+data.data[1]+"']").length) {
					if(data.data[2] == 'no'){
						//el contenido sigue sin mostrarse!
					}else{
						let desactivar = '';
						
						//DATA BINDING DE CHAQUETA - BAJOCUELLO
						if( (data.data[0]=='chaqueta' && data.data[1]=='bajocuello') ){ 
							activarOpcionesColoresBajoCuello(this, desactivar, input_hide_colorbajocuello, trad_delete_colorbajocuello);
						}						

						//DATA BINDING DE CHAQUETA - FORRO >> desactivado
						if( (data.data[0]=='chaqueta' && data.data[1]=='forro') ){ 
							//activarOpcionesColoresForro(this, desactivar, input_hide_colorforro, trad_delete_colorforro);
						}

						//Aparece el contenido (quita el pointer-events de la clase);
						$("[data-bind='"+data.data[0]+'-'+data.data[1]+"']").removeClass('disabled');					
					}
				}

				//LLAMADAS DE CHAQUETA
				if(data.data[0] == 'chaqueta'){
					
					//muestra coderas
					if (data.data[1] == 'coderas' ) {
						let mostrar_coderas = false;
						if(data.data[2] == 'si'){
							mostrar_coderas = true;
						}
						MOVEMENTS.mostrarModeloBack(mostrar_coderas);
					}


					//muestra forros
					if (data.data[1] == 'forro' || data.data[1] == 'colorforro') {
						let url = 'http://local10.elganso.com/skin/frontend/elganso2016/default/images/iwsastreria/ilustraciones/';
						if(data.data[2] == 'sinforro'){
							$("[data-bind='chaqueta-forro']").parents('.row-level-2').show('slow');
							$("#leyenda_forro img").attr({
								'src': url+'leyenda_sinforro.png',
								'alt': 'leyenda_sinforro.png'
							});
							MOVEMENTS.cambiarElForro(url+'forro_sinforro.svg', null);
						}
						if(data.data[2] == 'conforro'){
							$("[data-bind='chaqueta-forro']").parents('.row-level-2').show('slow');
							$("#leyenda_forro img").attr({
								'src': url+'leyenda_conforro.png',
								'alt': 'leyenda_conforro.png'
							});
							MOVEMENTS.cambiarElForro(url+'forro_conforro.svg', null);
						}
						if(data.data[2] == 'medioforro'){
							$("[data-bind='chaqueta-forro']").parents('.row-level-2').show('slow');
							$("#leyenda_forro img").attr({
								'src': url+'leyenda_medioforro.png',
								'alt': 'leyenda_medioforro.png'
							});
							MOVEMENTS.cambiarElForro(url+'forro_medioforro.svg', null);
						}
					}
				}

				//LLAMADAS DE PANTALÓN >> BOTONES TIRANTES
				if(data.data[0] == 'pantalon'){
					if (data.data[1] == 'detalleinterior' && data.data[2] == 'botonestirantes') {
						let interior = null;
						let btnsTirantes = null;

						setTimeout(function(){
							interior = DOC.querySelector('.ilustracion.detalleinterior object');
							btnsTirantes = (interior.contentDocument).querySelectorAll('.btntirante');
							if(data.data[3] == 'si'){ for(let i=0; i<btnsTirantes.length; i++){ btnsTirantes[i].style.display = 'block'; } }
							if(data.data[3] == 'no'){ for(let i=0; i<btnsTirantes.length; i++){ btnsTirantes[i].style.display = 'none'; } }

						}, 350);
					}
				}

				TAILOR.add(data, SUMMARY.init(data)) //Añade las imágenes

			} else {  alert('Ha ocurrido un error inesperado, por favor, ponte en contacto con nosotros. Gracias'); }

			return;
		});
		//fin RADIOS
	}

	//Muestra el TAILORSHOP;
	TAILOR.STS = function(){ return TAILORSHOP;}

	//Añade al almacenamiento de la SASTRERIA;
	TAILOR.add = function(data){ 
		data = data.data;

		//console.log('________ TAILOR.add() L406 _______');
		//console.log(data);
		//console.log('----------------------------------');

		//Casos especiales en los que "NO HAY QUE AÑADIR IMAGEN" + almacenamiento en STRING;
		switch(data[1]){
			case 'bajocuello':
			case 'coderas':
			case 'forro':
			if (data[2] == 'si') {
				$('#figure-coderas').show();
				$("[data-bind='chaqueta-coderas']").css({'display': 'block'});
			}else{
				$('#figure-coderas').hide();
				$("[data-bind='chaqueta-coderas']").css({'display': 'none'});
			}
			TAILORSHOP[data[0]][data[1]] = data[2];
			break;

			//Almacenamiento en objetos => necesita resetear al pulsar sobre el elemento padre;
			case 'colorbajocuello':
			case 'colorforro':
			case 'detalleexterior':
			case 'detalleinterior':
			TAILORSHOP[data[0]][data[1]][data[2]] = data[3];
			break;

			case 'colorhilo':
			seleccionarColoresHilo_Botones(data);
			TAILORSHOP[data[0]][data[1]][data[2]] = data[3];
			break;

			default: 
			if(data.length > 3){
				//Alamacecnamiento en array
				TAILORSHOP[data[0]][data[1]] = []; 
				TAILORSHOP[data[0]][data[1]].push(data[2]);
				TAILORSHOP[data[0]][data[1]].push(data[3]);

				//this.addImageLayer(data); >>> en principio no se necesita incluir ninguna imagen;
			}else{
				this.addImageLayer(data, 'front'); 
				TAILORSHOP[data[0]][data[1]] = data[2]; 
			}
			break;
		}
	}

	TAILOR.reset = function(val){
		val = val.trim().toLowerCase();
		switch (val) {
			case 'chaqueta_bajocuello_unasolapieza':
			case 'chaqueta_bajocuello_palaypie':
			case 'chaqueta_bajocuello_palapieypiping':
			TAILORSHOP['chaqueta']['colorbajocuello'] = {};
			break;
			case 'chaqueta_forro_conforro':
			case 'chaqueta_forro_sinforro':
			case 'chaqueta_forro_medioforro':
			TAILORSHOP['chaqueta']['colorforro'] = {};
			break;
			default:break;
		}
	}

	//Elimina del almacenamiento de la SATRERIA;
	TAILOR.remove = function(data){ 
		switch (data[0]) {
			case 'chaqueta' : 
			TAILORSHOP['chaqueta'][data[1]][data[2]] = false; 
			this.removeImageLayer(data);
			break;
			case 'pantalon' : 
			TAILORSHOP['pantalon'][data[1]][data[2]] = false; 
			this.removeImageLayer(data); 
			break;
			default: break;
		}
	}

	//Borra capas que se pongan sobre el modelo (del mismo tipo de inputs)
	TAILOR.deleteSiblingsFigures = (radio_id) =>{
		//VOY AL PADRE Y SELECCIONO TODOS LOS DEMÁS ELEMENTOS
		let allinputs = $(radio_id).parents('.panel').find('input');

		//FILTA los inputs que no están checked y elimina las capas figure con el data-idimg >>> para que no se superpongan
		[].filter.call(allinputs, function(elem, index){
			if(!index.checked){
				let figures = $("[data-idimg='"+index.id+"']");
				if(figures == null){
					//No hay capas-figures que borrar;
				}else{
					$(figures).remove();
				}
			}
		});
	}

	TAILOR.createFigure = function(foo){
		let base_image = '';
		base_image = DOC.getElementById('maniqui-inner-front');


		let fig = DOC.createElement('figure');
		let img = DOC.createElement('img');

		fig.classList.add('capa');
		fig.classList.add(foo[2]);

		fig.dataset.cat = foo[0];
		fig.dataset.subcat = foo[1];
		fig.dataset.ref = foo[2];

		fig.classList.add('zoom');
		fig.style.position = 'absolute';
		fig.classList.add('zoom');

		switch (foo[0]) {
			case 'chaqueta': 
			fig.classList.remove('zoom-pantalon');
			fig.classList.add('zoom-chaqueta');
			break;
			case 'pantalon': 
			fig.classList.remove('zoom-chaqueta');
			fig.classList.add('zoom-pantalon');
			break;
			default: break;
		}

		fig.dataset.idimg = foo[0]+'_'+foo[1]+'_'+foo[2];

		if(undefined!=foo[3]){
			//Caso especial del COLOR DE HILO (ojales y botones)
			img.setAttribute('alt', foo[0]+'_'+foo[1]+'_'+foo[2]+'_'+foo[3]+'.png');
			img.setAttribute('src','http://local10.elganso.com/skin/frontend/elganso2016/default/images/iwsastreria/'+foo[0]+'/'+foo[1]+'/'+foo[2]+'_'+foo[3]+'.png');
		}else{
			img.setAttribute('alt', foo[0]+'_'+foo[1]+'_'+foo[2]+'.png');
			img.setAttribute('src','http://local10.elganso.com/skin/frontend/elganso2016/default/images/iwsastreria/'+foo[0]+'/'+foo[1]+'/'+foo[2]+'.png');
		}

		fig.appendChild(img);
		base_image.appendChild(fig);
	}


	//Añade la nueva capa al maniquí
	TAILOR.addImageLayer = function(data){
		// if(data['length'] > 3)
		// 	return null;
		data[0] = data[0].trim().toLowerCase();
		data[1] = data[1].trim().toLowerCase();
		data[2] = data[2].trim().toLowerCase();

		//Evita que se superpongan las imágenes que dependen del mismo grupo de radios;
		this.deleteSiblingsFigures('#'+data[0]+'_'+data[1]+'_'+data[2]);
		//Crea el elemento Figure
		this.createFigure(data);
	}

	//Recoge el input & formatea para alamacenarlo en SASTRERIA;
	function pretty (data){ 
		let dataarray = new Array();
		if(data !=null){
			dataarray = data.split('_');
			dataarray.map(function(el){
				el = el.toLowerCase().trim();
			});		
		}
		return {'length': dataarray.length, 'data': dataarray};
	}

	TAILOR.init = function(){ inicializarApp(); }

}(TAILOR, document, sessionStorage, SUMMARY, $));