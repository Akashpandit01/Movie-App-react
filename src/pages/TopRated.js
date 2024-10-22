import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = '409475ec39f13caa1695b68f730b2494';  // Replace with your valid TMDB API key
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie poster images

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch top-rated movies');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching top-rated movies:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="top-rated-page">
      <h1>Top Rated Movies</h1>
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

export default TopRated;
