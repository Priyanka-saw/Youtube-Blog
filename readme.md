## youtube blog

- multer : Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

NOTE: Multer will not process any form which is not multipart (multipart/form-data).

### serve static files from the public directory
- app.use(express.static(path.resolve('./public')));