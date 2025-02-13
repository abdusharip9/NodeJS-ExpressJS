import { Router } from 'express'
import Product from '../models/Product.js'
import authMiddleware from '../middleware/auth.js'
import userMiddleware from '../middleware/user.js'

const router = Router()

router.get('/', async (req, res) => {
	const products = await Product.find().lean()

	console.log(products);

	res.render('index', {
		title: 'Home | Sammi',
		products: products.reverse(),
		userId: req.userId ? req.userId.toString() : null,
	})
})
router.get('/products', (req, res) => {
	res.render('products', {
		title: 'Products | Sammi',
		isProduct: true,
	})
})
router.get('/add', authMiddleware, (req, res) => {
	res.render('add', {
		title: 'Add | Sammi',
		isAdd: true,
		errorAddProduct: req.flash('errorAddProduct'),
	})
})
router.post('/add-products', userMiddleware, async (req, res) => {
	const {title, description, image, price} = req.body
	if (!title || !description || !image || !price) {
		req.flash('errorAddProduct', 'All fields are required')
		res.redirect('/add')
		return
	}
	console.log(req.userId);
	
	await Product.create({...req.body, user: req.userId})
	res.redirect('/')
})

export default router
