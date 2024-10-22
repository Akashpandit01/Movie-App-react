// src/pages/Upcoming.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const API_KEY = 'your_api_key';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error('Error fetching upcoming movies:', error));
  }, []);

  return (
    <div>
      <h1>Upcoming Movies</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upcoming;
