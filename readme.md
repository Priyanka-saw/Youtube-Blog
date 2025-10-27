## youtube blog

- multer : Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

NOTE: Multer will not process any form which is not multipart (multipart/form-data).

### serve static files from the public directory
- app.use(express.static(path.resolve('./public')));

### process.env.PORT
- When you deploy to platforms like Render, Vercel, or Heroku — they automatically assign a port for our app using an environment variable.

So using process.env.PORT makes our code work everywhere — both locally and on servers.

- process.env.PORT means "get the PORT number from the environment variables.


## Blog Page Summary
- This Blog Page project is built using Node.js, Express.js, MongoDB, and EJS.
It lets users create, view, comment on, and delete blogs with images.
Multer handles image uploads, and Bootstrap is used for styling.
Mongoose manages database operations for blogs and comments.

### Tools & Technologies Used

- Node.js

JavaScript runtime used to run your backend application.

- Express.js

Web framework used to handle routes (/blog, /user, /comment, etc.) and HTTP requests easily.

Middleware like express.urlencoded() is used to parse form data.

- EJS (Embedded JavaScript)

Template engine used to render dynamic HTML pages.

Allows embedding JavaScript directly inside HTML (e.g., <%= blog.title %>).

- MongoDB + Mongoose

MongoDB → Database to store blogs, users, and comments.

Mongoose → ODM library that provides schema and model-based access to MongoDB.

- Multer

Middleware for handling file uploads (e.g., cover images for blogs).

Saves uploaded files inside /public/uploads/.

- dotenv

Loads environment variables (like PORT, MONGODB_URL) from a .env file.

- cookie-parser

Middleware to parse cookies, mainly for authentication tokens.

- Custom Authentication Middleware

checkForAuthenticationCookies('token') is used to identify the logged-in user and manage sessions securely.

- Bootstrap / CSS

For layout and styling (used classes like container, btn, form-control, etc.).

- path (Node.js built-in module)

Used to manage file paths (e.g., for saving uploads or setting views folder).


## Main Features
- Add New Blog (with title, body, and image upload)

- View Blog Details

- Add Comments

- Delete Blog (only by blog owner)

- Authentication system using cookies and tokens

- Dynamic rendering using EJS templates

```
project/
├── models/
│   ├── blog.js
│   ├── comments.js
├── routes/
│   ├── blog.js
│   ├── user.js
├── middlewares/
│   └── authentication.js
├── public/
│   ├── uploads/
│   ├── css/
│   ├── images/
├── views/
│   ├── home.ejs
│   ├── blog.ejs
│   ├── addBlog.ejs
│   └── partials/
│       ├── head.ejs
│       ├── nav.ejs
│       └── scripts.ejs
├── app.js
├── .env
└── package.json

```