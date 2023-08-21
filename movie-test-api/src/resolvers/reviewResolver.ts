import { Context, ReviewInfo } from "../types";
import { Review, ReviewModel } from "../models";

export async function addReview(
  _: void,
  args: any,
  context: Context
): Promise<ReviewInfo> {
  const { movieId, userId, reviewContext, rate } = args;

  const existingReview: number = await ReviewModel.countDocuments({
    userId,
    movieId,
  });

  if (existingReview) {
    throw new Error("Already reviewed movie from this user!");
  }
  const review: Review = new ReviewModel({
    movieId,
    userId,
    reviewContext,
    rate,
    createdDate: new Date().toISOString(),
  });

  await review.save();
  try {
    await context.pubSub.publish("REVIEW_ADDED", { reviewAdded: review });
  } catch (e) {
    console.error(e);
  }

  return {
    id: review.id,
    movieId: review.movieId,
    rate: review.rate,
    reviewContext: review.reviewContext,
    userId: review.userId,
    createdDate: review.createdDate,
  };
}

export async function deleteReview(_: void, _args: any) {
  const { reviewId } = _args;
  try {
    const review: Review | null = await ReviewModel.findByIdAndDelete(reviewId);

    if (!review) {
      throw new Error("Review not found!");
    }

    return "Review ID" + review.userId + "has deleted.";
  } catch (error) {
    throw new Error("Failed to delete review");
  }
}

export async function editReview(_: void, args: any) {
  try {
    const { id, ...updatedData } = args;

    const updatedReview: Review | null = await ReviewModel.findByIdAndUpdate(
      id,
      updatedData
    );

    if (!updatedData) {
      throw new Error("Review not found");
    }

    return updatedReview;
  } catch (error) {
    throw new Error("Something error");
  }
}

export async function reviews(_: void, args: { movieId: string }) {
  const { movieId } = args;

  try {
    const reviews = await ReviewModel.find({ movieId: movieId });
    if (!reviews) {
      throw new Error("Review not found");
    }
    return reviews;
  } catch (error) {
    throw new Error("Failed to fetch reviews!");
  }
}
