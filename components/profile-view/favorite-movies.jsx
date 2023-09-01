import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function FavoriteMovies ({favoriteMovieList}) {

    const addFav = (id) => {
        let token = localStorage.getItem('token');
        let url = `https://movieapi-or4e.onrender.com/users/${localStorage.getItem('user')}/movies/${id}`;
        axios.post(url, {
            headers: {Authorization: `Bearer ${token}`},
        })
    }

    const removeFav = (id) => {
        let token = localStorage.getItem('token');
        let url = `https://movieapi-or4e.onrender.com/users/${localStorage.getItem('user')}/movies/${id}`;
        axios.delete(url, {
            headers: {Authorization: `Bearer ${token}`},
        })
    }

    return (
        <div>
            <h4>Favorite Movies</h4>
            {favoriteMovieList.map((movies) => {
                return (
                    <div key={movies._id}>
                        <img src={movies.ImagePath}/>
                        <Link to={`/movies/$movies._id`}>
                            <h4>{movies.Title}</h4>
                        </Link>
                        <button variant="secondary" onClick={()=>addFav(movies.id)}>Add to list</button>
                        <button variant="secondary" onClick={()=>removeFav(movies.id)}>Remove from list</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default FavoriteMovies