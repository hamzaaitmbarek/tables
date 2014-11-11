var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Répertoire contenant les données statiques
app.use(express.static(__dirname + '/public'));

// Réponse à la requête permettant d'obtenir la liste des tables
app.get('/listeTables', function(req, res){
	
	// envoi des données au format JSON
	res.json(tables);
});

// Réponse à la requête permettant de changer l'état d'une tables
app.post('/modifierTable/etat/:table/:newEtat', function(req, res){
  var id = req.params.table;
  var etat= req.params.newEtat;
	tables[id].etat = etat;
	res.json(tables[id]);
});


// Réponse à la requête permettant d'obtenir les données d'une table
app.get('/data/:table', function(req, res){
	// chargement des données
	var table = tables[req.params.table];

	// envoi des données au format JSON
	res.json(table);
});


// Réponse à la requête permettant d'obtenir la liste des boissons
app.get('/listeBoissons', function(req, res){
  
  // envoi des données au format JSON
  res.json(boissons);
});

// Réponse à la requête permettant d'obtenir les données d'un boisson
app.get('/data1/:boisson', function(req, res){
  // chargement des données
  var boisson = boissons[req.params.boisson];

  // envoi des données au format JSON
  res.json(boisson);
});



// Réponse à la requête permettant d'obtenir la liste des lieux
app.get('/listeLieux', function(req, res){
  
  // envoi des données au format JSON
  res.json(lieux);
});

// Réponse à la requête permettant d'obtenir les données d'un lieu
app.get('/data2/:lieu', function(req, res){
  // chargement des données
  var lieu = lieux[req.params.lieu];

  // envoi des données au format JSON
  res.json(lieu);
});







// Démarrage du serveur
http.listen(3030, function(){
  console.log('listening on *:3030');
});






//---------SOCKET--------------
io.on('connection', function(socket){
	
  socket.on('changerEtat', function(data){
	//modifier une table
    var id = data[0];
    var etat = data[1];
    tables[id].etat = etat;
	//envoyer la table modifiée
    io.emit('miseAJour', data);
  });


});












// Les données des tables 
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
var fut = function(_id,_volume,_boisson,_table) {
  this.id = _id;
  this.volume = _volume;
  this.boisson = _boisson;
  this.table = _table;
};
var boisson = function(_id,_fabricant,_logo,_type,_description) {
  this.id = _id;
  this.fabricant = _fabricant;
  this.logo = _logo;
  this.type = _type;
  this.description = _description;
  this.details=false;
};
var prix_lieu = function(_lieu,_boisson,_prix) {
  this.lieu = _lieu;
  this.boisson = _boisson;
  this.prix = _prix;
};

var lieux = [
      new lieu(0,'Brest','https://maps.google.fr/maps/ms?num=1&amp;ie=UTF8&amp;hl=fr&amp;msa=0&amp;msid=211688303479563437137.0004a38e715bb3e72ec41&amp;source=embed&amp;t=m&amp;ll=48.902335,2.154667&amp;spn=0,0&amp;output=embed'),
      new lieu(1,'Paris','https://www.google.fr/maps/place/Universit%C3%A9+de+Bretagne+Occidentale+-+UBO/@48.398046,-4.507758,17z/data=!3m1!4b1!4m2!3m1!1s0x4816bbf7926349e9:0xfdabf9ecd3f1a0c9'),
      new lieu(1,'Nantes','https://www.google.fr/maps/place/Universit%C3%A9+de+Bretagne+Occidentale+-+UBO/@48.398046,-4.507758,17z/data=!3m1!4b1!4m2!3m1!1s0x4816bbf7926349e9:0xfdabf9ecd3f1a0c9')

    ];

  var tables = [
      new table(0,'Annick','54:25:36:j5','OFF','images/tab.jpg',false,lieux[0]),
      new table(1,'Annegrete','f4:58:4g:fz','OFF','images/tab.jpg',false,lieux[1]),
      new table(2,'Ontoinette','f5:59:5g:fx','OFF','images/tab.jpg',false,lieux[2])

    ];
  var boissons= [
      new boisson(0,'DOSI','images/cafe.jpg','boisson chaud','Café'),
      new boisson(1,'DOSI','images/coca-cola.jpg','boisson froid','Coca-Cola'),
      new boisson(1,'DOSI','images/redbull.jpg','boisson froid','Red Bull')

  ];
  var futs = [
      new fut(0,'10l',boissons[0],tables[0]),
      new fut(1,'50l',boissons[1],tables[1]),
      new fut(1,'50l',boissons[1],tables[1])

  ];

  var prix_lieux = [
      new prix_lieu(lieux[0],boissons[0],'1$'),
      new prix_lieu(lieux[1],boissons[1],'2$'),
      new prix_lieu(lieux[1],boissons[1],'2$')


  ];
