import Reflux from "reflux";
import update from "immutability-helper";
import { ListActions } from "./ListActions";

import { SendRequestGet } from "../../Requests";
import { HOST_API } from "../../constants";

export class ListStore extends Reflux.Store {
  constructor(props) {
    super(props);

    this.listenables = ListActions;

    this.state = {
      controls: {
        isLoading: false,
        pageNumber: 1,
      },
      filterValue: "",
      genres: [],
      popularMovies: { results: [] },
    };

    this._getListGenreSuccess = this._getListGenreSuccess.bind(this);
    this._getListPopularSuccess = this._getListPopularSuccess.bind(this);
  }

  //#region Request
  onGetListGenre() {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/genre/movie/list`,
      {},
      this._getListGenreSuccess,
      () => {}
    );
  }
  _getListGenreSuccess(data) {
    this.setState(
      update(this.state, {
        genres: {
          $set: data.genres.map((genres) => {
            return { ...genres };
          }),
        },
      })
    );

    this._onSetIsLoading(false);
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

  //#region set controls
  onChangeFilter(e) {
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

  onSetPageNumber(e) {
    this.setState(
      update(this.state, {
        controls: {
          pageNumber: { $set: e.target.value },
        },
      })
    );
  }

  onChangeGenreFilter(genre) {
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
}
