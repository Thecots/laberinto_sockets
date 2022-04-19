const express = require("express");
const router = express.Router();
const path = require('path');
const {savedb, getdb} = require('../helpers/dbcontroller');


router.get('/',(req,res)=> {
  res.render('index', {})
})

router.get('/crear_mapa',(req,res)=> {
  res.sendFile(path.join(__dirname+'/../public/html/creator.html'))
})

router.get('/crear_partida',(req,res)=> {
  res.sendFile(path.join(__dirname+'/../public/html/creator.html'))
})


router.post('/savemap',(req,res)=> {
  db = getdb()
  db.push({
    id: db.length,
    username: req.body.user,
    map: req.body.map,
    img: req.body.img
  })
  savedb(data)
  res.send({ok:true})
})

router.post('/img', (req,res) => {
  db = getdb()
  res.send(db)
})

router.get('/play', (req,res) => {
  res.sendFile(path.join(__dirname+'/../public/html/play.html'))
})

router.post('/getmap',(req,res) => {
  db = getdb()
  db = db.find(n => n.id == req.body.id)
  res.json({ok:true, data: db})
})


/* io.on('connection', socket => {
  socket.on('klk', e => {
   console.log(e);
  })
})
 */
module.exports = router;
