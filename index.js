import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

// port
const PORT = process.env.PORT || 4100
app.listen(PORT, () => console.log(`server is running port = ${PORT}`))
