import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./routes/HomePage";
import Search from "./routes/NewSearchPage";
import Login from "./routes/LoginPage";
import Bookmark from "./routes/BookmarkPage";
import Rating from "./routes/RatingPage";
import MoviePage from "./routes/MoviePage";
import NotFound from "./routes/NotFoud";
import SearchHistoryPage from "./routes/SearchHistoryPage";
import ActorPage from "./routes/ActorPage";
import StringSearch from "./Components/StringSearch";
import StructureSearch from "./Components/StructuredSearch";
import ExactSearch from "./Components/ExactSearch";
import { BrowserRouter, Routes, Route } from "react-router";
import { useUser } from "./Contexts/UserContext"; // Import UserContext

function App() {
  const { user } = useUser(); // Get the logged-in user state

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar user={user} />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />}>
            <Route path="string" element={<StringSearch />} />
            <Route path="structured" element={<StructureSearch />} />
            <Route path="exact" element={<ExactSearch />} />
          </Route>
          <Route path="login" element={<Login />} />
          {user && ( // Show these routes only if user is logged in
            <>
              <Route path="bookmark" element={<Bookmark user={user} />} />
              <Route path="rating" element={<Rating user={user} />} />
              <Route path="searchhistory" element={<SearchHistoryPage user={user} />} />
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
