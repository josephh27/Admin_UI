const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(cors()); //Allow request from any IP
app.use(express.urlencoded({ 
    extended: false, 
    limit: 100000,
}))

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

app.post('/indexInfo', async (req, res) => {
    // run code stuff
    const newData = req.body
    fs.writeFileSync('./public/data/index.json', JSON.stringify(newData, null, 2));
});
