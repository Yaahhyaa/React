import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import SearchBar from "./components/SearchBar";

const apiKey = "af9e7b3d";
const baseURL = "https://www.omdbapi.com/";
const randomSearchTerms = ["star", "love", "night", "day", "moon", "fire", "sky", "sea", "city", "home"];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchResultsMovies, setSearchResultsMovies] = useState([]);
  const [searchResultsSeries, setSearchResultsSeries] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    fetchMovies("movie");
    fetchMovies("series");

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchMovies = async (type) => {
    if (!isOnline) return;
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
    try {
      const response = await fetch(`${baseURL}?s=${randomTerm}&type=${type}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === "True") {
        type === "movie" ? setMovies(data.Search.slice(0, 4)) : setSeries(data.Search.slice(0, 4));
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };

  const searchItems = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResultsMovies([]);
      setSearchResultsSeries([]);
      fetchMovies("movie");
      fetchMovies("series");
      return;
    }

    try {
      const movieResponse = await fetch(`${baseURL}?s=${searchTerm}&type=movie&apikey=${apiKey}`);
      const seriesResponse = await fetch(`${baseURL}?s=${searchTerm}&type=series&apikey=${apiKey}`);
      const movieData = await movieResponse.json();
      const seriesData = await seriesResponse.json();

      setSearchResultsMovies(movieData.Response === "True" ? movieData.Search : []);
      setSearchResultsSeries(seriesData.Response === "True" ? seriesData.Search : []);
    } catch (error) {
      console.error("Fehler beim Abrufen der Suchergebnisse:", error);
    }
  };

  const openModal = async (imdbID) => {
    try {
      const response = await fetch(`${baseURL}?i=${imdbID}&apikey=${apiKey}`);
      const movie = await response.json();
      setModalData(movie);
    } catch (error) {
      console.error("Fehler beim Abrufen der Filmdetails:", error);
    }
  };

  return (
    <div className="app">
      {!isOnline && <div className="offline-warning">Bitte mit Internet verbinden</div>}
      <header className="header">
        <h1 className="logo">Yetflix API</h1>
        <SearchBar onSearch={searchItems} />
      </header>
      <main>
        {searchResultsMovies.length > 0 && (
          <section className="gallery-section">
            <h2>Suchergebnisse - Filme</h2>
            <div className="gallery-row">
              {searchResultsMovies.map((movie) => (
                <MovieCard key={movie.imdbID} item={movie} openModal={openModal} />
              ))}
            </div>
          </section>
        )}
        {searchResultsSeries.length > 0 && (
          <section className="gallery-section">
            <h2>Suchergebnisse - Serien</h2>
            <div className="gallery-row">
              {searchResultsSeries.map((series) => (
                <MovieCard key={series.imdbID} item={series} openModal={openModal} />
              ))}
            </div>
          </section>
        )}
        <section className="gallery-section">
          <h2>Empfohlene Filme</h2>
          <div className="gallery-row">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} item={movie} openModal={openModal} />
            ))}
          </div>
        </section>
        <section className="gallery-section">
          <h2>Empfohlene Serien</h2>
          <div className="gallery-row">
            {series.map((series) => (
              <MovieCard key={series.imdbID} item={series} openModal={openModal} />
            ))}
          </div>
        </section>
      </main>
      {modalData && <MovieModal data={modalData} onClose={() => setModalData(null)} />}
    </div>
  );
};

export default App;
