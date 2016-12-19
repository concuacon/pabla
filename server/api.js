const express = require('express')
const api = express.Router()

var multer = require('multer');
var upload = multer({
    dest: 'public/upload',
    limits: { fileSize: 1000000, files: 1 }
})
api.post('/upload', upload.single('file'), function(req, res, next) {
    console.log(req.file)
    return res.send(req.file.path.replace(/^public/, ''))
})
module.exports = api;