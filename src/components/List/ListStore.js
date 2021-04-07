import Reflux from "reflux";
import update from "immutability-helper";
import { ListActions } from "./ListActions";

import { SendRequestGet } from "../../Requests";
import { HOST_API } from "../../constants";
import { RedirectError } from "../Errors/ServerErrors/ServerError";

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
  }

  //#region Request
  onGetListGenre(history) {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/genre/movie/list`,
      {},
      (data) => this._getListGenreSuccess(data, history),
      () => this._onHandlerError(history)
    );
  }
  _getListGenreSuccess(data, history) {
    this.setState(
      update(this.state, {
        genres: {
          $set: data.genres.map((genres, index) => {
            return {
              ...genres,
              isSelected: this.state.genres[index]
                ? this.state.genres[index].isSelected
                : false,
            };
          }),
        },
      })
    );

    this._onSetIsLoading(false);
    this._getListPopular(history);
  }

  _getListPopular(history) {
    this._onSetIsLoading(true);

    SendRequestGet(
      `${HOST_API}/movie/popular`,
      { page: this.state.controls.pageNumber },
      (data) => this._getListPopularSuccess(data),
      () => this._onHandlerError(history)
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

  _onHandlerError(history) {
    this._onSetIsLoading(false);
    RedirectError(history);
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
    const indexObject = this.state.genres.findIndex((x) => x.id === genre.id);

    this.setState(
      update(this.state, {
        genres: {
          $splice: [
            [indexObject, 1, { ...genre, isSelected: !genre.isSelected }],
          ],
        },
      })
    );
  }
  //#endregion
}
