import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import express from 'express'
import { create } from 'express-handlebars'
import session from 'express-session'
import varMiddleware from './middleware/var.js'

import mongoose from 'mongoose'
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js'
dotenv.config()

const app = express()

const hbs = create({ defaultLayout: 'main', extname: 'hbs' })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: 'Sammi', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(varMiddleware)

app.use(AuthRoutes)
app.use(ProductsRoutes)

const startApp = () => {
	try {
		mongoose.set('strictQuery', false)

		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => console.log('MongoDB connected.'))
			.catch(err => console.error('MongoDB connection error:', err))

		// port
		const PORT = process.env.PORT || 4100
		app.listen(PORT, () => console.log(`server is running port = ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

startApp()
