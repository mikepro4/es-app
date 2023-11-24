const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { readFileSync } = require('fs');

// from M
const passport = require('passport');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const PUBLIC_DIR = "public";
const STATIC_DIR = "static";
const timeout = require('connect-timeout')

// LATEST VERSION Socket io @4.4.1
const { createServer } = require("https");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const httpsOptions = {
  key: readFileSync('./config/key.pem'),
  cert: readFileSync('./config/certificate.pem')
};

const keys = require("./config/keys");

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const connectDb = require("./utilsServer/connectDb");

const {
  addUser,
  removeUser,
  findConnectedUser
} = require("./utilsServer/roomActions");

app.use(express.json());
app.use(timeout('15s'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(fileUpload());
app.use(express.static(STATIC_DIR));
app.use(express.static(PUBLIC_DIR));

app.use(passport.initialize());
app.use(passport.session());

connectDb();

io.on("connection", socket => {
  console.log("A user connected");
  socket.on("join", async (user) => {
    const users = await addUser(user._id, socket.id);
    console.log(users);

    setInterval(() => {
      socket.emit("connectedUsers", {
        // users: users.filter(u => u.userId !== user._id)
        users: users
      });
    }, 2000);
  });

  socket.on("disconnect", () => removeUser(socket.id));

  socket.on("sendMessage", async ({ message }) => {
  });

});

const PORT = process.env.PORT || 9000;

nextApp.prepare().then(() => {
    fs.readdirSync(path.resolve(`./mainapi`)).map(filePath =>
        app.use(`/mainapi/${filePath.split(".")[0]}`, require(`./mainapi/${filePath}`))
    );

    app.all("*", (req, res) => handle(req, res));
  

    app.all('*', (req, res) => {
      return handle(req, res);
    });
  
    createServer(httpsOptions, app).listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${PORT}`);
    });
});

module.exports = { io };

  