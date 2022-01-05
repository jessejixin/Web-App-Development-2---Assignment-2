import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import actorsRouter from './api/actors';
import './db';
import './seedData';
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';
import loglevel from 'loglevel';
if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
  } else {
  loglevel.setLevel('info')
  }

dotenv.config();



const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const port = process.env.PORT;

app.use(express.json());
// replace app.use(session([... with the following:
app.use(passport.initialize());
// Add passport.authenticate(..)  to middleware stack for protected routes​
// app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/actors', actorsRouter);
//Users router
app.use('/api/users', usersRouter);
app.use(errHandler);


let server = app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
module.exports = server

export default app;