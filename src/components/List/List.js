import React from "react";
import update from "immutability-helper";
import { Logo } from "../Shared/Logo/Logo";
import { Header } from "../Shared/Layout/Layout";
import { Filter, InputFilter, ButtonFilter } from "../Shared/Filter/Filter";
import { ContainerBox, BoxMovie, Vote, ImageMovie } from "./MovieApresentation";
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

    // this._onChangeFilter = this._onChangeFilter.bind(this);
    // this._onFilter = this._onFilter.bind(this);
    // this._handlerEnterFilter = this._handlerEnterFilter.bind(this);

    this._getListGenreSuccess = this._getListGenreSuccess.bind(this);
    this._getListGenreFail = this._getListGenreFail.bind(this);

    this._getListPopularSuccess = this._getListPopularSuccess.bind(this);
    this._getListPopularFail = this._getListPopularFail.bind(this);

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

  //#region Request
  _getListGenre() {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/genre/movie/list`,
      {},
      this._getListGenreSuccess,
      this._getListGenreFail
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

  _getListGenreFail() {
    this._onSetIsLoading(false);
  }

  _getListPopular() {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/movie/popular`,
      { page: this.state.controls.pageNumber },
      this._getListPopularSuccess,
      this._getListPopularFail
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
  // _onChangeFilter(e) {
  //   this.setState({
  //     filterValue: e.target.value,
  //   });
  // }

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
  //#endregion

  render() {
    const { isLoading, genresSelected, pageNumber } = this.state.controls;
    const { popularMovies, genres } = this.state;

    const a = [];
    genres.forEach((genre) => {
      if (genre.isSelected) {
        a.push(genre.id);
      }
    });

    return (
      <div className="list">
        <Loader isLoading={isLoading} />
        <Header>
          <Logo src={lOGO_PROMO_FLIX} />
          {/* <Filter>
            <InputFilter
              autoFocus
              onKeyUp={this._handlerEnterFilter}
              onChange={this._onChangeFilter}
              value={this.state.filterValue}
            />
            <ButtonFilter onClick={this._onFilter}>Filtrar</ButtonFilter>
          </Filter> */}
        </Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <ContainerBox>
            {popularMovies.results.map((popular) => {
              let vaiMostrar = false;
              popular.genre_ids.forEach((id) => {
                if (a.includes(id)) {
                  vaiMostrar = true;
                }
              });

              return (
                vaiMostrar && (
                  <div key={popular.title}>
                    <BoxMovie>
                      <ImageMovie
                        src={`https://image.tmdb.org/t/p/original${popular.backdrop_path}`}
                      ></ImageMovie>
                    </BoxMovie>

                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                      <Vote vote={popular.vote_average}>
                        {popular.vote_average}
                      </Vote>
                      <Link className="menu-link" to={"/"}>
                        <span style={{ color: "white", fontSize: "12px" }}>
                          detalhes
                        </span>
                      </Link>
                    </div>
                  </div>
                )
              );
            })}
            <div
              style={{
                marginLeft: "20px",
                color: "white",
                marginRight: "10px",
              }}
            >
              Página
              <input
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

          <FilterGenres>
            {orderBy(genres, "name", "asc").map((genre) => {
              return (
                <ContainerFilterGenres key={genre.id}>
                  <LabelFilterGenres isSelected={false}>
                    {genre.name}
                  </LabelFilterGenres>
                  <input
                    type="checkbox"
                    checked={genre.isSelected}
                    onChange={() => this._changeGenre(genre)}
                  />
                </ContainerFilterGenres>
              );
            })}
          </FilterGenres>
        </div>
      </div>
    );
  }
}
