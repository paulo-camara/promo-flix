import React from "react";
import { Header } from "../Shared/Layout/Layout";
import { Logo } from "../Shared/Logo/Logo";
import { lOGO_PROMO_FLIX } from "../Shared/Logo/LogoBase64";

export const About = () => {
  return (
    <div>
      <Header>
        <Logo src={lOGO_PROMO_FLIX} />
      </Header>
      <span style={{ color: "white" }}>Oi</span>
    </div>
  );
};
