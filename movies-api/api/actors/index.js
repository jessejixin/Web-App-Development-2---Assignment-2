import express from 'express';
import {
    getActors, getActor, getActorImages, getActorMovies
} from "../tmdb-api";
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1} = req.query; 
    page = +page; 
    const actors = await getActors(page);
    res.status(200).json(actors);
}));
//
// Get actor details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await getActor(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getActorImages(id);
    if (images) {
        res.status(200).json(images);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
router.get('/:id/movies', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getActorMovies(id);
    if (movies) {
        res.status(200).json(movies);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
export default router;