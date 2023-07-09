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


// Getting json data
app.get('/indexInfo', async (req, res) => {
    // run code stuff
    let indexInfo = fs.readFileSync('./public/data/index.json', 'utf-8');
    res.json(JSON.parse(indexInfo));
});

app.post('/indexInfo', upload.any(), async (req, res) => {
    const newData = req.body;
    fs.writeFileSync('./public/data/index.json', JSON.stringify(newData, null, 2));
})


app.get('/admin/admin-login', async (req, res) => {
    // run code stuff
    res.sendFile(__dirname + '/public/admin/login.html');
})



// Routes for CPE Department
app.get('/admin/about', async (req, res) => {
    res.sendFile(__dirname + '/public/admin/about.html')
})

app.get('/cpe/accomplishments', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/accomplishment.html')
})

app.get('/cpe/contact', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/contact.html')
})

app.get('/cpe/faculty', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/faculty.html')
})

app.get('/cpe/graduate', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/graduate.html')
})

app.get('/cpe/history', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/history.html')
})

app.get('/cpe/personnel', async (req, res) => {
    res.sendFile(__dirname + '/public/cpe/personnel.html')
})


