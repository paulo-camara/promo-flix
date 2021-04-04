import React from "react";
import { Logo } from "../Shared/Logo/Logo";
import { Header } from "../Shared/Layout/Layout";
import { Filter, InputFilter, ButtonFilter } from "../Shared/Filter/Filter";
import {
  ContainerFilterGenres,
  LabelFilterGenres,
  FilterGenres,
} from "./FilterGenres";
import { SendRequestGet } from "../../Requests";
import { Loader } from "../Shared/Loader/Loader";
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

    this.state = {
      controls: {
        isLoading: false,
      },
      filterValue: "",
      genres: [],
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
      this._getListGenreFail
    );
  }

  _getListGenreSuccess(data) {
    this._onSetIsLoading(false);

    this.setState({
      genres: data.genres,
    });

    this._getListPopular();
  }

  _getListGenreFail() {
    this._onSetIsLoading(false);
  }

  _getListPopular() {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/movie/popular`,
      {},
      this._getListPopularSuccess,
      this._getListPopularFail
    );
  }

  _getListPopularSuccess(data) {
    this._onSetIsLoading(false);

    console.log(data);
  }

  _getListPopularFail() {
    this._onSetIsLoading(false);
  }
  //#endregion

  //#region Filter
  _onChangeFilter(e) {
    this.setState({
      filterValue: e.target.value,
    });
  }

  _onFilter() {
    console.log(this.state.filterValue);
  }

  _handlerEnterFilter({ which }) {
    if (which === 13) this._onFilter();
  }
  //#endregion

  //#region handler controls
  _onSetIsLoading(status) {
    this.setState({
      controls: {
        isLoading: status,
      },
    });
  }
  //#endregion

  render() {
    const { isLoading } = this.state.controls;

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
        <FilterGenres style={{ display: "flex", overflow: "auto" }}>
          {this.state.genres.map((genre) => {
            return (
              <ContainerFilterGenres key={genre.id}>
                <input type="checkbox"></input>
                <LabelFilterGenres>{genre.name}</LabelFilterGenres>
              </ContainerFilterGenres>
            );
          })}
        </FilterGenres>
        {this.props.children}
      </div>
    );
  }
}
