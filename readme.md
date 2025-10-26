## youtube blog

- multer : Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

NOTE: Multer will not process any form which is not multipart (multipart/form-data).

### serve static files from the public directory
- app.use(express.static(path.resolve('./public')));

### process.env.PORT
- When you deploy to platforms like Render, Vercel, or Heroku — they automatically assign a port for our app using an environment variable.

So using process.env.PORT makes our code work everywhere — both locally and on servers.

- process.env.PORT means "get the PORT number from the environment variables.