import axios from "axios";
import { LANGUAGE } from "./constants";
import { API_KEY } from "./API_KEY";

//Método recebe a rota o objeto de queryString e duas funções (succeso e erro)
export const SendRequestGet = (route, stringSearch, success, fail) => {
  axios
    .get(route, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        ...stringSearch,
      },
    })
    .then((res) => success(res.data))
    .catch((err) => fail(err));
};
