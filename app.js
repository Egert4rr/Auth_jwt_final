const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParses = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParses())

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb://localhost:27017/mySuperSecretDB', {useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex:true});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)


/*//cookies
//app.get('/set-cookies', (req, res) => {

  res.setHeader('Set-Cookie', 'newUser=true')
  res.cookie('newUser', false)
  res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 *24, httpOnly: true})

  res.send('got cookie')

})

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies

  res.json(cookies)

}) */


//////IMPORTANT Node Auth #11 p1 (13:00)