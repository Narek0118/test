const Router = require('express')
const DeviceController = require('../controllers/DeviceController')
const router = new Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/',upload.single('file'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);

module.exports = router