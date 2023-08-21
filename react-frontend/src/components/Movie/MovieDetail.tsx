import { styled } from "styled-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { Movie, Review } from "../../types";
import {
  Alert,
  Button,
  Rating,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DELETE_MOVIE, EDIT_MOVIE, GET_MOVIE } from "../../queries/queries";
import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getAverageRate, isAdmin } from "../../utility/helpers";

export const Container = styled.div`
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

type MovieDetailProps = {
  movie: Movie;
  reviews: Review[];
};

export const MovieDetail: FunctionComponent<MovieDetailProps> = ({
  movie,
  reviews,
}) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [editedMovie, setEditedMovie] = useState({
    title: movie.title,
    genre: movie.genre,
    director: movie.director,
    releaseDate: movie.releaseDate,
    description: movie.description,
  });

  const [editMovie] = useMutation(EDIT_MOVIE, {
    onCompleted: (data) => {
      setEditMode(false);
      setShowAlert(true);
    },
    onError: (error) => {
      console.error("Error updating movie:", error);
    },
    refetchQueries: [GET_MOVIE],
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    editMovie({
      variables: {
        id: movieId,
        ...editedMovie,
      },
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedMovie((prevEditedMovie) => ({
      ...prevEditedMovie,
      [name]: value,
    }));
  };

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted: () => {
      navigate("/movies");
      setShowDeleteAlert(true);
    },
    onError: (error) => {
      console.error("Error deleting movie:", error);
    },
  });

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowConfirm(false);
    setShowDeleteAlert(true);
    deleteMovie({
      variables: {
        movieId: movieId,
      },
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false);
  };
  return (
    <Container>
      <Snackbar
        open={showDeleteAlert}
        autoHideDuration={5000}
        onClose={handleCloseDeleteAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Movie deleted successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Movie updated successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={showConfirm}
        autoHideDuration={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning">
          Are you sure you want to delete this movie?
          <Button color="secondary" size="small" onClick={handleDeleteConfirm}>
            Yes
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={() => setShowConfirm(false)}
          >
            No
          </Button>
        </Alert>
      </Snackbar>
      {editMode ? (
        <>
          <Typography variant="h3">Edit Movie</Typography>
          <TextField
            label="Title"
            name="title"
            value={editedMovie.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Genre"
            name="genre"
            value={editedMovie.genre}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Director"
            name="director"
            value={editedMovie.director}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Release Date"
            type={"date"}
            name="releaseDate"
            value={editedMovie.releaseDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={editedMovie.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={toggleEditMode}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4">{movie.title}</Typography>
          <Tooltip title={`Average Rating: ${getAverageRate(reviews)}`}>
            <div>
              <Rating
                name="rating"
                precision={0.5}
                value={Number(getAverageRate(reviews))}
                readOnly
              />
            </div>
          </Tooltip>
          <Typography variant="body1">Genre: {movie.genre}</Typography>
          <Typography variant="body1">Director: {movie.director}</Typography>
          <Typography variant="body1">
            Release Date: {movie.releaseDate}
          </Typography>
          <Typography variant="body1">{movie.description}</Typography>
          {isAdmin(context) && (
            <>
              <Button
                variant="contained"
                onClick={toggleEditMode}
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};
