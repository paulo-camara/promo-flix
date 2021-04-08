import styled from "styled-components";

export const FilterGenres = styled.div``;

export const ContainerFilterGenres = styled.div`
  text-align: end;
  padding-top: 10px;
  margin-left: 20px;
  padding-bottom: 10px;
`;

export const LabelFilterGenres = styled.label`
  margin-left: 5px;
  font-size: 20px;
  color: ${(props) => (props.isSelected ? "#cf3837" : "#a6a6a6")}; ;
`;
