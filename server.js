var express = require('express');
var app = express();

require("dotenv").load();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('views', __dirname);
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

    // make sure index is in the right directory. In this case /app/index.html
    res.render('index', {backendUrl: process.env.BACKEND_URL});
});

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/'));

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
