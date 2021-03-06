import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { Client } from 'pg'

// Placerar värdena i objektet `process.env` (som pg använder)
dotenv.config()

const app = express(),
  client = new Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER
  })

app.use(cors())

client.connect()

app.get('/api', async (_request, response) => {
  // const { rows } = await client.query('SELECT * FROM cities')
  const { rows } = await client.query('SELECT * FROM cities WHERE name = $1', [
    'Stockholm'
  ])
  response.send(rows)
})

app.use(express.static(path.join(path.resolve(), 'public')))

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`)
})
