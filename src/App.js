import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./routes/HomePage";
import Search from "./routes/NewSearchPage";
import Login from "./routes/LoginPage";
import Bookmark from "./routes/BookmarkPage";
import Rating from "./routes/RatingPage";
import MoviePage from "./routes/MoviePage";
import ActorPage from "./routes/ActorPage";
import NotFound from "./routes/NotFound";
import SearchHistoryPage from "./routes/SearchHistoryPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { useUser } from "./Contexts/UserContext";

function App() {
  const { user, loading } = useUser();
  if (loading) {
    return <h1>Loading...</h1>; // Fallback UI while loading
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          {user && ( // Protected routes for logged-in users
            <>
              <Route path="bookmark" element={<Bookmark />} />
              <Route path="rating" element={<Rating />} />
              <Route path="searchhistory" element={<SearchHistoryPage />} />
            </>
          )}
          <Route path="movie/:movie_Id" element={<MoviePage />} />
          <Route path="actor/:nconst" element={<ActorPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
