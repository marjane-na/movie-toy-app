import React from 'react';
import MovieItem from "./MovieItem";

const SearchList = ({ movies, onMovieNominate}) => {
  const renderedList = movies.map( (movie, index) => {
    return (
      <MovieItem
        key={index}
        onMovieSelect={onMovieNominate}
        movie={movie}
        mode={movie.nominate ? "nominate" : null}
      />
    );
  });

  return <div className="c-search-list">{renderedList}</div>;
};

export default SearchList;
