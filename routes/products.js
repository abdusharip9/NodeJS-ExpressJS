import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Home | Sammi',
	})
})
router.get('/products', (req, res) => {
	res.render('products', {
		title: 'Products | Sammi',
		isProduct: true,
	})
})
router.get('/add', (req, res) => {
	res.render('add', {
		title: 'Add | Sammi',
		isAdd: true,
	})
})
router.post('/add-products', (req, res) => {
	console.log(req.body);
	res.redirect('/')
})

export default router
