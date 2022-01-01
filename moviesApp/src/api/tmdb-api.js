// import { sortMoviesBy } from "../components/templateMovieListPage";

export const getMovies = () => {
  return fetch(
    // `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=${sortMoviesBy}&include_adult=false&include_video=false&page=1`
    '/api/movies', 
).then(res=>res.json());
};
  
export const getMovie = (args) => {
  // console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    // `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/movies/${id}`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res=>res.json());
};

export const getGenres = async () => {
  return fetch(
    // "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    //   process.env.REACT_APP_TMDB_KEY +
    //   "&language=en-US"
    `/api/genres/movies`
    ).then(res => res.json());
};

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/images`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
    ).then(res => res.json());
  };

  export const getMovieReviews = (id) => {
    return fetch(
      // `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/reviews`, 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
    ).then(res => res.json());
  };

  export const getUpcomingMovies = ()=> {
    return fetch(
      // `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      "/api/movies/tmdb/upcoming?page=1", 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
    ).then(res=>res.json());
  };
  

  export const getTopRated = (args) => {
    //console.log(args)
    return fetch(
      // `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      "/api/movies/tmdb/toprated?page=1", 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
    ).then(res=>res.json());
  };


  export const getPopular = (args) => {
    //console.log(args)
    return fetch(
      // `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      "/api/movies/tmdb/popular?page=1", 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
    ).then(res=>res.json());
  };


  export const getNowPlaying = (args) => {
    //console.log(args)
    return fetch(
      // `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      "/api/movies/tmdb/upcoming?page=1", 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
    ).then(res=>res.json());
  };

  export const getActors = (args) => {
    const [pagePart] = args.queryKey;
    const { page } = pagePart;
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
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
  
  export const getActor = (args) => {
    const [,idPart] = args.queryKey;
    const { id } = idPart;
    console.log( id + "ID in API")
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

  export const getActorMovies = (args) => {
    const [ ,idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key${process.env.REACT_APP_TMDB_KEY}&language=en-US`
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
  
  export const getActorImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
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
  
  