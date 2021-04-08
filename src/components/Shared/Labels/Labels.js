import styled from "styled-components";

export const LabelDefault = styled.span`
  color: #d03837;
  font-size: 12px;
  text-decoration: none;
  margin: 10px;
`;

export const LabelTitle = styled.span`
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
`;

export const Vote = styled.span`
  color: ${(props) => (props.vote >= 5.0 ? "#52b652" : "#cf3837")};
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0px 10px;
`;
