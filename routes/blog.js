const  {Router } = require('express');
const multer = require('multer');
const router = Router();
const path = require('path');

const Blog = require('../models/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });


router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
}); 


router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render('blog', {
        user: req.user,
        blog,
    });
});



router.post('/', upload.single('coverImage'), async (req, res) => {
    // read form fields from req.body (avoid undeclared identifiers)
    const { body, title } = req.body;

    // require authenticated user to set createdBy (prevents Mongoose validation error)
    if (!req.user || !req.user._id) {
        return res.redirect('/user/signin');
    }

    // normalize uploaded file URL to match express.static serving from ./public
    const coverImageURL = req.file ? `/uploads/${req.file.filename}` : '/images/default.png';

    try {
        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,
            coverImageURL,
        });

        return res.redirect(`/blog/${blog._id}`);
    } catch (err) {
        console.error('Error creating blog:', err);
        // Render add form with previous input and error details so user can fix validation issues
        return res.status(400).render('addBlog', {
            error: err,
            formData: { title, body },
            user: req.user,
        });
    }
}); 


module.exports = router;