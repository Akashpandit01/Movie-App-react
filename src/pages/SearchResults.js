import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function SearchResults() {
  const { query } = useParams(); // Get search query from the URL
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = '409475ec39f13caa1695b68f730b2494';// Replace with your TMDB API key
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="search-results-page">
      <h1>Search Results for "{query}"</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              ) : (
                <div className="no-poster">No Poster Available</div>
              )}
              <h2>{movie.title}</h2>
              <p>Rating: {movie.vote_average}/10</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
