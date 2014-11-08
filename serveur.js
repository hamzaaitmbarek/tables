var express = require('express')
var app = express()

// Répertoire contenant les données statiques
app.use(express.static(__dirname + '/public'));

// Réponse à la requête permettant d'obtenir les données d'une table
app.get('/data/:table', function(req, res){
	// chargement des données
	var table = tables[req.params.table];

	// envoi des données au format JSON
	res.json(table);
});

// Démarrage du serveur
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Serveur écoute http://localhost:%s', port);
});

// Les données des tables 
// (typiquement ces données seraient enregistrées en base de données)
var tables = { 
    'Annick' : {
      mac : "32:5b:c4:44:09:d5",
      state : "OFF",
      place : "Brest",
      keg : []
    },
    'Annegrete' : {
      mac : "48:17:e2:cb:21:f4",
      state : "OFF",
      place : "Brest",
      keg : []
    }
  };