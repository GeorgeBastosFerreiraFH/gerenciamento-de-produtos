import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'
import {
  getAllProducts,
  getProductStats,
  getRecentProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'

const router = Router()

router.use(authMiddleware)

router.get('/', getAllProducts)
router.get('/stats', getProductStats)
router.get('/recent', getRecentProducts)
router.post('/', upload.single('image'), createProduct)
router.put('/:id', upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

export default router
