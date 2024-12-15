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
import Structureearch from "./Components/StructuredSearch";
import ExactSearch from "./Components/ExactSearch";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const user = {
    id: 1,
    islogin: false,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar user={user} />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} >
            <Route path="string" element={<StringSearch />} />
            <Route path="structured" element={<Structureearch />} />
            <Route path="exact" element={<ExactSearch />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="bookmark" element={<Bookmark user={user} />} />
          <Route path="rating" element={<Rating user={user} />} />
          <Route path="movie/:movie_Id" element={<MoviePage />} />
          <Route path="searchhistory" element={<SearchHistoryPage user={user} />} />
          <Route path="actor/:nconst" element={<ActorPage />} />
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
