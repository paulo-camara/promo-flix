import React from "react";
import Reflux from "reflux";
import { Link } from "react-router-dom";
import { orderBy } from "lodash";
import { ListActions } from "./ListActions";
import { ListStore } from "./ListStore";
import {
  Logo,
  Vote,
  Loader,
  Header,
  LabelDefault,
  LabelTitle,
  InputFilter,
  ButtonFilter,
  Filter,
  lOGO_PROMO_FLIX,
} from "../Shared/index";
import {
  ContainerBox,
  BoxMovie,
  ImageMovie,
  FooterBoxMovie,
  ContainerFilterGenres,
  LabelFilterGenres,
  FilterGenres,
  ContainerBodyList,
} from "./index";

export class List extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = ListStore;

    this._handlerEnterFilter = this._handlerEnterFilter.bind(this);
  }

  componentDidMount() {
    ListActions.GetListGenre(this.props.history);
  }

  _onFilter() {}

  _handlerEnterFilter({ which }) {
    if (which === 13) ListActions.GetListGenre();
  }

  _onChangeFilter(e) {
    ListActions.ChangeFilter(e);
  }

  _setPageNumber(e) {
    ListActions.SetPageNumber(e);
  }

  _changeGenre(genre) {
    ListActions.ChangeGenreFilter(genre);
  }

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
        if (allCheckboxMarked.includes(id) || allCheckboxMarked.length == 0) {
          showMovie = true;
        }
      });

      return (
        showMovie && (
          <div key={popular.title}>
            <LabelDefault style={{ color: "white" }}>
              {popular.title}
            </LabelDefault>
            <Link
              onClick={() => this.props.history.push(popular.id)}
              className="menu-link"
              to={`/about/${popular.id}`}
            >
              <BoxMovie>
                <ImageMovie
                  src={`https://image.tmdb.org/t/p/original${popular.backdrop_path}`}
                />
              </BoxMovie>
            </Link>
            <FooterBoxMovie>
              <Vote vote={popular.vote_average}>{popular.vote_average}</Vote>
            </FooterBoxMovie>
          </div>
        )
      );
    });
  }
  //#endregion

  render() {
    const { isLoading, pageNumber } = this.state.controls;
    const { popularMovies, filterValue } = this.state;

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
              value={filterValue}
            />
            <ButtonFilter onClick={this._onFilter}>Filtrar</ButtonFilter>
          </Filter>
        </Header>
        <LabelTitle>FILMES MAIS POPULARES</LabelTitle>
        <ContainerBodyList>
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
        </ContainerBodyList>
      </div>
    );
  }
}
