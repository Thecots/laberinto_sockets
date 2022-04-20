const express = require("express");
const router = express.Router();
const path = require('path');
const {savedb, getdb} = require('../helpers/dbcontroller');

/* crear mapa */
router.get('/crear_mapa',(req,res)=> {
  res.sendFile(path.join(__dirname+'/../public/html/creator.html'))
})

/* guardar mapa */
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

module.exports = router