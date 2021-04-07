import React from "react";
import { Header, Logo, lOGO_PROMO_FLIX } from "../../../Shared/index";
import { ErrorMessage } from "../ErrorsComponents";

export const Error = ({ history }) => {
  return (
    <div>
      <Header>
        <Logo
          src={lOGO_PROMO_FLIX}
          style={{ cursor: "pointer" }}
          onClick={() => RedirectList(history)}
        />
      </Header>
      <ErrorMessage>Ops! Ocorreu um erro</ErrorMessage>
    </div>
  );
};

export const RedirectList = (history) => {
  history.push("/list");
};

export const RedirectError = (history) => {
  history.push("/error");
};
