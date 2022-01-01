export const login = (username, password) => {
    return fetch(`api/users`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({username: username, password: password})
    }).then(res => res.json());
};

export const signup = (username, password) => {
    return fetch(`api/users?action=register`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({username: username, password: password})
    }).then(res => res.json());
}; 

export const addFavouriteMovies = (userName, id) => {
    return fetch(`/api/users/${userName}/favourites`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({username: userName, id: id})
    }).then(res => res.json());
};

export const getFavouriteMovies = (username) => {
    return fetch(
        `/api/users/${username}/favourites`
    ).then((response) => {
        if(!response.ok){
            //throw new Error(response.json().message);
            console.log("OOOOOPPPSIE")
        }
        return response.json();
    })
    .catch((error) => {
        throw error;
    });
};

export const removeFavouriteMovies = (userName, id) => {
    return fetch(`/api/users/${userName}/favourites`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "delete",
        body: JSON.stringify({username: userName, id: id})
    }).then(res => res.json());
}; 
