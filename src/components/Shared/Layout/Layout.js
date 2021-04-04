import React from "react";
import styled from 'styled-components';

export const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
