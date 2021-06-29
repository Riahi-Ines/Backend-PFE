const ABBController = require ('../controllers/ABBcontroller');
const express =require('express')
const router = express.Router({ mergeParams: true });

router.post('/listeTypeTestABB',ABBController.getListetypeTest);

router.post('/listeIdMachineABB',ABBController.getlisteMachineABB);

router.post('/listeTopCinqDefautsABB' ,ABBController.getTopCinqDefaut);

router.post('/listeDefautsABB' ,ABBController.getDefaut);

router.post('/totalfirstpassABB' ,ABBController.getFirstProd);


router.post('/totalprodABB' ,ABBController.getTotalProd);

router.post('/badprodABB' ,ABBController.getBadProd);

router.post('/goodprodABB' ,ABBController.getgoodProd);

router.post('/fpyABB' ,ABBController.getFPY);




module.exports = router
