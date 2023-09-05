import React from "react";
import { Link } from "react-router-dom";

function FavoriteMovies({ favoriteMovieList }) {

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
                <Link to={`/movies/${movie._id}`}>
                  <h4>{movie.title}</h4>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FavoriteMovies;
