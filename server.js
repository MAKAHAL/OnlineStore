//makahabutahoun
if ( process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require ('express')
const app = express()
const bcrypt = require ('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
const { request } = require('express')
initializePassport(
    passport, 
    email => users.find(user => user.email == email),
    id =>  users.find(user => user.id == id)
)


const users = []
app.use(express.static("public"));
app.set('view engine','ejs')
app.set('view engine','html')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false

}))
app.use('/images', express.static(__dirname+'/images'));
app.get('/shop', (req, res) => { //shop
    res.sendFile(__dirname + '/shop.html' )
   });
   app.get('/about', (req, res) => {// about btn
    res.sendFile(__dirname + '/about.html' )
   });
   app.get('/contactus', (req, res) => { // add contact us btn
    res.sendFile(__dirname + '/contactus.html' )
   });
   app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html' ) // add search button
   });
   app.get('/houston', (req, res) => {
    res.sendFile(__dirname + '/houston.html' ) // add search button
   });
   app.get('/austin', (req, res) => {
    res.sendFile(__dirname + '/austin.html' ) // add search button
   });
   app.get('/chicago', (req, res) => {
    res.sendFile(__dirname + '/chicago.html' ) // add search button
   });
   app.get('/LA', (req, res) => {
    res.sendFile(__dirname + '/LA.html' ) // add search button
   });
   app.get('/NY', (req, res) => {
    res.sendFile(__dirname + '/NY.html' ) // add search button
   });
   app.get('/maiami', (req, res) => {
    res.sendFile(__dirname + '/Maiami.html' ) // add search button
   });
   app.get('/dallas', (req, res) => {
    res.sendFile(__dirname + '/dallas.html' ) // add search button
   });


   


app.use(express.static(__dirname + '/public')); // connect my html 
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.get('',checkAuthenticated, function(req, res) {
    res.sendFile(__dirname + '/App.html' , {name: req.user.name}) // connect it to html instead of ejs
})


app.get('/login', checkNotAuthenticated,  function (req, res){ // for the login 
    res.render('login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/', // where to go if success
    failureRedirect: '/login',
    failureFlash: true 
}))

app.get('/register', checkNotAuthenticated,   async function (req, res){ // for register 
    res.render('register.ejs')

})

app.post('/register' , checkNotAuthenticated, async function (req, res){// for register 

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    }   catch{
res.redirect('/register')
    }

})

app.delete('/logout', (req, res ) =>{
    req.logOut()
    res.redirect('/login') // aftre loggin out
})

function checkAuthenticated (req, res, next){
    if( req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated (req, res, next){
    if( req.isAuthenticated()){
       return  res.redirect('/')
    }
   next()
}


app.listen(3000) // port im going to be using