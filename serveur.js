	var PORT = 8000;
	var express = require('express');
	var app = express();

	app.get('/', function(req, res){
	  res.sendFile(__dirname + '/public/index.html');
	  });
	
	app.use(express.static(__dirname + 'public'));

	var server = app.listen(PORT, function(){
		console.log('le Serveur http écoute %d', server.address().port);
	});