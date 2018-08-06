'use strict';
var $ = jQuery.noConflict();

(function(SUMMARY, data, TRANSLATOR, $){

	SUMMARY.NUMDATA;
	SUMMARY.DATA;
	let mostrarResumen = null || {};

	SUMMARY.analyzer = () => {
		//console.log('--- SUMMARY DATA ---');
		//console.log(SUMMARY.DATA);

		SUMMARY.createSection(SUMMARY.DATA);
	}

	SUMMARY.createSection = function(ds){
		//Las secciones para el resumen se cogen a partir de los datos guardados en el TAILORSHOP

		//console.log('****************** DS / datasection ************'); 
		//console.log(ds);

		let datasection = ds[0]+'_'+ds[1];
		//console.log(datasection);
		//console.log('************************************************');

		let opc = ds[2];
		let URL = 'http://local10.elganso.com/skin/frontend/elganso2016/default/images/iwsastreria/';

		if(SUMMARY.evalSection(datasection)){

			//Generales >> aparece la sección y le da un padding;
			$('[data-section='+datasection+']').show();
			if(SUMMARY.NUMDATA > 3){

				switch (ds[2]) {
					case 'pala':
					case 'piping':
					case 'pie':
					case 'colgador':
					case 'antecolor':
					case 'ojales':
					case 'botones':
					case 'colorhilo':
					case 'vivobolsillo':
					case 'fondobolsillo':
					case 'pretina':
					case 'vivointerior':
					case 'forrobolsillos':
					case 'delantero':
					case 'espalda':
					case 'costado':
					//alert('resumen especial');
					mostrarResumen.especial(datasection, ds, URL);
					break;
					default:
					//alert('resumen imagen');
					mostrarResumen.imagen(datasection, ds, TRANSLATOR, URL);
					break;
				}
			}else{
				//Resumen SIMPLE sin imagen (sólo texto)
				//alert('resumen simple');
				//if( (ds[1] = 'coderas' && ds[2] == 'si') ){return;}
				mostrarResumen.simple(datasection,ds,TRANSLATOR);
			}
			
		}else{
			alert('crear una nueva sección en resumen externo');
		}
	}

	mostrarResumen = {
		simple: (datasection, ds, TRANSLATOR)=>{ 
			//$('[data-section='+datasection+'] div > p').text(TRANSLATOR[ds[1]+'_'+ds[2]][1]); 
			//mostrarResumen.visible(datasection);
		},
		imagen: (datasection,ds,TRANSLATOR, URL)=>{
			$('[data-section='+datasection+'] > figure > img').prop({
				src: URL+ds[0]+'/'+ds[1]+'/'+ds[2]+'_'+ds[3]+'.png',
				alt: ds[0]+'_'+ds[1]+'_'+ds[2]+'_'+ds[3]+'.png'
			});
			$('[data-section='+datasection+'] div > p').text(TRANSLATOR[ds[2]+'_'+ds[3]][0] + ' - ' + TRANSLATOR[ds[2]+'_'+ds[3]][1]);
			mostrarResumen.visible(datasection);
		},
		especial: (datasection,ds, URL)=>{
			let txt = ds[2];
			$('[data-section='+datasection+'] > div.opcion-'+ds[2]).css({'display': 'flex'});
			$('[data-section='+datasection+'] > div.opcion-'+ds[2]+' >figure > img').prop({
				src: URL+ds[0]+'/'+ds[1]+'/'+ds[3]+'.png',
				alt: ds[0]+'_'+ds[1]+'_'+ds[3]+'.png'
			});

			//Opciones para distintas entradas;
			//if(opc != 'color'){ txt = ds[3]; }
			if(ds[2] == 'antecolor'){
				txt = ds[3].slice(0, 2) + "/" + ds[3].slice(2);
			}
			$('[data-section='+datasection+'] > div.opcion-'+ds[2]+' >p').text(txt);
			mostrarResumen.visible(datasection);

		},
		visible: (datasection)=>{
			$('[data-section='+datasection+'] div > p').css({'textAlign':'center'});
			$('[data-section='+datasection+']').css({'padding': '5px'});
			$('[data-section='+datasection+'] div > h4').show();
			$('#resumen-visible').slideDown('fast');
		}
	}

	SUMMARY.evalSection = function(ds){
		//el tamaño del DS hace que metamos una imagen o sólo texto;
		//console.log('-- evalSection --');
		//console.log($('*[data-section='+ds+']').length);
		//console.log($('*[data-section='+ds+']'));
		return  $('*[data-section='+ds+']').length;
	}

	SUMMARY.init = (data)=>{
		jQuery(document).ready(function($) {

			SUMMARY.NUMDATA = data['length'];
			SUMMARY.DATA = data['data'];

			SUMMARY.analyzer(data);
		});
	}

}(SUMMARY, data, TRANSLATOR, $));



