import { Component } from "react";
import InputSearch from "./components/InputSearch";
import SelectType from "./components/SelectType";
import Movies from "./components/Movies";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedType: "Movie",
      movieToSearch: "",
      favoritesMovies: [],
    };
  }

  componentDidMount() {
    this.callApi();
    const myFavoritesFromLocalStorage = JSON.parse(
      localStorage.getItem("my-favorites-movies")
    );
    console.log(myFavoritesFromLocalStorage);
    this.setState({ favoritesMovies: myFavoritesFromLocalStorage });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.movieToSearch !== this.state.movieToSearch ||
      this.state.selectedType !== prevState.selectedType
    ) {
      this.callApi();
    }
    if (prevState.favoritesMovies !== this.state.favoritesMovies) {
      this.addToLocalStorage();
    }
  }

  callApi = async () => {
    console.log("im calling the API");
    const { movieToSearch, selectedType } = this.state;
    // if (this.state.movies.length === 0) return false;
    const APIKEY = `https://www.omdbapi.com/?s=${movieToSearch}&type=${selectedType}&apikey=5dfe62b`;
    try {
      const req = await fetch(APIKEY);
      let data = await req.json();

      if (data.Search)
        if (this.state.favoritesMovies.length) {
          const idsInFavorites = this.state.favoritesMovies.map(
            (movie) => movie.imdbID
          );

          const dataFiltered = data.Search.filter((movie) => {
            const existInFavorites = idsInFavorites.indexOf(movie.imdbID);
            if (existInFavorites === -1) {
              return true;
            }

            return false;
          });
          this.setState({ movies: dataFiltered });
        } else {
          this.setState({ movies: data.Search });
        }
    } catch (err) {
      this.setState({ movies: [] });
      console.log(err.message);
    }
  };

  getInputValue = (movie) => {
    this.setState({ movieToSearch: movie });
  };

  getSelectType = (selectType) => {
    this.setState({ selectedType: selectType });
  };

  addToFavorites = (movie) => {
    console.log(movie);
    const moviesFiltered = this.state.movies.filter(
      (item) => item.imdbID !== movie.imdbID
    );
    this.setState({ movies: moviesFiltered });
    const newFavorites = [...this.state.favoritesMovies, movie];
    this.setState({ favoritesMovies: newFavorites });
  };
  removeFromFavorite = (movie) => {
    const favoritesFiltered = this.state.favoritesMovies.filter(
      (item) => item.imdbID !== movie.imdbID
    );
    this.setState({ favoritesMovies: favoritesFiltered });
    const newMovies = [...this.state.movies];
    if (this.state.movies.length) {
      //!
      newMovies.push(movie);
    }

    this.setState({ movies: newMovies });
  };

  addToLocalStorage = () => {
    // this.state.favoritesMovies is a javascript object notation  = []
    localStorage.setItem(
      "my-favorites-movies",
      JSON.stringify("new", this.state.favoritesMovies)
    );
  };

  render() {
    return (
      <div>
        <header>
          <h1>Movies</h1>
          <InputSearch getMovie={this.getInputValue} />
          <SelectType getType={this.getSelectType} />
          <div className="row">
            <Movies
              listOfMovies={this.state.movies}
              handlerFavorite={this.addToFavorites}
              btnClass="success"
              btnText="Add to Favorite"
            />
          </div>

          <div className="row">
            <h2>My Favorite Movies</h2>
            <Movies
              listOfMovies={this.state.favoritesMovies}
              handlerFavorite={this.removeFromFavorite}
              btnClass="danger"
              btnText="Remove from Favorites"
            />
          </div>
        </header>
      </div>
    );
  }
}
export default App;
