var express = require('express');

var app = express();

// Set up template
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set the location for static files, images, client javascripts, stylesheets...
app.use(express.static(__dirname + '/public'))

var fortunes=[
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

// Route handlers for pages

app.get('/', function(req, res){
  res.render('home');
});


app.get('/about', function(req, res){
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {fortune: randomFortune})
});


//404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

// 500 Error page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// Set up the port that the server will listen on, and start server

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Server is running on http://localhost/' + app.get('port'));
});
