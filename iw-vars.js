var data;
var ACCORDION = {};
var TAILOR = {};
var SUMMARY = {};
var MOVEMENTS = {};
var CONTACTO = {};
let chaqueta = {
	'tejido': [],
	'bajocuello': '',
	'colorbajocuello': {},
	'solapas': '',
	'bolsillos': '',
	'botones': '',
	'colorhilo': {},
	'forro': '',
	'colorforro': {},
	'forromangas': '',
	'botonesleyenda': '',
	'coderas':'',
	'colorcoderas': '',
	'cintacolgar': '',
	'etiqueta': ''
}

let pantalon = {
	'tejido': [],
	'patron': '',
	'detalleexterior': {},
	'detalleinterior': {},
	'botonespantalon': [],
	'hilopantalon': []
};
let TAILORSHOP = { 'chaqueta' : chaqueta,'pantalon' : pantalon}

let COLORS = {
	'chaqueta_tejido': {
		'liso'  			: ['marino', 'negro', 'grism', 'grisc'],
		'espiga'			: ['marino', 'gris'],
		'ojodeperdiz' 		: ['marino', 'grism', 'grisc'] ,
		'rayadiplomatica' 	: ['azul'],
		'cuadroventana' 	: ['azul'],
		'cuadrogales'	 	: ['gris', 'perfil', 'celeste'],
		'lanaalgodon'		 	: ['beige', 'gris', 'marino']
	}, 

	'chaqueta_bajocuello': {
		'unapieza'			: ['unapieza'],
		'palaypie'			: ['pala', 'pie'],
		'palapipingypie'	: ['pala', 'piping', 'pie']
	},

	'pantalon_tejido': {
		'liso'  			: ['marino', 'negro', 'grism', 'grisc'],
		'espiga'			: ['marino', 'gris'],
		'ojodeperdiz' 		: ['marino', 'grism', 'grisc'] ,
		'rayadiplomatica' 	: ['azul'],
		'cuadroventana' 	: ['azul'],
		'cuadrogales'	 	: ['gris', 'perfil', 'celeste'],
		'lanaalgodon'		 	: ['beige', 'gris', 'marino']
	},
}

let TRANSLATOR = {
	'liso_marino':['Liso', 'Marino'],
	'liso_negro': ['Liso', 'Negro'],
	'liso_gris_marengo':['Liso', 'Gris marengo'],
	'liso_grisclaro':['Liso', 'Gris claro'],
	'espiga_marino':['Espiga', 'Marino'],
	'espiga_gris':['Espiga', 'Gris'],
	'ojodeperdiz_marino':['Ojo de perdiz', 'Marino'],
	'ojodeperdiz_grismarengo':['Ojo de perdiz', 'Gris marengo'],
	'ojodeperdiz_grisclaro':['Ojo de perdiz', 'Gris claro'],
	'rayadiplomatica_azul':['Raya diplomática', 'Azul'],
	'cuadroventana_azul':['Cuadro ventana', 'Azul'],
	'cuadrogales_gris':['Príncipe de Gales', 'Gris'],
	'cuadrogales_gris':['Príncipe de Gales', 'Gris'],
	'cuadrogales_perfil':['Príncipe de Gales', 'Perfil'],
	'cuadrogales_celeste':['Príncipe de Gales', 'Celeste'],
	'lanaalgodon_beige':['Lana algodón', 'Beige'],
	'lanaalgodon_gris':['Lana algodón', 'Gris'],
	'lanaalgodon_marino':['Lana algodón', 'Marino'],
	'bajocuello_unasolapieza':['Bajo cuello', 'Una sola pieza'],
	'bajocuello_palaypie':['Bajo cuello', 'Pala y pie'],
	'bajocuello_palapieypiping':['Bajo cuello', 'Pala, piping y pie'],
	'solapas_estrecha':['Solapas', 'Estrecha'],
	'solapas_clasica':['Solapas', 'Clásica'],
	'botones_dos':['Botones', 'Dos botones'],
	'botones_tres':['Botones', 'Tres botones'],
	'bolsillos_doscarterasinclinadas':['Bolsillos', 'Dos carteras inclinadas' ],
	'bolsillos_trescarterasinclinadas':['Bolsillos', 'Tres carteras inclinadas' ],
	'bolsillos_doscarterasrectas':['Bolsillos', 'Dos carteras rectas' ],
	'bolsillos_trescarterasrectas':['Bolsillos', 'Tres carteras rectas' ],
	'bolsillos_bolsillopecho':['Bolsillos', 'Parche con bolsillo pecho' ],
	'bolsillos_parchepecho':['Bolsillos', 'Parche con parche pecho' ],
	'coderas_si':['Coderas', 'Con coderas' ],
	'coderas_no':['Coderas', 'Sin coderas' ],
	'colorhilo_ojal':['Color hilo', 'Ojal'],
	'colorhilo_boton':['Color hilo', 'Botón'],
	'forro_conforro':['Forro', 'Con forro'],
	'forro_sinforro':['Forro', 'Sin forro'],
	'forro_medioforro':['Forro', 'Medio forro'],
	'pala_827':['Pala', '#827']
}

let input_hide_colorbajocuello= ['chaqueta_colorbajocuello_pala', 'chaqueta_colorbajocuello_piping', 'chaqueta_colorbajocuello_pie'];
let input_show_colorbajocuello = {
	'unasolapieza'   : ['chaqueta_colorbajocuello_pala'],
	'palaypie'		 : ['chaqueta_colorbajocuello_pala', 'chaqueta_colorbajocuello_pie'],
	'palapipingypie' : ['chaqueta_colorbajocuello_pala', 'chaqueta_colorbajocuello_piping', 'chaqueta_colorbajocuello_pie']
}
let trad_delete_colorbajocuello = {
	'unasolapieza'   : ['palaypie', 'palapipingypie' ],
	'palaypie'		 : ['unasolapieza', 'palapipingypie' ],
	'palapipingypie' : ['unasolapieza', 'palaypie' ]
}

let input_hide_colorforro = ['chaqueta_colorforro_delantero', 'chaqueta_colorforro_espalda', 'chaqueta_colorforro_costado', 'chaqueta_colorforro_piping'];
let input_show_colorforro = {
	'con_forro'   : ['chaqueta_colorforro_delantero', 'chaqueta_colorforro_espalda',  'chaqueta_colorforro_costado'],
	'sin_forro'	  : ['chaqueta_colorforro_delantero', 'chaqueta_colorforro_espalda',  'chaqueta_colorforro_costado'],
	'medio_forro' : ['chaqueta_colorforro_delantero', 'chaqueta_colorforro_espalda',  'chaqueta_colorforro_costado', 'chaqueta_colorforro_piping']
}
let trad_delete_colorforro = {
	'con_forro'   : ['sin_forro', 'medio_forro' ],
	'sin_forro'	  : ['con_forro', 'medio_forro' ],
	'medio_forro' : ['con_forro', 'sin_forro' ]
} 

let SVGCOLORS_BAJOCUELLO = {
	'chaqueta_colorbajocuello_pala_827' : {'bg':['.pala.color1', '#00155c'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_503' : {'bg':['.pala.color1', '#d00054'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_909' : {'bg':['.pala.color1', '#00662f'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_1315': {'bg':['.pala.color1', '#006398'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_770' : {'bg':['.pala.color1', '#f7f8f8'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_118' : {'bg':['.pala.color1', '#f6b63e'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_128' : {'bg':['.pala.color1', '#bc0c24'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_451' : {'bg':['.pala.color1', '#e76114'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_3585': {'bg':['.pala.color1', '#661081'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_1421': {'bg':['.pala.color1', '#e569a3'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_1284': {'bg':['.pala.color1', '#89878c'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_554' : {'bg':['.pala.color1', '#816926'],'topos':['.pala.color2','transparent']},
	'chaqueta_colorbajocuello_pala_marinotopoblanco': { 'bg' : ['.pala.color1', '#00135c'],'topos' : ['.pala.color2', '#ffffff']	},
	'chaqueta_colorbajocuello_pala_granatetopoblanco': {'bg' : ['.pala.color1', '#bb0e24'],'topos' : ['.pala.color2', '#ffffff']	},
	'chaqueta_colorbajocuello_pala_rojotopomarino': {'bg' : ['.pala.color1', '#d11953'],'topos' : ['.pala.color2', '#00135c']	},
	'chaqueta_colorbajocuello_pala_verdetopomarino': {'bg' : ['.pala.color1', '#01642d'],'topos' : ['.pala.color2', '#00135c']	},
	'chaqueta_colorbajocuello_piping_827' : {'bg':['.piping.color1', '#00155c'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_503' : {'bg':['.piping.color1', '#d00054'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_909' : {'bg':['.piping.color1', '#00662f'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_1315': {'bg':['.piping.color1', '#006398'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_770' : {'bg':['.piping.color1', '#f7f8f8'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_118' : {'bg':['.piping.color1', '#f6b63e'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_128' : {'bg':['.piping.color1', '#bc0c24'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_451' : {'bg':['.piping.color1', '#e76114'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_3585': {'bg':['.piping.color1', '#661081'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_1421': {'bg':['.piping.color1', '#e569a3'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_1284': {'bg':['.piping.color1', '#89878c'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_554' : {'bg':['.piping.color1', '#816926'], 'topos':['.piping.color2','transparent']},
	'chaqueta_colorbajocuello_piping_marinotopoblanco': {'bg' : ['.piping.color1', '#00135c'],'topos' : ['.piping.color2', '#ffffff']	},
	'chaqueta_colorbajocuello_piping_granatetopoblanco': {'bg' : ['.piping.color1', '#bb0e24'],'topos' : ['.piping.color2', '#ffffff']	},
	'chaqueta_colorbajocuello_piping_rojotopomarino': {'bg' : ['.piping.color1', '#d11953'],'topos' : ['.piping.color2', '#00135c']	},
	'chaqueta_colorbajocuello_piping_verdetopomarino': {'bg' : ['.piping.color1', '#01642d'],'topos' : ['.piping.color2', '#00135c']	},
	'chaqueta_colorbajocuello_pie_827' : {'bg':['.pie.color1', '#00155c'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_503' : {'bg':['.pie.color1', '#d00054'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_909' : {'bg':['.pie.color1', '#00662f'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_1315': {'bg':['.pie.color1', '#006398'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_770' : {'bg':['.pie.color1', '#f7f8f8'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_118' : {'bg':['.pie.color1', '#f6b63e'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_128' : {'bg':['.pie.color1', '#bc0c24'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_451' : {'bg':['.pie.color1', '#e76114'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_3585': {'bg':['.pie.color1', '#661081'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_1421': {'bg':['.pie.color1', '#e569a3'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_1284': {'bg':['.pie.color1', '#89878c'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_554' : {'bg':['.pie.color1', '#816926'], 'topos':['.pie.color2','transparent']},
	'chaqueta_colorbajocuello_pie_marinotopoblanco': {'bg' : ['.pie.color1', '#00135c'],'topos' : ['.pie.color2', '#ffffff']	},
	'chaqueta_colorbajocuello_pie_granatetopoblanco': {'bg' : ['.pie.color1', '#bb0e24'],'topos' : ['.pie.color2', '#ffffff']	},
	'chaqueta_colorbajocuello_pie_rojotopomarino': {'bg' : ['.pie.color1', '#d11953'],'topos' : ['.pie.color2', '#00135c']	},
	'chaqueta_colorbajocuello_pie_verdetopomarino': {'bg' : ['.pie.color1', '#01642d'],'topos' : ['.pie.color2', '#00135c']	}
}

let SVGCOLORS_FORRO = {
	'chaqueta_colorforro_delantero_827' : {'bg':['.delantero.color1', '#00155c'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_503' : {'bg':['.delantero.color1', '#d00054'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_909' : {'bg':['.delantero.color1', '#00662f'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_1315': {'bg':['.delantero.color1', '#006398'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_770' : {'bg':['.delantero.color1', '#f7f8f8'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_118' : {'bg':['.delantero.color1', '#f6b63e'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_128' : {'bg':['.delantero.color1', '#bc0c24'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_451' : {'bg':['.delantero.color1', '#e76114'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_3585': {'bg':['.delantero.color1', '#661081'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_1421': {'bg':['.delantero.color1', '#e569a3'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_1284': {'bg':['.delantero.color1', '#89878c'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_554' : {'bg':['.delantero.color1', '#816926'],'topos':['.delantero.color2','transparent']},
	'chaqueta_colorforro_delantero_marinotopoblanco': { 'bg' : ['.delantero.color1', '#00135c'],'topos' : ['.delantero.color2', '#ffffff']	},
	'chaqueta_colorforro_delantero_granatetopoblanco': {'bg' : ['.delantero.color1', '#bb0e24'],'topos' : ['.delantero.color2', '#ffffff']	},
	'chaqueta_colorforro_delantero_rojotopomarino': {'bg' : ['.delantero.color1', '#d11953'],'topos' : ['.delantero.color2', '#00135c']	},
	'chaqueta_colorforro_delantero_verdetopomarino': {'bg' : ['.delantero.color1', '#01642d'],'topos' : ['.delantero.color2', '#00135c']	},

	'chaqueta_colorforro_espalda_827' : {'bg':['.espalda.color1', '#00155c'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_503' : {'bg':['.espalda.color1', '#d00054'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_909' : {'bg':['.espalda.color1', '#00662f'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_1315': {'bg':['.espalda.color1', '#006398'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_770' : {'bg':['.espalda.color1', '#f7f8f8'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_118' : {'bg':['.espalda.color1', '#f6b63e'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_128' : {'bg':['.espalda.color1', '#bc0c24'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_451' : {'bg':['.espalda.color1', '#e76114'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_3585': {'bg':['.espalda.color1', '#661081'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_1421': {'bg':['.espalda.color1', '#e569a3'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_1284': {'bg':['.espalda.color1', '#89878c'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_554' : {'bg':['.espalda.color1', '#816926'], 'topos':['.espalda.color2','transparent']},
	'chaqueta_colorforro_espalda_marinotopoblanco': {'bg' : ['.espalda.color1', '#00135c'],'topos' : ['.espalda.color2', '#ffffff']	},
	'chaqueta_colorforro_espalda_granatetopoblanco': {'bg' : ['.espalda.color1', '#bb0e24'],'topos' : ['.espalda.color2', '#ffffff']	},
	'chaqueta_colorforro_espalda_rojotopomarino': {'bg' : ['.espalda.color1', '#d11953'],'topos' : ['.espalda.color2', '#00135c']	},
	'chaqueta_colorforro_espalda_verdetopomarino': {'bg' : ['.espalda.color1', '#01642d'],'topos' : ['.espalda.color2', '#00135c']	},

	'chaqueta_colorforro_costado_827' : {'bg':['.costado.color1', '#00155c'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_503' : {'bg':['.costado.color1', '#d00054'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_909' : {'bg':['.costado.color1', '#00662f'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_1315': {'bg':['.costado.color1', '#006398'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_770' : {'bg':['.costado.color1', '#f7f8f8'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_118' : {'bg':['.costado.color1', '#f6b63e'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_128' : {'bg':['.costado.color1', '#bc0c24'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_451' : {'bg':['.costado.color1', '#e76114'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_3585': {'bg':['.costado.color1', '#661081'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_1421': {'bg':['.costado.color1', '#e569a3'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_1284': {'bg':['.costado.color1', '#89878c'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_554' : {'bg':['.costado.color1', '#816926'], 'topos':['.costado.color2','transparent']},
	'chaqueta_colorforro_costado_marinotopoblanco': {'bg' : ['.costado.color1', '#00135c'],'topos' : ['.costado.color2', '#ffffff']	},
	'chaqueta_colorforro_costado_granatetopoblanco': {'bg' : ['.costado.color1', '#bb0e24'],'topos' : ['.costado.color2', '#ffffff']	},
	'chaqueta_colorforro_costado_rojotopomarino': {'bg' : ['.costado.color1', '#d11953'],'topos' : ['.costado.color2', '#00135c']	},
	'chaqueta_colorforro_costado_verdetopomarino': {'bg' : ['.costado.color1', '#01642d'],'topos' : ['.costado.color2', '#00135c']	},

	'chaqueta_colorforro_piping_827' : {'bg':['.forriping.color1', '#00155c'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_503' : {'bg':['.forriping.color1', '#d00054'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_909' : {'bg':['.forriping.color1', '#00662f'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_1315': {'bg':['.forriping.color1', '#006398'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_770' : {'bg':['.forriping.color1', '#f7f8f8'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_118' : {'bg':['.forriping.color1', '#f6b63e'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_128' : {'bg':['.forriping.color1', '#bc0c24'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_451' : {'bg':['.forriping.color1', '#e76114'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_3585': {'bg':['.forriping.color1', '#661081'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_1421': {'bg':['.forriping.color1', '#e569a3'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_1284': {'bg':['.forriping.color1', '#89878c'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_554' : {'bg':['.forriping.color1', '#816926'], 'topos':['.forriping.color2','transparent']},
	'chaqueta_colorforro_piping_marinotopoblanco': {'bg' : ['.forriping.color1', '#00135c'],'topos' : ['.forriping.color2', '#ffffff']	},
	'chaqueta_colorforro_piping_granatetopoblanco': {'bg' : ['.forriping.color1', '#bb0e24'],'topos' : ['.forriping.color2', '#ffffff']	},
	'chaqueta_colorforro_piping_rojotopomarino': {'bg' : ['.forriping.color1', '#d11953'],'topos' : ['.forriping.color2', '#00135c']	},
	'chaqueta_colorforro_piping_verdetopomarino': {'bg' : ['.forriping.color1', '#01642d'],'topos' : ['.forriping.color2', '#00135c']	}
}


let SVGCOLORS_PANTALON_EXTERIOR = {
	'pantalon_detalleexterior_colorhilo_827' : {'bg':['.hilo.color1', '#00155c'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_503' : {'bg':['.hilo.color1', '#d00054'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_909' : {'bg':['.hilo.color1', '#00662f'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_1315': {'bg':['.hilo.color1', '#006398'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_770' : {'bg':['.hilo.color1', '#f7f8f8'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_118' : {'bg':['.hilo.color1', '#f6b63e'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_128' : {'bg':['.hilo.color1', '#bc0c24'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_451' : {'bg':['.hilo.color1', '#e76114'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_3585': {'bg':['.hilo.color1', '#661081'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_1421': {'bg':['.hilo.color1', '#e569a3'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_1284': {'bg':['.hilo.color1', '#89878c'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_554' : {'bg':['.hilo.color1', '#816926'],'topos':['.hilo.color2','']},
	'pantalon_detalleexterior_colorhilo_827' : {'bg':['.hilo.color1', '#00155c'],'topos':['.hilo.color2','']},

	'pantalon_detalleexterior_fondobolsillo_827' : {'bg':['.fondo.color1', '#00155c'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_503' : {'bg':['.fondo.color1', '#d00054'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_909' : {'bg':['.fondo.color1', '#00662f'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_1315': {'bg':['.fondo.color1', '#006398'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_770' : {'bg':['.fondo.color1', '#f7f8f8'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_118' : {'bg':['.fondo.color1', '#f6b63e'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_128' : {'bg':['.fondo.color1', '#bc0c24'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_451' : {'bg':['.fondo.color1', '#e76114'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_3585': {'bg':['.fondo.color1', '#661081'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_1421': {'bg':['.fondo.color1', '#e569a3'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_1284': {'bg':['.fondo.color1', '#89878c'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_554' : {'bg':['.fondo.color1', '#816926'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_827' : {'bg':['.fondo.color1', '#00155c'],'topos':['.fondo.color2','transparent']},
	'pantalon_detalleexterior_fondobolsillo_marinotopoblanco': {'bg' : ['.fondo.color1', '#00135c'],'topos' : ['.fondo.color2', '#ffffff']	},
	'pantalon_detalleexterior_fondobolsillo_granatetopoblanco': {'bg' : ['.fondo.color1', '#bb0e24'],'topos' : ['.fondo.color2', '#ffffff']	},
	'pantalon_detalleexterior_fondobolsillo_rojotopomarino': {'bg' : ['.fondo.color1', '#d11953'],'topos' : ['.fondo.color2', '#00135c']	},
	'pantalon_detalleexterior_fondobolsillo_verdetopomarino': {'bg' : ['.fondo.color1', '#01642d'],'topos' : ['.fondo.color2', '#00135c']	},

	'pantalon_detalleexterior_vivobolsillo_827' : {'bg':['.vivo.color1', '#00155c'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_503' : {'bg':['.vivo.color1', '#d00054'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_909' : {'bg':['.vivo.color1', '#00662f'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_1315': {'bg':['.vivo.color1', '#006398'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_770' : {'bg':['.vivo.color1', '#f7f8f8'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_118' : {'bg':['.vivo.color1', '#f6b63e'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_128' : {'bg':['.vivo.color1', '#bc0c24'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_451' : {'bg':['.vivo.color1', '#e76114'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_3585': {'bg':['.vivo.color1', '#661081'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_1421': {'bg':['.vivo.color1', '#e569a3'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_1284': {'bg':['.vivo.color1', '#89878c'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_554' : {'bg':['.vivo.color1', '#816926'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_827' : {'bg':['.vivo.color1', '#00155c'],'topos':['.vivo.color2','transparent']},
	'pantalon_detalleexterior_vivobolsillo_marinotopoblanco': {'bg' : ['.vivo.color1', '#00135c'],'topos' : ['.vivo.color2', '#ffffff']	},
	'pantalon_detalleexterior_vivobolsillo_granatetopoblanco': {'bg' : ['.vivo.color1', '#bb0e24'],'topos' : ['.vivo.color2', '#ffffff']	},
	'pantalon_detalleexterior_vivobolsillo_rojotopomarino': {'bg' : ['.vivo.color1', '#d11953'],'topos' : ['.vivo.color2', '#00135c']	},
	'pantalon_detalleexterior_vivobolsillo_verdetopomarino': {'bg' : ['.vivo.color1', '#01642d'],'topos' : ['.vivo.color2', '#00135c']	}
}


let SVGCOLORS_DETALLEINTERIOR = {
	'pantalon_detalleinterior_vivointerior_827' : {'bg':['.vivoint.color1', '#00155c'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_503' : {'bg':['.vivoint.color1', '#d00054'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_909' : {'bg':['.vivoint.color1', '#00662f'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_1315': {'bg':['.vivoint.color1', '#006398'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_770' : {'bg':['.vivoint.color1', '#f7f8f8'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_118' : {'bg':['.vivoint.color1', '#f6b63e'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_128' : {'bg':['.vivoint.color1', '#bc0c24'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_451' : {'bg':['.vivoint.color1', '#e76114'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_3585': {'bg':['.vivoint.color1', '#661081'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_1421': {'bg':['.vivoint.color1', '#e569a3'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_1284': {'bg':['.vivoint.color1', '#89878c'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_554' : {'bg':['.vivoint.color1', '#816926'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_827' : {'bg':['.vivoint.color1', '#00155c'],'topos':['.vivoint.color2','transparent']},
	'pantalon_detalleinterior_vivointerior_marinotopoblanco': {'bg' : ['.vivoint.color1', '#00135c'],'topos' : ['.vivoint.color2', '#ffffff']	},
	'pantalon_detalleinterior_vivointerior_granatetopoblanco': {'bg' : ['.vivoint.color1', '#bb0e24'],'topos' : ['.vivoint.color2', '#ffffff']	},
	'pantalon_detalleinterior_vivointerior_rojotopomarino': {'bg' : ['.vivoint.color1', '#d11953'],'topos' : ['.vivoint.color2', '#00135c']	},
	'pantalon_detalleinterior_vivointerior_verdetopomarino': {'bg' : ['.vivoint.color1', '#01642d'],'topos' : ['.vivoint.color2', '#00135c']	},

	'pantalon_detalleinterior_forrobolsillos_827' : {'bg':['.forroint.color1', '#00155c'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_503' : {'bg':['.forroint.color1', '#d00054'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_909' : {'bg':['.forroint.color1', '#00662f'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_1315': {'bg':['.forroint.color1', '#006398'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_770' : {'bg':['.forroint.color1', '#f7f8f8'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_118' : {'bg':['.forroint.color1', '#f6b63e'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_128' : {'bg':['.forroint.color1', '#bc0c24'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_451' : {'bg':['.forroint.color1', '#e76114'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_3585': {'bg':['.forroint.color1', '#661081'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_1421': {'bg':['.forroint.color1', '#e569a3'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_1284': {'bg':['.forroint.color1', '#89878c'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_554' : {'bg':['.forroint.color1', '#816926'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_827' : {'bg':['.forroint.color1', '#00155c'],'topos':['.forroint.color2','transparent']},
	'pantalon_detalleinterior_forrobolsillos_marinotopoblanco': {'bg' : ['.forroint.color1', '#00135c'],'topos' : ['.forroint.color2', '#ffffff']	},
	'pantalon_detalleinterior_forrobolsillos_granatetopoblanco': {'bg' : ['.forroint.color1', '#bb0e24'],'topos' : ['.forroint.color2', '#ffffff']	},
	'pantalon_detalleinterior_forrobolsillos_rojotopomarino': {'bg' : ['.forroint.color1', '#d11953'],'topos' : ['.forroint.color2', '#00135c']	},
	'pantalon_detalleinterior_forrobolsillos_verdetopomarino': {'bg' : ['.forroint.color1', '#01642d'],'topos' : ['.forroint.color2', '#00135c']	},

	'pantalon_detalleinterior_pretina_1916' : {
		'bg':['.pretina.color1', '#d11953'],'topos':['.pretina.color2','#00135c'],
		'bg2':['.pretina.color3', '#ffffff'],'topos2':'',
		'bg3':['.pretina.color4', '#00135c'],'topos3':''
	},

	'pantalon_detalleinterior_pretina_2016' : {
		'bg':['.pretina.color1', '#00135c'],'topos':['.pretina.color2','#ffffff'],
		'bg2':['.pretina.color3', '#ffffff'],'topos2':'',
		'bg3':['.pretina.color4', '#d11953'],'topos3':''
	},

	'pantalon_detalleinterior_pretina_2614' : {
		'bg':['.pretina.color1', '#56acde'],'topos':['.pretina.color2','transparent'],
		'bg2':['.pretina.color3', '#e00209'],'topos2':'',
		'bg3':['.pretina.color4', '#cabc9f'],'topos3':''
	},

	'pantalon_detalleinterior_pretina_2714': {
		'bg':['.pretina.color1', '#56acde'],'topos':['.pretina.color2','transparent'],
		'bg2':['.pretina.color3', '#00135c'],'topos2':'',
		'bg3':['.pretina.color4', '#cabc9f'],'topos3':''
	},



	'pantalon_detalleinterior_pretina_1616' : {
		'bg':['.pretina.color1', '#56acde'],'topos':['.pretina.color2','#ffffff'],
		'bg2':['.pretina.color3', '#e00209'],'topos2':'',
		'bg3':['.pretina.color4', '#56acde'],'topos3':''
	},
	'pantalon_detalleinterior_pretina_1516' : {
		'bg':['.pretina.color1', '#00135c'],'topos':['.pretina.color2','#ffffff'],
		'bg2':['.pretina.color3', '#e00209'],'topos2':'',
		'bg3':['.pretina.color4', '#00135c'],'topos3':''
	},
	
	'pantalon_detalleinterior_pretina_2316' : {
		'bg':['.pretina.color1', '#00135c'],'topos':['.pretina.color2','transparent'],
		'bg2':['.pretina.color3', '#e00209'],'topos2':'',
		'bg3':['.pretina.color4', '#00135c'],'topos3':''
	},
	
	'pantalon_detalleinterior_pretina_1416' : {
		'bg':['.pretina.color1', '#00135c'],'topos':['.pretina.color2','transparent'],
		'bg2':['.pretina.color3', '#cabc9f'],'topos2':'',
		'bg3':['.pretina.color4', '#00135c'],'topos3':''
	}
}





