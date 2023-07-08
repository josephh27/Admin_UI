const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const multer = require('multer');
const port = 3000;

app.use(express.static('public'));
// To create a shortcut directory to views golder
// app.engine("html", require("ejs").renderFile);
app.use(cors()); //Allow request from any IP

const middle = express.urlencoded({ 
    extended: false, 
    limit: 10000,
    parameterLimit: 2,
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/public/files');
    },
    filename: function (req, file, callback) {
        const filename = `file_${file.originalname}`;
        callback(null, filename);
    }
})
const upload = multer({ storage: storage });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/about', async (req, res) => {
    // run code stuff
    res.sendFile(__dirname + '/public/about.html');
});

// Getting json data
app.get('/indexInfo', async (req, res) => {
    // run code stuff
    let indexInfo = fs.readFileSync('./public/data/index.json', 'utf-8');
    res.json(JSON.parse(indexInfo));
});

app.post('/indexInfo', upload.any(), (req, res) => {
    // run code stuff
    const newData = req.body;
    fs.writeFileSync('./public/data/index.json', JSON.stringify(newData, null, 2));
    console.log(req.body);
    console.log(req.files);
});

app.get('/admin-login', async (req, res) => {
    // run code stuff
    res.sendFile(__dirname + '/public/admin/login.html');
})


// Routes for CPE Department
app.get('/cpe/about', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/about.html')
})