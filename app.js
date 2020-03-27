const express = require ('express');
const ejs = require ('ejs');
const multer = require ('multer');
const path = require ('path');

// storage engine
const storage = multer.diskStorage({
    destination: './public/upload',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() +
        path.extname(file.origanalname));
    }
});

// init upload
const upload = multer ({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// check file type
function checkFileType(file, cb){
    // allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
    // check extension
    const extname = filetypes.test(path.extname
    (file.origanlname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

// app initillize
const app = express();

// ejs
app.set('view engine', 'ejs');
app.use (express.static('./public'));
app.get('/', (req, res) => res.render('index'));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: 'Error: No file is selected!'
            });
        } else {
            if(req.file == udefined){
                res.render('index', {
                    msg: 'Error: No file selected!'
                });
            } else {
                res.render('index',{
                    msg: 'file uploaded!',
                    file: 'upload/${req.file.filename}'
                });
            }
        }
    });
});

// app server starting
const port = 3000;
app.listen (port, () => console.log('server is starting...'));