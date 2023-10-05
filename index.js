const express = require('express')
const app = express()

// use html view files
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// show form data in request
const parseUrl = require('body-parser');
let encodeUrl = parseUrl.urlencoded({ extended: true });

app.get('/', (req, res) => {
  res.render('page', {data: null})
})


const validId = require('./validate')

app.post('/', encodeUrl, (req, res) => {
  res.render('page', {data: validId.idInfo(req.body.id_code)})
  let error = null
  if(req.body.id_code === ''){
    error = 'Palun sisesta vormis andmed'
  } else if(req.body.id_code.length < 11) {
    error = 'Palun sisesta korrektne isikukood'
  }
  if(error === null){
    res.render('page', {
      data: validId.idInfo(req.body.id_code),
      error: null
    })
  } else {
    res.render('page', {data: null, error: error})
  }
})
 
app.listen(3001, () => {
  console.log('Example app is started at http://localhost:3001')
})
