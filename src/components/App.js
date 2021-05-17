import React from "react";
import SearchBar from "./SearchBar";
import OMDP from "../apis/omdb";
import SearchList from "./SearchList";
import Nominations from "./Nominations";
import '../stylesheets/app.scss';
import Header from "./Header";
import Modal from "./Modal";

class App extends React.Component {
  state = { movies: [], nominations: [], lastPageRequested: 0, term: "", showModal: false, total: 0, error: false};

  componentDidMount() {
    //this.onTermSubmit("buildings");
  }

  onSearchSubmit = (term) => {
    this.setState({
      movies: [],
      lastPageRequested: 0,
      term: term
    }, ()=>{
      this.onTermSubmit()
    });
  }

  onTermSubmit = async () => {
    const response = await OMDP.get("/", {
      params: {
        s: this.state.term,
        page: this.state.lastPageRequested + 1
      },
    });

    if (response.data.Response === "True" || response.data.Error === "Movie not found!" ) {
      let searchResults = response.data.Search ? response.data.Search.map(movie => {
        return {...movie, nominate: !this.state.nominations.find(nominee => nominee.imdbID === movie.imdbID)}
      }) : [];

      this.setState({
        movies: [...this.state.movies, ...searchResults],
        lastPageRequested: this.state.lastPageRequested + 1,
        total: response.data.totalResults ? response.data.totalResults : 0
      });
    } else{
      this.setState({
        showModal: true,
        error: true
      })
    }

  };

  onMovieNominate = (nominatedMovie) => {
    if (this.state.nominations.length === 5){
      this.setState({
        showModal: true
      })
      return;
    }
    let allMovies = this.state.movies.map(movie => {
      return {...movie, nominate: nominatedMovie.imdbID === movie.imdbID ? false : movie.nominate}
    })
    this.setState({
      movies: [...allMovies],
      nominations: [...this.state.nominations, nominatedMovie]
    });
  };

  onMovieDelete = (deletedMovie) => {
    let allMovies = this.state.movies.map(movie => {
      return {...movie, nominate: deletedMovie.imdbID === movie.imdbID ? true : movie.nominate}
    })
    let allNominations = this.state.nominations.filter(movie => {
      return movie.imdbID !== deletedMovie.imdbID
    })
    this.setState({
      movies: [...allMovies],
      nominations: [...allNominations]
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      error: false
    })
  }

  render() {
    return (
      <div className="c-container">
        {this.state.showModal ? <Modal requestError={this.state.error} onClick={this.closeModal}/> : null}
        <Header/>
        <SearchBar onFormSubmit={this.onSearchSubmit} />
          <div className="c-list-container">
            <div className="c-list-container__nominations">
              <div className="c-list-container__nominations__title">
                Nominations <span className="c-list-container__nominations__title--remaining">(You can add {5-this.state.nominations.length} more nominees.)</span>
              </div>
              <Nominations
                  onMovieDelete={this.onMovieDelete}
                  nominations={this.state.nominations}
              />
            </div>
            <div className="c-list-container__search-results">
              {this.state.term ?
                  <div className="c-list-container__search-results__title">
                    {this.state.total} results found for "{this.state.term}"
                  </div> : null}
              <SearchList
                  onMovieNominate={this.onMovieNominate}
                  movies={this.state.movies}
              />
              {this.state.term && this.state.total > this.state.movies.length?
                <div className="c-list-container__search-results__load-more" onClick={this.onTermSubmit}>
                  Click to load more...
                </div> : null}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
