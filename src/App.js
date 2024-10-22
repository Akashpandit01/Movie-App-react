import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TopRated from './pages/TopRated';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import Navbar from './Navbar'; 

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all pages */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
