console.clear();

const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)
const path = require('path');
const { route } = require('./routes/main.routes');

/* settings */
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes */
app.use( require('./routes/main.routes'))


/* listener */
server.listen('3000', () => {
  console.log('http://localhost:3000');
})

module.exports = {io}