import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./movie-card.scss";

export const MovieCard = ({ movie}) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired
};
