const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const blogRoute = require('./routes/blog');

const Blog = require('./models/blog');


const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookies } = require('./middlewares/authentication');


const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost:27017/blogify').then(e => console.log('DB Connected'));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(checkForAuthenticationCookies('token'));


// serve static files from the public directory
app.use(express.static(path.resolve('./public')));


// mount user routes under /user
app.use('/user', userRouter);
app.use('/blog', blogRoute);


app.get('/', async (req, res) => {
  // fetch blogs sorted by newest first
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  // normalize coverImageURL saved as '/public/uploads/...' to '/uploads/...'
  const blogs = allBlogs.map(b => {
    if (b.coverImageURL && b.coverImageURL.startsWith('/public/')) {
      return { ...b, coverImageURL: b.coverImageURL.replace(/^\/public/, '') };
    }
    return b;
  });

  res.render('home', {
    user: req.user,
    blogs,
  });

});

app.listen(port, () => console.log(`Server started at Port: ${port}`));


