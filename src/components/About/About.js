import React, { useState, useEffect } from "react";
import { SendRequestGet } from "../../Requests";
import { HOST_API } from "../../constants";
import { RedirectError } from "../Errors/ServerErrors/ServerError";
import { ContainerAboutMovie, Image, DataMovie, Synopsis } from "./index";
import {
  Logo,
  Loader,
  Header,
  LabelTitle,
  Vote,
  lOGO_PROMO_FLIX,
} from "../Shared/index";

export const About = ({ history, match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    _getMovie();

    return _resetState;
  }, []);

  const _getMovie = () => {
    setIsLoading(true);

    SendRequestGet(
      `${HOST_API}/movie/${match.params.id}`,
      {},
      _getMovieSuccess,
      _getMovieFail
    );
  };

  const _getMovieSuccess = (movie) => {
    setIsLoading(false);

    setMovie(movie);
  };

  const _getMovieFail = () => {
    RedirectError(history);
    setIsLoading(false);
  };

  const _resetState = () => {
    setIsLoading(false);
    setMovie({});
  };

  return (
    <div>
      <Loader isLoading={isLoading} />
      <Header>
        <Logo src={lOGO_PROMO_FLIX} />
      </Header>
      {!isLoading && (
        <ContainerAboutMovie>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          />
          <DataMovie>
            <LabelTitle>{movie.title}</LabelTitle>
            <Synopsis>{movie.overview}</Synopsis>
            <div style={{ color: "white" }}>
              {"Nota: "}
              <Vote
                vote={movie.vote_average}
                style={{
                  fontSize: "20px",
                }}
              >
                {movie.vote_average}
              </Vote>
            </div>
          </DataMovie>
        </ContainerAboutMovie>
      )}
    </div>
  );
};
