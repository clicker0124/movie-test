import { describe, expect, it } from "@jest/globals";
import { getAverageRate, sortMoviesByField } from "../src/utility/helpers";
import { Movie, Review } from "../src/types";

describe("sortMovesByField function", () => {
  const movies: Movie[] = [
    {
      title: "Movie A",
      director: "Director B",
      genre: "Genre C",
      releaseDate: "2023-08-01",
      id: "movie-1",
      rate: 4,
      description: "movie-1-description",
    },
    {
      title: "Movie C",
      director: "Director A",
      genre: "Genre B",
      releaseDate: "2022-12-15",
      id: "movie-2",
      rate: 5,
      description: "movie-2-description",
    },
    {
      title: "Movie B",
      director: "Director C",
      genre: "Genre A",
      releaseDate: "2023-01-30",
      id: "movie-3",
      rate: 3,
      description: "movie-3-description",
    },
  ];

  it("should return the same array if the movies array is empty", () => {
    expect(sortMoviesByField([], "title")).toEqual([]);
  });

  it("should sort movies by releaseDate", () => {
    const sortedByReleaseDate = sortMoviesByField(movies, "releaseDate");
    expect(sortedByReleaseDate).toEqual([
      {
        title: "Movie C",
        director: "Director A",
        genre: "Genre B",
        releaseDate: "2022-12-15",
        id: "movie-2",
        rate: 5,
        description: "movie-2-description",
      },
      {
        title: "Movie B",
        director: "Director C",
        genre: "Genre A",
        releaseDate: "2023-01-30",
        id: "movie-3",
        rate: 3,
        description: "movie-3-description",
      },
      {
        title: "Movie A",
        director: "Director B",
        genre: "Genre C",
        releaseDate: "2023-08-01",
        id: "movie-1",
        rate: 4,
        description: "movie-1-description",
      },
    ]);
  });

  it("should sort movies by title", () => {
    const sortedByTitle = sortMoviesByField(movies, "title");
    expect(sortedByTitle).toEqual([
      {
        title: "Movie A",
        director: "Director B",
        genre: "Genre C",
        releaseDate: "2023-08-01",
        id: "movie-1",
        rate: 4,
        description: "movie-1-description",
      },
      {
        title: "Movie B",
        director: "Director C",
        genre: "Genre A",
        releaseDate: "2023-01-30",
        id: "movie-3",
        rate: 3,
        description: "movie-3-description",
      },
      {
        title: "Movie C",
        director: "Director A",
        genre: "Genre B",
        releaseDate: "2022-12-15",
        id: "movie-2",
        rate: 5,
        description: "movie-2-description",
      },
    ]);
  });

  it("should return unsorted movies if given field is not sortType", () => {
    // @ts-ignore
    const sortedByTitle = sortMoviesByField(movies, "undefined");
    expect(sortedByTitle).toEqual([...movies]);
  });
});

describe("getAverageRate function", () => {
  it('should return "No reviews" when reviews array is undefined', () => {
    const result = getAverageRate(undefined);
    expect(result).toBe("No reviews");
  });

  it('should return "No reviews" when reviews array is empty', () => {
    const result = getAverageRate([]);
    expect(result).toBe("No reviews");
  });

  it("should calculate the average rate with a single review", () => {
    const reviews: Review[] = [
      {
        id: "1",
        movieId: "1",
        userId: "user1",
        reviewContext: "Great movie!",
        rate: 4,
        createdDate: "2023-08-01",
      },
    ];
    const result = getAverageRate(reviews);
    expect(result).toBe("4.0");
  });

  it("should calculate the average rate with multiple reviews", () => {
    const reviews: Review[] = [
      {
        id: "1",
        movieId: "1",
        userId: "user1",
        reviewContext: "Good movie!",
        rate: 3,
        createdDate: "2023-08-01",
      },
      {
        id: "2",
        movieId: "1",
        userId: "user2",
        reviewContext: "Not bad.",
        rate: 4,
        createdDate: "2023-08-02",
      },
      {
        id: "3",
        movieId: "1",
        userId: "user3",
        reviewContext: "Amazing!",
        rate: 5,
        createdDate: "2023-08-03",
      },
    ];
    const result = getAverageRate(reviews);
    expect(result).toBe("4.0");
  });

  it("should calculate the average rate with fractional numbers", () => {
    const reviews: Review[] = [
      {
        id: "1",
        movieId: "1",
        userId: "user1",
        reviewContext: "Okay movie.",
        rate: 2.5,
        createdDate: "2023-08-01",
      },
      {
        id: "2",
        movieId: "1",
        userId: "user2",
        reviewContext: "Decent.",
        rate: 3.5,
        createdDate: "2023-08-02",
      },
      {
        id: "3",
        movieId: "1",
        userId: "user3",
        reviewContext: "Pretty good.",
        rate: 4.5,
        createdDate: "2023-08-03",
      },
    ];
    const result = getAverageRate(reviews);
    expect(result).toBe("3.5");
  });

  it("should calculate the average rate with rounding", () => {
    const reviews: Review[] = [
      {
        id: "1",
        movieId: "1",
        userId: "user1",
        reviewContext: "Not the best.",
        rate: 1,
        createdDate: "2023-08-01",
      },
      {
        id: "2",
        movieId: "1",
        userId: "user2",
        reviewContext: "Okay.",
        rate: 2,
        createdDate: "2023-08-02",
      },
      {
        id: "3",
        movieId: "1",
        userId: "user3",
        reviewContext: "Enjoyable.",
        rate: 3,
        createdDate: "2023-08-03",
      },
      {
        id: "4",
        movieId: "1",
        userId: "user4",
        reviewContext: "Great!",
        rate: 4,
        createdDate: "2023-08-04",
      },
      {
        id: "5",
        movieId: "1",
        userId: "user5",
        reviewContext: "Outstanding!",
        rate: 5,
        createdDate: "2023-08-05",
      },
    ];
    const result = getAverageRate(reviews);
    expect(result).toBe("3.0");
  });
});
