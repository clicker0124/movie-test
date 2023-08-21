import React, { FunctionComponent, useContext } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_MOVIE,
  GET_REVIEWS_BY_MOVIE_ID,
  REVIEW_ADDED,
} from "../../queries/queries";
import { Review, SeverityType } from "../../types";
import { ReviewCard } from "./ReviewCard";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { MovieDetail } from "../Movie/MovieDetail";
import AddReview from "./AddReview";
import { AuthContext } from "../../context/authContext";
import { isUserLogin } from "../../utility/helpers";
import { log } from "util";

export type ReviewListProps = {
  showAlertDialog: (message: string, severity: SeverityType) => void;
};

const ReviewList: FunctionComponent<ReviewListProps> = ({
  showAlertDialog,
}) => {
  const { movieId } = useParams();
  const context = useContext(AuthContext);
  const userId = context.context?.id;

  const {
    loading: movieLoading,
    error: movieError,
    data: movieData,
  } = useQuery(GET_MOVIE, {
    variables: { movieId },
  });

  const {
    loading: reviewLoading,
    error: reviewError,
    data: reviewData,
  } = useQuery(GET_REVIEWS_BY_MOVIE_ID, {
    variables: { movieId },
  });

  const { data } = useSubscription(REVIEW_ADDED, {
    onData: (data) => {
      showAlertDialog(
        `New review added: ${data.data.data.reviewAdded.userId}`,
        "info"
      );
    },
    onError: (error) => console.error(error),
  });

  if (movieLoading || reviewLoading) return <p>Loading...</p>;

  if (movieError) return <p>Error: {movieError.message}</p>;
  if (reviewError) return <p>Error: {reviewError.message}</p>;

  const movie = movieData.movie;
  const reviewList = reviewData.reviews;

  if (!reviewList) {
    return <p>No reviews available.</p>;
  }

  const allReviews = [
    ...(reviewData?.reviews || []),
    data?.reviewAdded || null,
  ].filter(Boolean);

  return (
    <>
      <MovieDetail movie={movie} reviews={reviewList} />
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {isUserLogin(context.context) && (
        <AddReview movieId={movieId} userId={userId} />
      )}
      <Container>
        {allReviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Container>
    </>
  );
};

export default ReviewList;
