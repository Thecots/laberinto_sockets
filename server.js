console.clear();

const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
io_ = require('./routes/partida.routes').io_(io)
const path = require('path');

/* settings */
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes */
app.use(require('./routes/main.routes').router)


/* listener */
server.listen('3000', () => {
  console.log('http://localhost:3000');
})

module.exports = {io}