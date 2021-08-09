var express = require("express")
var router = express.Router();
var UserController = require("../controllers/UserController");
var CategoryController = require("../controllers/CategoryController");
const {upload} = require('../middlewares/upload')

router.get('/api/users', UserController.index);
router.post('/api/user', UserController.new);
router.get('/api/user/:id', UserController.findById);
router.delete('/api/user/:id', UserController.delete);
router.put('/api/user', UserController.update);
router.get('/upload', UserController.upload);
router.post('/up', upload.single('file'),UserController.up);

router.get('/api/categories', CategoryController.index);
router.post('/api/categories', CategoryController.new);
router.put('/api/category', CategoryController.update);
router.delete('/api/category/:id', CategoryController.delete);

module.exports = router;