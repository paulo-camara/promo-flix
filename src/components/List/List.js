import React from "react";
import Reflux from "reflux";
import { Link } from "react-router-dom";
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
  lOGO_PROMO_FLIX,
} from "../Shared/index";
import {
  ContainerBox,
  PagenationRow,
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

    //Efetua a conexão com store Reflux
    this.store = ListStore;

    this._handlerEnterFilter = this._handlerEnterFilter.bind(this);
  }

  /** Todas as funções que alteram state foram agrupadas na store por organização de código. 
  Assim podemos ver mais precisamente as responsabilidades do componente, e cada vez que é 
  necessario alterar algum state é chamada uma action da store */

  componentDidMount() {
    ListActions.GetListGenre(this.props.history);
  }

  _handlerEnterFilter({ which }) {
    if (which === 13) ListActions.GetListGenre();
  }

  _setPageNumber(e) {
    ListActions.SetPageNumber(e.target.value);
  }

  _changeGenre(genre) {
    ListActions.ChangeGenreFilter(genre);
  }

  _filterGenre(movieGenres) {
    const genresSelecteds = [];
    let showMovie = false;

    /**obtem todos os ids de generos selecionados */
    this.state.genres.forEach((genre) => {
      if (genre.isSelected) {
        genresSelecteds.push(genre.id);
      }
    });

    movieGenres.forEach((id) => {
      /** valida que pelo menos um dos ids selecionados está presente no array de ids
       * de genero do filme ou não há nenhum genero selecionado */
      if (genresSelecteds.includes(id) || genresSelecteds.length == 0) {
        showMovie = true;
      }
    });

    return showMovie;
  }

  //#region get components
  _getFilterGenresComponent() {
    return this.state.genres.map((genre) => {
      return (
        <ContainerFilterGenres key={genre.id}>
          <LabelFilterGenres isSelected={genre.isSelected}>{genre.name}</LabelFilterGenres>
          <input
            type="checkbox"
            checked={genre.isSelected}
            onChange={() => this._changeGenre(genre)}
            style={{
              transform: "scale(1.8)",
              padding: "10px",
              marginLeft: "10px",
            }}
          />
        </ContainerFilterGenres>
      );
    });
  }

  _getListMoviesComponent() {
    return this.state.popularMovies.results.map(
      (popular) =>
        this._filterGenre(popular.genre_ids) && (
          <div key={popular.id}>
            <LabelDefault style={{ color: "#ffffff" }}>
              {popular.title}
            </LabelDefault>
            <Link
              onClick={() => this.props.history.push(popular.id)}
              className="menu-link"
              to={`list/about/${popular.id}`}
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
        </Header>
        <LabelTitle>FILMES MAIS POPULARES</LabelTitle>
        {!isLoading && popularMovies.results.length && (
          <ContainerBodyList>
            <ContainerBox>
              {this._getListMoviesComponent()}
              <PagenationRow>
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
              </PagenationRow>
            </ContainerBox>
            <FilterGenres>{this._getFilterGenresComponent()}</FilterGenres>
          </ContainerBodyList>
        )}
      </div>
    );
  }
}
