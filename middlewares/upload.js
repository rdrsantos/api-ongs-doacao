const multer = require('multer')
let uniqueSuffix = Date.now();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/user');
  },
  filename: function (req, file, cb) {
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage })
module.exports = {upload, uniqueSuffix};