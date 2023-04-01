const Router = require('express');
const multer = require('multer');
const router = new Router();
const BasketController = require('../controllers/BasketController');
const upload = multer({ dest: 'uploads/' });

router.post('/', BasketController.create);
// router.get('/', BasketController.getAll);
router.get('/:id', BasketController.getOne);

module.exports = router