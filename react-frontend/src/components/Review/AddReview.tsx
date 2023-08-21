import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../queries/queries";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";

type WriteReviewProps = {
  movieId?: string;
  userId?: string;
};

function AddReview({ movieId, userId }: WriteReviewProps) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewContext, setReviewText] = useState("");
  const [rate, setRating] = useState<number | null>(null);

  const [addReview] = useMutation(ADD_REVIEW, {
    onCompleted: () => {
      setShowReviewDialog(false);
      setReviewText("");
    },
    onError: (error) => {
      console.error("Error adding review:", error);
    },
  });

  const handleReviewSubmit = async () => {
    await addReview({
      variables: {
        movieId,
        userId,
        rate: rate || 0,
        reviewContext,
      },
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowReviewDialog(true)}
      >
        Write Review
      </Button>
      <Dialog
        open={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
      >
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            precision={0.2}
            value={rate}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            fullWidth
            label="Review Text"
            multiline
            rows={4}
            value={reviewContext}
            onChange={(e) => setReviewText(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewDialog(false)}>Cancel</Button>
          <Button onClick={handleReviewSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddReview;
