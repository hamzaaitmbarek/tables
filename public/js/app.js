(function() {
  var app = angular.module('tpAngular', []);
	var tables;





//**************SOCKET*******************
var socket = io();



  app.controller('ListController', ['$scope', '$http', function($scope, $http){


	$scope.tables = [];
	//**************SOCKET*******************
	$scope.changerEtatS = function(table, newEtat){

		socket.emit('changerEtat', [table.id , newEtat]);
		//f(table.id,newEtat);
	}

	function f(id, etat){
		$scope.tables[id].etat = etat;
		alert('la table: ' + $scope.tables[id].id +' = '+$scope.tables[id].etat);
	}
	socket.on('miseAJour', function(data){
		
		//alert('la table: ' + data[0] +' = '+data[1]);
		var id = data[0];
		var etat = data[1];
		
		//alert('la table: ' + $scope.tables[id].id +' = '+$scope.tables[id].etat);
		f(id,etat);
		//alert('la table: ' + $scope.tables[id].id +' = '+$scope.tables[id].etat);

	});
	
	//*********************************************

    // Affichage de la liste des tables
	$http.get("/listeTables").success(function(data){
		//tables = data;
		$scope.tables = data;
		console.log($scope.tables);
	}).error(function(errmsg){
		alert("impossible de charger la liste des tables");
	});

      //la fonction dui change l'etat
 	$scope.changerEtat = function(table, newEtat){
		// Requete Postpour changer l'état d'une table
      		$http.post('/modifierTable/etat/' + table.id + '/' + newEtat).success(function(data){
			alert("table modifiée");
		});
		table.state = newEtat;
	}


    // Fonction permettant l'affichage des détails
    $scope.toggle = function(table){
        table.details = ! table.details;
    }
  }]);
})();
