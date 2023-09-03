import React from "react";
import { Link } from "react-router-dom";

function FavoriteMovies({ favoriteMovieList, removeFav }) {
  return (
    <div>
      <h4>Favorite Movies</h4>
      {favoriteMovieList.length === 0 ? (
        <span>The list is empty!</span>
      ) : (
        <>
          {favoriteMovieList.map((movie) => {
            return (
              <div key={movie._id}>
                <img src={movie.ImagePath} />
                <Link to={`/movies/${movie._id}`}>
                  <h4>{movie.Title}</h4>
                </Link>
                <button
                  variant="secondary"
                  onClick={() => removeFav(movie._id)}
                >
                  Remove from list
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FavoriteMovies;
