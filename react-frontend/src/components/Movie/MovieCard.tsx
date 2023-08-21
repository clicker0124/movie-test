import React, { FunctionComponent } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Movie } from "../../types";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS_BY_MOVIE_ID } from "../../queries/queries";
import { getAverageRate } from "../../utility/helpers";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: FunctionComponent<MovieCardProps> = ({ movie }) => {
  const { data: reviewData } = useQuery(GET_REVIEWS_BY_MOVIE_ID, {
    variables: { movieId: movie.id },
  });
  const navigate = useNavigate();
  const handleMovieDetail = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Card
      variant="outlined"
      onClick={() => handleMovieDetail(movie.id)}
      sx={{
        cursor: "pointer",
        margin: "10px 0",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease-in-out",
        "&:hover, &:active": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Genre: {movie.genre}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Director: {movie.director}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Release Date: {movie.releaseDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Rate: {getAverageRate(reviewData?.reviews)}
        </Typography>
        <Typography variant="body1">{movie.description}</Typography>
      </CardContent>
    </Card>
  );
};
