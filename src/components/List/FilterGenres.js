import styled from "styled-components";

export const FilterGenres = styled.div`
  ::-webkit-scrollbar-track {
    height: 5px;
    background-color: #7d7d7d;
  }
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    height: 5px;
    background: red;
  }
`;

export const ContainerFilterGenres = styled.div`
  display: flex;
  text-align: initial;
  padding-top: 10px;
  margin-left: 20px;
  white-space: nowrap;
  padding-bottom: 10px;
`;

export const LabelFilterGenres = styled.label`
  margin-left: 10px;
  color: #a6a6a6;
`;
