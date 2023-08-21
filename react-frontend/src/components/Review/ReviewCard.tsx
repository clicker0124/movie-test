import React, { FunctionComponent } from "react";
import { styled } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries/queries";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Review } from "../../types";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3s)",
  margin: "20px",
}));

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: FunctionComponent<ReviewCardProps> = ({ review }) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId: review.userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        {user.username}
      </Typography>
      <Rating name="rating" value={review.rate} readOnly />
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {new Date(review.createdDate).toDateString()}
      </Typography>
      <Typography variant="body1">{review.reviewContext}</Typography>
    </StyledPaper>
  );
};
