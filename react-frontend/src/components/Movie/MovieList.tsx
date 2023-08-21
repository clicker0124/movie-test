import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_MOVIES,
  GET_REVIEWS_BY_MOVIE_ID,
  MOVIE_ADDED,
} from "../../queries/queries";
import { Movie, SeverityType, SortType } from "../../types";
import { MovieCard } from "./MovieCard";
import {
  Container,
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { AddMovieDialog } from "./AddMovieDialog";
import Cookies from "js-cookie";
import { isAdmin } from "../../utility/helpers";
import { sortBy } from "lodash";

export type MovieListProps = {
  showAlertDialog: (message: string, severity: SeverityType) => void;
};

const MovieList: FunctionComponent<MovieListProps> = ({ showAlertDialog }) => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showAddMovieDialog, setShowAddMovieDialog] = useState(false);
  const [sortType, setSortType] = useState<SortType>(
    Cookies.get("sortType") as SortType
  );
  const context = useContext(AuthContext);
  const [alignment, setAlignment] = useState<SortType>(
    Cookies.get("sortType") as SortType
  );

  useEffect(() => {
    if (data?.movies) {
      setMovies(sortBy([...data.movies], sortType));
    }
  }, [data]);

  useEffect(() => {
    Cookies.set("sortType", sortType);
    if (movies.length) setMovies(sortBy(movies, sortType));
  }, [sortType]);

  if (!movies.length) {
  }

  useSubscription(MOVIE_ADDED, {
    onData: (movieAddedSubData) => {
      const newMovie = movieAddedSubData.data.data.movieAdded;
      showAlertDialog(`New movie added: ${newMovie.title}`, "info");
      if (
        movieAddedSubData.data.data.movieAdded &&
        !movies.some((movie) => movie.id === newMovie.id)
      ) {
        setMovies([...movies, movieAddedSubData.data.data.movieAdded]);
      }
    },
    onError: (movieAddedSubError) => console.error(movieAddedSubError),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data.movies || data.movies.length === 0) {
    return <p>No movies available.</p>;
  }

  const toggleButtonChildren = [
    <ToggleButton
      value="title"
      key="title"
      onClick={() => {
        setSortType("title");
      }}
    >
      Title
    </ToggleButton>,
    <ToggleButton
      value="genre"
      key="genre"
      onClick={() => {
        setSortType("genre");
      }}
    >
      Genre
    </ToggleButton>,
    <ToggleButton
      value="director"
      key="director"
      onClick={() => {
        setSortType("director");
      }}
    >
      Director
    </ToggleButton>,
    <ToggleButton
      value="releaseDate"
      key="releaseDate"
      onClick={() => {
        setSortType("releaseDate");
      }}
    >
      ReleaseDate
    </ToggleButton>,
  ];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: SortType
  ) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box marginTop={"1vh"}>
        <Typography variant="h5" gutterBottom>
          Movie List
        </Typography>
      </Box>
      {isAdmin(context) && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddMovieDialog(true)}
        >
          Add Movie
        </Button>
      )}
      <Stack alignItems="center">
        <ToggleButtonGroup {...control} size="small" value={alignment}>
          {toggleButtonChildren}
        </ToggleButtonGroup>
      </Stack>
      {
        <Container maxWidth="md">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Container>
      }
      <AddMovieDialog
        showAddMovieDialog={showAddMovieDialog}
        setShowAddMovieDialog={setShowAddMovieDialog}
        showAlertDialog={showAlertDialog}
      />
    </Container>
  );
};

export default MovieList;
