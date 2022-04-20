const express = require("express");
const router = express.Router();
const path = require('path');
const {getdb} = require('../helpers/dbcontroller');
const { v4: uuidv4 } = require('uuid');

class Game{
  constructor(title, map,playersSize){
    this.title = title
    this.map = map
    this.playersSize = playersSize
    this.players = []
  }

}


const rooms = {}

/* Crear partida */
router.get('/crear_partida',(req,res)=> {
  res.sendFile(path.join(__dirname+'/../public/html/newGame.html'))
})

router.post('/getallmaps', (req,res) => {
  db = getdb().map(n => {return {id: n.id, src: n.img}})
  res.json({ok:true, data: db})
})




/* partidas */

router.post('/getGames', (req,res) => {
  arr = Object.keys(rooms).map(n => {
    return {
      id: n,
      creator: rooms[n].game.players[0].username,
      title: rooms[n].game.title,
      playersSize: rooms[n].game.playersSize,
      players: rooms[n].game.players.length
    }
  })

  res.json({ok:true, data: arr})
})



router.post('/getmap',(req,res) => {
  db = getdb()
  db = db.find(n => n.id == rooms[req.body.id].game.map)
  res.json({ok:true, data: db})
})

/* partida */




exports.io_ =  function(io){
  io.sockets.on('connection', function (socket) {
    router.post('/createNewGame', (req,res) => {
      let id = uuidv4()
      rooms[id] = {game: new Game(req.body.title,req.body.map,req.body.players)} 
      res.send({ok: true, data: {id}})
    })
    
    router.get('/game',(req,res) => {
      console.log(req.query.id);    
      res.sendFile(path.join(__dirname+'/../public/html/play.html'))
    })

    socket.on('new-user', (roomName, username) =>{
      if(rooms[roomName].game.playersSize > rooms[roomName].game.players.length){
        socket.join(roomName)
        rooms[roomName].game.players.push({username: username, id: socket.id}) 

        socket.to(roomName).broadcast.emit('user-connected', username)
      }else{
        res.redirect('/')
      }
    })

    router.get('/play', (req,res) => {
      res.redirect(`/game?id=${req.query.id}`)
      
    })
    

    socket.on('disconnect', () => {
      Object.keys(rooms).forEach(n => {
        rooms[n].game.players.forEach((e,i) => {
          console.log({e, so: socket.id});
          if(socket.id == e.id){
          }
        })
      })
    })

  });
}

exports.router = router