const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./util/helpers');
const hbs = exphbs.create({helpers});
const routes = require("./controllers");
const seedAll = require('./seeds')


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


//create app and initialize session variables
const app = express();
const PORT = process.env.PORT || 3002;

// create view engine for handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/posts', (req, res)=>{
    if(!req.session.loggedIn){
        res.redirect('/login');
        return;
      }
      
    res.render('posts', { loggedIn: req.session.loggedIn, username: req.session.username });
})

app.get('/create-post', (req, res)=>{
      
    res.render('create-post');
})

//turn on the connection to the db server
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    seedAll();
})