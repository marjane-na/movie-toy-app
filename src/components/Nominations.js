import React from 'react';
import MovieItem from "./MovieItem";

const Nominations = ({ nominations, onMovieDelete }) => {
  const renderedList = nominations.map( (movie, index) => {
    return (
      <MovieItem
        key={index}
        onMovieSelect={onMovieDelete}
        movie={movie}
        mode={"delete"}
      />
    );
  });

  return <div className="c-nominations">{renderedList}</div>;
};

export default Nominations;
