var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();

// Custom
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//---------------- boilerplate ----------------

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//---------------- custom code ---------------

/* path provided in index.html */
app.post("/api/fileanalyse", upload.single('upfile'), 
  function (req, res) {
  // NOTE:
  // req.file is the file
  // req.body will hold the text fields
  
  var file = req.file;
  console.log("Uploaded file");
  //console.log(file);

  // output
  res.json( {
    type: file.mimetype,
    size: file.size,
    name: file.originalname
  });
  }
);
