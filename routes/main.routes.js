const express = require("express");
const router = express.Router();
const path = require('path');
router.use(require('./partida.routes').router)
router.use(require('./editor.routes'))

/* Inicio */
router.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname+'/../public/html/index.html'))

})

exports.router = router 