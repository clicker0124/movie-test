import { Movie, MovieModel } from "../models";
import { Context, MovieInfo } from "../types";

export async function addMovie(
  _: void,
  args: any,
  context: Context
): Promise<MovieInfo> {
  const { title, genre, director, description, releaseDate, rate } = args;
  const existingMovie: number = await MovieModel.countDocuments({ title });

  if (existingMovie) {
    throw new Error("This movie already added!");
  }
  const movie: Movie = new MovieModel({
    title,
    rate,
    genre,
    director,
    description,
    releaseDate,
  });

  await movie.save();
  try {
    await context.pubSub.publish("MOVIE_ADDED", { movieAdded: movie });
  } catch (e) {
    throw new Error("Failed");
  }
  return {
    id: movie.id,
    title: movie.title,
    rate: movie.rate,
    genre: movie.genre,
    director: movie.director,
    description: movie.description,
    releaseDate: movie.releaseDate,
  };
}

export async function movie(_: void, _args: any): Promise<MovieInfo> {
  const { movieId } = _args;
  const movie: Movie | null = await MovieModel.findById(movieId);

  if (!movie) {
    throw new Error("Movie not found!");
  }

  return {
    id: movie.id,
    title: movie.title,
    rate: movie.rate,
    genre: movie.genre,
    director: movie.director,
    description: movie.description,
    releaseDate: movie.releaseDate,
  };
}

export async function movies(_: void, _args: any) {
  const { movieId } = _args;
  try {
    const movies = await MovieModel.find(movieId);
    if (!movies.length) {
      throw new Error("Movies didn't found!");
    }
    return movies;
  } catch (error) {
    throw new Error("Failed to fetch movies!");
  }
}

export async function deleteMovie(_: void, _args: any) {
  const { movieId } = _args;
  try {
    const movie: Movie | null = await MovieModel.findByIdAndDelete(movieId);

    if (!movie) {
      throw new Error("Movie not found");
    }

    return `Movie with ID ${movieId} and name '${movie.title}' has been deleted successfully.`;
  } catch (error) {
    throw new Error("Failed to delete movie");
  }
}

export async function editMovie(_: void, args: any) {
  try {
    const { id, ...updatedData } = args;

    const updatedMovie: Movie | null = await MovieModel.findByIdAndUpdate(id, {
      $set: updatedData,
    });

    if (!updatedMovie) {
      throw new Error("Movie not found");
    }

    return updatedMovie;
  } catch (error) {
    throw new Error("Something error");
  }
}
