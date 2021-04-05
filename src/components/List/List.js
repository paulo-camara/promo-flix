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

export class List extends React.Component {
  constructor(props) {
    super(props);

    this._onChangeFilter = this._onChangeFilter.bind(this);
    this._onFilter = this._onFilter.bind(this);
    this._handlerEnterFilter = this._handlerEnterFilter.bind(this);

    this._getListGenreSuccess = this._getListGenreSuccess.bind(this);
    this._getListGenreFail = this._getListGenreFail.bind(this);

    this._getListPopularSuccess = this._getListPopularSuccess.bind(this);
    this._getListPopularFail = this._getListPopularFail.bind(this);

    this._setPageNumber = this._setPageNumber.bind(this);

    this.state = {
      controls: {
        isLoading: false,
        genresSelected: {},
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

  _handlerResults(results) {
    return results.map((result) => {
      return { ...result, show: true };
    });
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
        genres: { $set: data.genres },
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
    this._onSetIsLoading(false);

    this.setState(
      update(this.state, {
        popularMovies: {
          $set: {
            ...data,
            results: this._handlerResults(data.results),
          },
        },
      })
    );
  }

  _getListPopularFail() {
    this._onSetIsLoading(false);
  }
  //#endregion

  //#region Filter
  _filterMovies() {
    console.log("filtro de genero");
  }

  _onChangeFilter(e) {
    this.setState({
      filterValue: e.target.value,
    });
  }

  _onFilter() {}

  _handlerEnterFilter({ which }) {
    if (which === 13) this._getListPopular();
  }
  //#endregion

  //#region handler controls
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

  _onSelectGenres(e, genre) {
    const { genresSelected } = this.state.controls;

    const isSelected = genresSelected[genre.id]
      ? !genresSelected[genre.id].isSelected
      : true;

    this.setState(
      update(this.state, {
        controls: {
          genresSelected: {
            $merge: { [genre.id]: { ...genre, isSelected } },
          },
        },
      }),
      () => this._filterMovies()
    );
  }
  //#endregion

  render() {
    const { isLoading, genresSelected, pageNumber } = this.state.controls;
    const { popularMovies, genres } = this.state;

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <ContainerBox>
            {popularMovies.results.map((popular) => {
              return (
                popular.show && (
                  <div>
                    <BoxMovie>
                      <ImageMovie
                        src={`https://image.tmdb.org/t/p/original${popular.backdrop_path}`}
                      ></ImageMovie>
                    </BoxMovie>
                    {/* <span style={{color: 'white'}}>{popular.title}</span> */}
                    <Vote vote={popular.vote_average}>
                      {popular.vote_average}
                    </Vote>
                    {/* {popular.title} */}
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
            {genres.map((genre) => {
              return (
                <ContainerFilterGenres key={genre.id}>
                  <LabelFilterGenres
                    isSelected={
                      genresSelected[genre.id] &&
                      genresSelected[genre.id].isSelected
                    }
                  >
                    {genre.name}
                  </LabelFilterGenres>
                  <input
                    type="checkbox"
                    onChange={(e) => this._onSelectGenres(e, genre)}
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
