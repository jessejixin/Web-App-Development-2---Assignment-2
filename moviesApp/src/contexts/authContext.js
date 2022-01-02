import React, { useState, createContext } from "react";
import { login, signup, addFavouriteMovies, getFavouriteMovies, removeFavouriteMovies} from "../api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [AuthToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [favorites, setFavorites] = useState([]);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
      setFavorites(await getFavouriteMovies(username));
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
    setUserName("");
  }

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie])
    addFavouriteMovies(userName, movie.id);
};
  const removeFromFavourites = (movie) => {
    setFavorites([...favorites, movie]);
    removeFavouriteMovies(userName, movie.id);
  }
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        addToFavorites,
        removeFromFavourites,
        favorites
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider; 