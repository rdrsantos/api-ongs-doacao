var express = require("express")
var router = express.Router();
var UserController = require("../controllers/UserController");

router.get('/api/users', UserController.index);
router.post('/api/user', UserController.new);
router.get('/api/user/:id', UserController.findById);

module.exports = router;