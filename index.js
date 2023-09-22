const express = require('express')
const app = express()

// use html view files
const path = require('path')
app.use(express.static(path.join (__dirname, 'views')))

app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'views', 'index.html'))
  console.log(path.join(__dirname, 'views', 'index.html'))
  res.send('')
})

app.listen(3000, () => {
  console.log('Example app is started at http://localhost:3000')
})
