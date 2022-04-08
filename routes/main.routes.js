const express = require("express");
const router = express.Router();
const path = require('path');
const {savedb, getdb} = require('../helpers/dbcontroller');

router.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname+'/../public/html/index.html'))
})

router.get('/creador',(req,res)=> {
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



module.exports = router;
