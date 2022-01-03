# Assignment 2 - Movies API.

Name: Xin Ji

## Features

 + Feature 1 -  get a list of upcoming movies
 + Feature 2 -  get a single upcoming movie with detailed information
 + Feature 3 -  get a list of nowplaying movies
 + Feature 4 -  get a single nowplaying movie with detailed information
 + Feature 5 -  get a list of toprated movies
 + Feature 6 -  get a single toprated movie with detailed information
 + Feature 7 -  get a list of popular movies
 + Feature 8 -  get a single popular movie with detailed information
 + Feature 9 -  get a list of people who are actors in the movies
 + Feature 10 -  get a single actor with detailed information
 + Feature 11 -  get user's favorite movies
 + Feature 12 -  post user's favorite movies
 + Feature 13 -  get movie's reviews
 + Feature 14 -  post user's reviews

### Authentication/Users

+ Login page
  + User must log in and then be able to access the Movies App. In order to log in, user should already exist in the MongoDB
+ Signup page
  + Username has to be a unique string
  + Ensure all passwords are at least 5 characters long and contain at least one number and one letter
  + Repeat password must match password field

+ Users are saved to MongoDB when registering
+ All paths except for login and signup pages use private routes and require a user to get access.
+ User name now exists on the site header
+ User has the option to sign out

## Installation Requirements

+ "babel-cli": "^6.26.0",
+ "babel-eslint": "^10.1.0",
+ "babel-preset-env": "^1.7.0",
+ "eslint": "^8.2.0",
+ "nodemon": "^2.0.15"
+ "bcrypt-nodejs": "0.0.3",
+ "dotenv": "^10.0.0",
+ "express": "^4.17.1",
+ "express-async-handler": "^1.2.0",
+ "express-session": "^1.17.2",
+ "jsonwebtoken": "^8.5.1",
+ "mongoose": "^6.0.13",
+ "node-fetch": "^2.6.6",
+ "passport": "^0.5.0",
+ "passport-jwt": "^4.0.0",
+ "uniqid": "^5.4.0"

In package.json, the dependency softwares and their version are recorded. 
The user should now open another terminal inside the "moviesApp" folder. In the terminal, the user should input the following commands.
```bat
npm install
npm start
```
This will launch the React app and should also open the users default browser to port: 3000.

## API Configuration

creating an ``.env`` file. in 'movies-api' file.

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
SEED_DB=True
SECRET=ilikecake
TMDB_KEY=a958295b56e2a88076cb48352e2c128c
```

After creating the .env file the user should open a new terminal inside the "movies-api" folder and input the following commands. 

```bat
npm install
npm start
```
This will launch the node server on port: 8080.
From here the user can start using the app.
## API Design
|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/:id |Get a movie by id | N/A | N/A | N/A
| /api/movies/:id/images |Get a movie's images | N/A | N/A | N/A
| /api/movies/:id/reviews |Get a movie's reviews | Post a movie's reviews  | N/A | N/A
| /api/movies/tmdb/upcoming |Gets a list of upcoming movies | N/A | N/A | N/A
| /api/movies/tmdb/nowplaying |Gets a list of nowplaying movies | N/A | N/A | N/A
| /api/movies/tmdb/popular |Gets a list of popular movies | N/A | N/A | N/A
| /api/movies/tmdb/toprated |Gets a list of toprated movies | N/A | N/A | N/A
| /api/genres/movies |Get movie genres | N/A | N/A | N/A
| /api/users |Get all users |Register OR authenticate a user | Update a user | N/A
| /api/users/:userName/favourites |Get a user's favourites | Add to favourites | N/A | Remove from favourites
| /api/actors |Get all movies' reviews |  N/A | N/A | N/A
| /api/actors/:id |Get actor details |  N/A | N/A | N/A
| /api/actors/:id/images |Get all actor's images |  N/A | N/A | N/A
| /api/actors/:id/movies |Get all actor's movies |  N/A | N/A | N/A
| ... | ... | ... | ... | ...

## Integrating with React App
The React app is fully integrated with the Node.js API. 
All show/movie related calls are first proxied to the API, and from there send off to the TMDB endpoints. 
These calls include:

+ Discover movies
+ Movie details
+ Movie genres
+ Movie images
+ Movie reviews
+ Upcoming movies
+ Nowplaying movies
+ Toprated movies
+ Popular movies
+ Discover actors
