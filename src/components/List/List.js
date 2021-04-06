import React from "react";
import update from "immutability-helper";
import { Logo } from "../Shared/Logo/Logo";
import { Header } from "../Shared/Layout/Layout";
import { LabelDefault } from "../Shared/Labels/Labels";
import { Filter, InputFilter, ButtonFilter } from "../Shared/Filter/Filter";
import {
  ContainerBox,
  BoxMovie,
  Vote,
  ImageMovie,
  FooterBoxMovie,
} from "./MovieApresentation";
import {
  ContainerFilterGenres,
  LabelFilterGenres,
  FilterGenres,
} from "./FilterGenres";
import { Loader } from "../Shared/Loader/Loader";
import { SendRequestGet } from "../../Requests";
import { HOST_API } from "../../constants";
import { lOGO_PROMO_FLIX } from "../Shared/Logo/LogoBase64";
import { orderBy } from "lodash";

import { Link } from "react-router-dom";

export class List extends React.Component {
  constructor(props) {
    super(props);

    this._onChangeFilter = this._onChangeFilter.bind(this);
    this._onFilter = this._onFilter.bind(this);
    this._handlerEnterFilter = this._handlerEnterFilter.bind(this);
    this._getListGenreSuccess = this._getListGenreSuccess.bind(this);
    this._getListPopularSuccess = this._getListPopularSuccess.bind(this);
    this._setPageNumber = this._setPageNumber.bind(this);

    this.state = {
      controls: {
        isLoading: false,
        pageNumber: 1,
      },
      filterValue: "",
      genres: [],
      popularMovies: { results: [] },
    };
  }

  componentDidMount() {
    this._getListGenre();
  }

  //#region Request
  _getListGenre() {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/genre/movie/list`,
      {},
      this._getListGenreSuccess,
      () => {}
    );
  }

  _getListGenreSuccess(data) {
    this._onSetIsLoading(false);

    this.setState(
      update(this.state, {
        genres: {
          $set: data.genres.map((genres) => {
            return { ...genres, isSelected: true };
          }),
        },
      })
    );

    this._getListPopular();
  }

  _getListPopular() {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/movie/popular`,
      { page: this.state.controls.pageNumber },
      this._getListPopularSuccess,
      () => {}
    );
  }

  _getListPopularSuccess(data) {
    this.setState(
      update(this.state, {
        popularMovies: {
          $set: { ...data },
        },
      })
    );

    this._onSetIsLoading(false);
  }

  _getListPopularFail() {
    this._onSetIsLoading(false);
  }
  //#endregion

  //#region Filter
  _onFilter() {}

  _handlerEnterFilter({ which }) {
    if (which === 13) this._getListPopular();
  }
  //#endregion

  //#region handler controls
  _onChangeFilter(e) {
    this.setState({
      filterValue: e.target.value,
    });
  }

  _onSetIsLoading(status) {
    this.setState(
      update(this.state, {
        controls: {
          isLoading: { $set: status },
        },
      })
    );
  }

  _setPageNumber(e) {
    this.setState(
      update(this.state, {
        controls: {
          pageNumber: { $set: e.target.value },
        },
      })
    );
  }

  _changeGenre(genre) {
    const hasMoreOne = [];
    this.state.genres.forEach((genre) => {
      if (genre.isSelected) hasMoreOne.push("yes");
    });

    if (hasMoreOne.length <= 1 && genre.isSelected) return;

    const genres = this.state.genres;
    const indexObject = genres.findIndex((x) => x.id === genre.id);
    genres.splice(indexObject, 1);

    this.setState(
      update(this.state, {
        genres: { $push: [{ ...genre, isSelected: !genre.isSelected }] },
      })
    );
  }
  //#endregion

  //#region get components
  _getFilterGenresComponent() {
    const { genres } = this.state;
    return orderBy(genres, "name", "asc").map((genre) => {
      return (
        <ContainerFilterGenres key={genre.id}>
          <LabelFilterGenres isSelected={false}>{genre.name}</LabelFilterGenres>
          <input
            type="checkbox"
            checked={genre.isSelected}
            onChange={() => this._changeGenre(genre)}
          />
        </ContainerFilterGenres>
      );
    });
  }

  _getListMoviesComponent() {
    const allCheckboxMarked = [];
    this.state.genres.forEach((genre) => {
      if (genre.isSelected === true) {
        allCheckboxMarked.push(genre.id);
      }
    });

    let showMovie = false;
    return this.state.popularMovies.results.map((popular) => {
      popular.genre_ids.forEach((id) => {
        if (allCheckboxMarked.includes(id)) {
          showMovie = true;
        }
      });

      return (
        showMovie && <div key={popular.title}>
            <LabelDefault style={{color: 'white'}}>{popular.title}</LabelDefault>
          <BoxMovie>
            <ImageMovie
              src={`https://image.tmdb.org/t/p/original${popular.backdrop_path}`}
            />
          </BoxMovie>
          <FooterBoxMovie
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Vote vote={popular.vote_average}>{popular.vote_average}</Vote>
            <Link className="menu-link" to={"/"}>
              <LabelDefault>detalhes</LabelDefault>
            </Link>
          </FooterBoxMovie>
        </div>
      );
    });
  }
  //#endregion

  render() {
    const { isLoading, pageNumber } = this.state.controls;
    const { popularMovies } = this.state;

    return (
      <div className="list">
        <Loader isLoading={isLoading} />
        <Header>
          <Logo src={lOGO_PROMO_FLIX} />
          <Filter>
            <InputFilter
              autoFocus
              onKeyUp={this._handlerEnterFilter}
              onChange={this._onChangeFilter}
              value={this.state.filterValue}
            />
            <ButtonFilter onClick={this._onFilter}>Filtrar</ButtonFilter>
          </Filter>
        </Header>
        <LabelDefault
          style={{ fontSize: "30px", color: "white", fontWeight: "bold" }}
        >
          FILMES MAIS POPULARES
        </LabelDefault>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <ContainerBox>
            {this._getListMoviesComponent()}
            <div>
              <LabelDefault>Página</LabelDefault>
              <InputFilter
                type="number"
                value={pageNumber}
                onKeyUp={this._handlerEnterFilter}
                onChange={this._setPageNumber}
                min={1}
                max={popularMovies.total_results}
                style={{ width: "50px" }}
              />
            </div>
          </ContainerBox>
          <FilterGenres>{this._getFilterGenresComponent()}</FilterGenres>
        </div>
      </div>
    );
  }
}
