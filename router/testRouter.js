const testController = require ('../controllers/ABBcontroller');
const express =require('express')
const router = express.Router({ mergeParams: true });

router.get('/listeTypeTestABB',testController.getListetypeTest);

router.get('/listeIdMachineABB',testController.getlisteMachineABB);

router.get('/listeTopCinqDefautsABB' ,testController.getTopCinqDefaut);

router.get('/listeDefautsABB' ,testController.getDefaut);

router.get('/totalfirstpassABB' ,testController.getFirstProd);

router.get('/totalprodABB' ,testController.getTotalProd);

router.get('/badprodABB' ,testController.getBadProd);

module.exports = router
