(function() {
  var app = angular.module('tpAngular', []);

  app.controller('ListController', ['$scope', '$http', function($scope, $http){
    // Affichage de la liste des tables
    $scope.tables = tables;  

    // Fonction permettant l'affichage des détails
    $scope.toggle = function(table){
      // Requete GET pour réupérer les données de la table
      $http.get('/data/' + table.name).success(function(data){
        // enregistrement local des données
        table.mac = data.mac;
        table.state = data.state;
        table.place = data.place;
        // affichage des détails
        table.details = ! table.details;
      });      
    }

  }]);

  var tables = [
    {
      name : 'Annick',
      img : 'images/table.png',
      details : false
    },
    {
      name : 'Annegrete',
      img : 'images/table.png',
      details : false
    }
    ];
})();
