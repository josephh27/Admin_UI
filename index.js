const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const multer = require('multer');
// Security packages
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const PORT = process.env.PORT || 3000;

const serviceAccount = require("./serviceAccountKey.json");

app.use(cors()); //Allow request from any IP

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/public/img');
    },
    filename: function (req, file, callback) {
        const filename = `file_${file.originalname}`;
        console.log(file);
        callback(null, filename);
    }
})

const upload = multer({ storage: storage });
app.use(express.static('public'));


// Security configuration
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://server-auth-41acc.firebaseio.com",
});

const csrfMiddleware = csrf({ cookie: true });
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

app.get("/admin/login", function (req, res) {
    res.sendFile(__dirname + '/public/admin/login.html');
})

app.get("/session_login", function (req, res) {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            res.json(userData);
        })
        .catch((error) => {
            res.json({});
        });
    });

app.post("/session_login", (req, res) => {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
        (sessionCookie) => {
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
        }
    );
});


app.get("/session_logout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/admin/login");
});
// End of security configuration



// Getting department info routes
app.get('/cpe_info', async (req, res) => {
    // run code stuff
    let indexInfo = fs.readFileSync('./public/data/cpe_data.json', 'utf-8');
    res.json(JSON.parse(indexInfo));
});

app.post('/cpe_info', upload.any(), async (req, res) => {
    const newData = req.body;
    fs.writeFileSync('./public/data/cpe_data.json', JSON.stringify(newData, null, 2));
})


// Admin routes
app.get("/admin/cpe", function (req, res) {
    const sessionCookie = req.cookies.session || "";
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .then((userData) => {
        res.sendFile(__dirname + '/public/admin/cpe_admin.html');
      })
      .catch((error) => {
        res.redirect("/admin/login");
    });
});






// Routes for CPE Department
app.get('/cpe/about', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

