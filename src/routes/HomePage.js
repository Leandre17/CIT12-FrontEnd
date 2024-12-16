import React from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./NewSearchPage";
import FeatureMovie from "./FeaturedMovie";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  const location = useLocation();

  // Use URL search params more cleanly
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("Search") || "";

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to the new IMDB</h1>

      {/* Centered Search Bar Directly Under the Heading */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6} lg={4}>
          <SearchBar />
        </Col>
      </Row>

      {/* Search Results or Featured Movies */}
      {initialSearch ? (
        <h2 className="text-center">Search results for: {initialSearch}</h2>
      ) : (
        <FeatureMovie />
      )}
    </Container>
  );
};

export default HomePage;
