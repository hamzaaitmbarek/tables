(function() {
  var app = angular.module('tpAngular', []);
	var tables;
  var boissons;
  app.controller('ListController', ['$scope', '$http', function($scope, $http){

      // Affichage de la liste des tables
	   $http.get("/listeTables").success(function(data){
		    tables = data;
		    $scope.tables = data;
	   }).error(function(errmsg){
		    alert("impossible de charger la liste des tables");
	   });

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
      } ;


       // Affichage de la liste des boissons
     $http.get("/listeBoissons").success(function(data1){
        boissons=data1;
        $scope.boissons = data1;
     }).error(function(errmsg){
        alert("impossible de charger la liste des tables");
     });

    // Fonction permettant l'affichage des détails
    $scope.toggle = function(boisson){
      // Requete GET pour réupérer les données de la table
        $http.get('/data1/' + boisson.id).success(function(data1){
        // enregistrement local des données
          boisson.fabricant = data1.fabricant;
          boisson.type = data1.type;
        // affichage des détails
          boisson.details = ! boisson.details;
        }).error(function(errmsg){
          alert("impossible de charger la table");
        });      
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
