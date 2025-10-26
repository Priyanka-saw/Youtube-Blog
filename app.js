require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');
const { checkForAuthenticationCookies } = require('./middlewares/authentication');

const app = express();
const port = process.env.PORT || 8000;

//  Connect MongoDB safely
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/blogify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(' DB Connected'))
  .catch((err) => console.error(' DB Connection Error:', err));

//  Set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//  Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookies('token'));
app.use(express.static(path.resolve('./public')));

//  Routes
app.use('/user', userRouter);
app.use('/blog', blogRoute);

//  Home route
app.get('/', async (req, res) => {
  try {
    // fetch blogs sorted by newest first
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

    // normalize coverImageURL saved as '/public/uploads/...' to '/uploads/...'
    const blogs = allBlogs.map((b) => {
      if (b.coverImageURL?.startsWith('/public/')) {
        b.coverImageURL = b.coverImageURL.replace(/^\/public/, '');
      }
      return b;
    });

    res.render('home', {
      user: req.user || null,
      blogs,
    });
  } catch (err) {
    console.error('Error loading home page:', err);
    res.status(500).send('Server Error');
  }
});

//  Start server
app.listen(port, () => console.log(` Server running on port ${port}`));
