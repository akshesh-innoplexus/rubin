
/**
 * Module dependencies.
 */

var express = require('express')
    , mongoose = require('mongoose')
    , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// db connection
mongoose.connect('mongodb://localhost/rubin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("We're connected to the db!");
    var kittySchema = mongoose.Schema({
        name: String
    });
});

// Routes
app.get('/api', routes.index);
app.put('/api', routes.random);
app.get('/api/users', routes.users);
app.post('/api/users', routes.addUser);
app.get('/api/users/:user_id', routes.user);
app.put('/api/users/:user_id', routes.updateUser);
app.delete('/api/users/:user_id', routes.deleteUser);

// Models
var User = require('./models/user');

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
