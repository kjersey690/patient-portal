const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');


// Bring in mongoose
mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', ()=>{
  console.log('Connected to MongoDB');
});

let Patient = require('./models/patient');



// Check for database error
db.on('error', (err)=>{
  console.log(err);
})

// Load View Engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json());

// Static Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root   = namespace.shift()
    , formParam = root;

    while(namespace.length){
       formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
})

// Home Route
app.get('/', (req, res)=>{
  Patient.find({}, function(err, patients){
    if(err){
      console.log(err);
    }else{
      res.render('index', {
      name:'Patients',
      patients: patients
      });
    }
  });
});

let patients = require('./routes/patients');
app.use('/patients', patients);
let users = require('./routes/users');
app.use('/users', users);

app.listen(9000, ()=>{
  console.log('listening on port 9000');
});