var express = require('express');
var passport = require('passport');

var router = express.Router();

// Getting the Todo Controller that we just created

var VillagerController = require('../../controllers/villager.controller');


// Map each API to the Controller FUnctions

router.get('/', passport.authenticate('jwt', { session: false }), VillagerController.getVillagers);

router.post('/', VillagerController.createVillager);

router.put('/', VillagerController.updateVillager);

router.post('/signin', VillagerController.signInVillager);

router.delete('/:id',VillagerController.removeVillager);


// Export the Router

module.exports = router;
