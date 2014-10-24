(function() {
	var tablesVar = [
		{
			nom: 'Annick',
			image: 'table.jpg',
			d1: 'Annick.d1',
			d2: 'Annick.d2',
			afficher : false,
		},
		{
			nom: 'Annegrete',
			image: 'table.jpg',
			d1: 'Annegrete.d1',
			d2: 'Annegrete.d2',
			afficher : false,
		},
		{
			nom: 'Agathe',
			image: 'table.jpg',
			d1: 'Agathe.d1',
			d2: 'Agathe.d2',
			afficher : false,
		},
		{
			nom: 'Antoinette',
			image: 'table.jpg',
			d1: 'Antoinette.d1',
			d2: 'Antoinette.d2',
			afficher : false,
		},
		{
			nom: 'Augustine.',
			image: 'table.jpg',
			d1: 'Augustine.d1',
			d2: 'Augustine.d2',
			afficher : false,
		},
	]
	var app =angular.module('table', [ ]);
	
	
	
	
	app.controller('TableController', function(){
		this.tables= tablesVar;
		
		this.afficher = function(tab){
			if(tab.afficher)
				tab.afficher=false;
			else
				tab.afficher=true;
		};
		
		this.isSet = function(tab){
			return tab.afficher;
		};
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})();