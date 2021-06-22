const HONEYWELLController = require('../controllers/HONEYWELLController');
const express =require('express')
const router = express.Router({ mergeParams: true });



/************************************HONEYWELL****************************************/
router.post('/listeTypeTestHONEYWELL',HONEYWELLController.getListetypeTest);

router.post('/listeIdMachineHONEYWELL',HONEYWELLController.getlisteMachineHONEYWELL);

router.post('/listeTopCinqDefautsHONEYWELL' ,HONEYWELLController.getTopCinqDefaut);

router.post('/listeDefautsHONEYWELL' ,HONEYWELLController.getDefaut);

router.post('/totalfirstpassHONEYWELL' ,HONEYWELLController.getFirstProd);

router.post('/totalprodHONEYWELL' ,HONEYWELLController.getTotalProd);

router.post('/badprodHONEYWELL' ,HONEYWELLController.getBadProd);

router.post('/fpyHONEYWELL' ,HONEYWELLController.getFPY);

module.exports = router