import React from "react";
import { Header, Logo, lOGO_PROMO_FLIX } from "../../Shared/index";
import { ErrorMessage } from "../ErrorsComponents";

export const Error = () => {
  return (
    <div>
      <Header>
        <Logo src={lOGO_PROMO_FLIX} />
      </Header>
      <ErrorMessage>Ops! Ocorreu um erro</ErrorMessage>
    </div>
  );
};

export const RedirectError = (history) => {
  history.push("/error");
};
