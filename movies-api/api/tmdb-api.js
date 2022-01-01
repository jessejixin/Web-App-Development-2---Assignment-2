import fetch from 'node-fetch';

export const getMovies = (page) => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
      ).then((response) => {
          if (!response.ok) {
              throw new Error(response.json().message);
          }
          return response.json();
      })
          .catch((error) => {
              throw error;
          });
};

export const getMovieImages = (id) => {
  return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
  ).then((response) => {
      if (!response.ok) {
          throw new Error(response.json().message);
      }
      return response.json();
  })
      .catch((error) => {
          throw error;
      });
};

export const getMovieReviews = (id) => {
  return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
  ).then((res) => res.json())
  .then((json) => {
    return json.results;
  });
};


export const getMovie = (id) => {
    return fetch(
       `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieGenres = () => {
    return fetch(
         `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getUpcomingMovies = (page) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};



export const getNowPlaying = (page) => {
    //console.log(args)
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

export const getTopRated = (args) => {
    //console.log(args)
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

export const getPopular = (args) => {
    //console.log(args)
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };