import React from "react";
import styled from "styled-components";

export const Loader = ({ isLoading }) =>
  isLoading && (
    <LoaderComponent>
      <Loading />
    </LoaderComponent>
  );

const LoaderComponent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  align-items: center;
  justify-content: center;
  background-color: #00000099;
  color: white;
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid red;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
