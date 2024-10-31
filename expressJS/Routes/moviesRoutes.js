const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

router.param('id',moviesController.checkID);
//GET - To fetch all movies
//Here v1 is version 1.0 (Optional)
//POST - To add a new movie
router.route('/')
    .get(moviesController.getAllMovies)  
    .post(moviesController.validateBody,moviesController.createMovie);

//GET - To retrieve a single Movie
//Here Colon [:]defined that id is a parameter for which the value is get by user 
//and ? is used to make the parameter OPTIONAL
//PATCH - Update a movie property
router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie) //DELETING A MOVIE

module.exports=router;