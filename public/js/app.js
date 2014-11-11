(function() {
  var app = angular.module('tpAngular', []);
	var tables;
  var boissons;


//************************************************************utilisation d'un service que je ne comprend pas !!!!
app.factory('socket', function($rootScope) {
var socket = io.connect();
return {
on: function(eventName, callback) {
socket.on(eventName, function() {
var args = arguments;
$rootScope.$apply(function() {
callback.apply(socket, args);
});
});
},
emit: function(eventName, data, callback) {
socket.emit(eventName, data, function() {
var args = arguments;
$rootScope.$apply(function() {
if(callback) {
callback.apply(socket, args);
}
});
});
}
};
});
//************************************************************fin service


//**************SOCKET*******************
var socket = io();

  app.controller('ListController', ['$scope', '$http','socket', function($scope, $http, socket){


	$scope.tables = [];
	//**************SOCKET*******************
		//changer l'état d'une table
	$scope.changerEtatS = function(table, newEtat){
		socket.emit('changerEtat', [table.id , newEtat]);
	}
		
	function f(id, etat){
		$scope.tables[id].etat = etat;
	}
		//reception des mise a jours
	socket.on('miseAJour', function(data){
		
		var id = data[0];
		var etat = data[1];
		f(id,etat);

	});
	
	//*******************fin SOCKET**************************

    // Affichage de la liste des tables
	$http.get("/listeTables").success(function(data){
		//tables = data;
		$scope.tables = data;
		console.log($scope.tables);
	}).error(function(errmsg){
		alert("impossible de charger la liste des tables");
	});



    // Fonction permettant l'affichage des détails des tables
    $scope.toggle = function(table){
          table.details = ! table.details;     
      } ;


       // Affichage de la liste des boissons
     $http.get("/listeBoissons").success(function(data1){
        boissons=data1;
        $scope.boissons = data1;
     }).error(function(errmsg){
        alert("impossible de charger la liste des tables");
     });

    // Fonction permettant l'affichage des détails des boissons
    $scope.toggleB = function(boisson){
          boisson.details = ! boisson.details;      
      } ;
  }]);
  //navigation entre les liens
  app.controller('NavController', function(){
    this.nav = 1;

    this.setNav = function(newValue){
      this.nav=newValue;
    };

    this.isSet = function(navName){
      return this.nav === navName;
    };
  });
})();
