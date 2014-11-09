(function() {
  var app = angular.module('tpAngular', []);
	var tables;
  app.controller('ListController', ['$scope', '$http', function($scope, $http){

    // Affichage de la liste des tables
	$http.get("/listeTables").success(function(data){
		tables = data;
		$scope.tables = data;
	}).error(function(errmsg){
		alert("impossible de charger la liste des tables");
	});

      //la fonction dui change l'etat
 	$scope.changerEtat = function(table, newEtat){
		// Requete Postpour changer l'état d'une table
      		$http.post('/modifierTable/etat/' + table.id + '/' + newEtat).success(function(data){
			alert("table modifiée");
		});
	}


    // Fonction permettant l'affichage des détails
    $scope.toggle = function(table){
      // Requete GET pour réupérer les données de la table
      $http.get('/data/' + table.id).success(function(data){
        // enregistrement local des données
       table.mac = data.addresse;
        table.state = data.etat;
        table.place = data.lieu.nom;
        // affichage des détails
        table.details = ! table.details;
      }).error(function(errmsg){
		alert("impossible de charger la table");
	});      
    }
  }]);
})();
