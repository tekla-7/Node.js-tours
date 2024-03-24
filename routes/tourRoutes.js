const express = require('express')
const tourController=require('./../controllers/tourController')

const router = express.Router();
// router.param('id',tourController.checkID)

//create a checkbody 
router
    .route('/')
    .get(tourController.getAllTours)
    .post( tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTout)
    .post(tourController.createTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

 module.exports=router;