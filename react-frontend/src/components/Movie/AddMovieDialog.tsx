import React, { FunctionComponent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../../queries/queries";
import { SeverityType } from "../../types";

type AddMovieDialogProps = {
  showAddMovieDialog: boolean;
  setShowAddMovieDialog: (value: boolean) => void;
  showAlertDialog: (message: string, severity: SeverityType) => void;
};
export const AddMovieDialog: FunctionComponent<AddMovieDialogProps> = ({
  showAddMovieDialog,
  setShowAddMovieDialog,
  showAlertDialog,
}) => {
  const [newMovieData, setNewMovieData] = useState({
    title: "",
    rate: null,
    genre: "",
    director: "",
    description: "",
    releaseDate: "",
  });

  const [addMovie] = useMutation(ADD_MOVIE, {
    onCompleted: () => {
      showAlertDialog("Movie added successfully!", "success");
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach((error) => {
        showAlertDialog(error.message, "error");
      });
    },
  });

  const handleAddMovie = () => {
    addMovie({
      variables: newMovieData,
    })
      .then(() => {
        setShowAddMovieDialog(false);
        setNewMovieData({
          title: "",
          rate: null,
          genre: "",
          director: "",
          description: "",
          releaseDate: "",
        });
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setNewMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={showAddMovieDialog}
      onClose={() => setShowAddMovieDialog(false)}
    >
      <DialogTitle>Add New Movie</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={newMovieData.title}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Genre"
          name="genre"
          value={newMovieData.genre}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Director"
          name="director"
          value={newMovieData.director}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Release Date"
          name="releaseDate"
          value={newMovieData.releaseDate}
          onChange={handleInputChange}
          margin="normal"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newMovieData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowAddMovieDialog(false)}>Cancel</Button>
        <Button onClick={handleAddMovie} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
