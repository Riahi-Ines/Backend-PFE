const resetPasswordController = require ('../controllers/resetPassword');
const express =require('express')
const router = express.Router({ mergeParams: true });

router.post('/resetPassword' ,resetPasswordController.resetPassword);

module.exports = router