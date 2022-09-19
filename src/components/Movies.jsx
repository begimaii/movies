import Movie from "./Movie";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Movies({ listOfMovies, handlerFavorite, btnClass, btnText }) {
  return (
    <>
      {listOfMovies.map((movie) => {
        return (
          <div className="col-md-3" key={movie.imdbID}>
            <Movie
              data={movie}
              handlerFavorite={handlerFavorite}
              btnClass={btnClass}
              btnText={btnText}
            />
          </div>
        );
      })}
    </>
  );
}

export default Movies;
