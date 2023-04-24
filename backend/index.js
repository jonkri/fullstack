const cors = require('cors'),
  express = require('express'),
  path = require('path')

const app = express()

app.use(cors())

app.get('/api', (_request, response) => {
  response.send({ hello: 'World' })
})

app.use(express.static(path.join(path.resolve(), 'public')))

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`)
})
