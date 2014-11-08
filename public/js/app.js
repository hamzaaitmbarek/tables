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


var table = function(_id,_nom,_addresse,_etat,_img,_details,_lieu) {
  this.id = _id;
  this.nom = _nom;
  this.addresse = _addresse;
  this.etat = _etat;
  this.img = _img;
  this.details = _details;
  this.lieu=_lieu;
};
var lieu = function(_id,_nom,_position) {
  this.id = _id;
  this.nom = _nom;
  this.position = _position;
};
var fut = function(_id,_volume,_boisson) {
  this.id = _id;
  this.volume = _volume;
  this.boisson = _boisson;
};
var boisson = function(_id,_fabricant,_logo,_type,_img,_description,_lieu) {
  this.id = _id;
  this.fabricant = _fabricant;
  this.logo = _logo;
  this.type = _type;
  this.description = _description;
};
var prix = function(_lieu,_boisson,_prix) {
  this.lieu = _lieu;
  this.boisson = _boisson;
  this.prix = _prix;
};

var lieux = [
      new lieu(0,'brest','a'),
      new lieu(1,'paris','b')

    ];
  var tables = [
      new table(1,'Annick','brest','OFF','images/table.png',false,lieux[0]),
      new table(2,'Annegrete','paris','OFF','images/table.png',false,lieux[1])

    ];





})();
