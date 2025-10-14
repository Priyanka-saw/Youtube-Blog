const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
 const userRouter = require('./routes/user');


const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost:27017/blogify').then(e => console.log('DB Connected'));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// mount user routes under /user
app.use('/user', userRouter);


app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => console.log(`Server started at Port: ${port}`));

