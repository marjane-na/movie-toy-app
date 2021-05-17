import React from 'react';
import Button from "./Button";

const MovieItem = ({ movie, onMovieSelect, mode }) => {
  return <div className="c-movie-item">
    <div className="c-movie-item__poster">
      <img alt={movie.title} className="c-movie-item__poster__img" src={movie.Poster}/>
    </div>
    <div className="c-movie-item__title">
      {movie.Title}
    </div>
    <div className="c-movie-item__year">
      {movie.Year}
    </div>
    {
      mode === "delete" ?
          <Button className="c-movie-item__btn" onClick={() => onMovieSelect(movie)} text={"Delete"} isBlack={true} />
          : mode === "nominate" ?
          <Button className="c-movie-item__btn" onClick={() => onMovieSelect(movie)} text={"Nominate"} isGreen={true} />
              : (<div className="c-movie-item__status">Nominated</div>)
    }

  </div>;
}

export default MovieItem;
