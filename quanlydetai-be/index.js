const express = require("express");
const app = express();
const cors = require("cors");
var https = require('https');
const connectDB = require("./configs/database");
const router = require("./routers");
const fs = require('fs')

var privatekey = fs.readFileSync('./certs/cert.key', 'utf8')
var certificate = fs.readFileSync('./certs/cert.crt', 'utf8')
var credential = {key: privatekey, cert: certificate}

app.use(express.json());
app.use(cors());

connectDB();


// app.listen(process.env.PORT || 8080, () => {
//   console.log("Server run at port 8000");
// });

var httpsServer = https.createServer(credential, app)
httpsServer.listen(8000)
router(app);