import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
// import movieModel from '../movies/movieModel';
import {getMovie} from "../tmdb-api";

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register OR authenticate a user
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
      return next();
    }
    if (req.query.action === 'register') {
      const PasswordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
      if(PasswordFormat.test(req.body.password)){
          await User.create(req.body);
          res.status(201).json({success: true, msg: 'Successful created new user.'});
      }else{
          res.status(401).json({success: false, msg: 'Fail created new user.'})
      }
    } else {
      const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({success: false, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));

  // Update a user
  router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    if(!user.favourites.includes(newFavourite)){
      await user.favourites.push(newFavourite);
      await user.save(); 
      res.status(201).json(user); 
    }else{
      res.status(401).json({success: false, msg: 'The movie already appeared.'});
    }
  }));

router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    const userFavourites = [];
    for(let i = 0; i < user.favourites.length; i++){
      userFavourites[i] = await getMovie(user.favourites[i]);
    }
    res.status(200).json(userFavourites);
  }));

router.delete('/:userName/favourites', asyncHandler(async (req, res) => {
    const favourite = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    if(user.favourites.includes(favourite)){
      const index = user.favourites.indexOf(favourite);
      await user.favourites.splice(index, 1);
      await user.save(); 
      res.status(201).json(user);
    } else {
      res.status(404).json({ code: 404, msg: 'Movie is already a favourite' });
    }
  }));

export default router;