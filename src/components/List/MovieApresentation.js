import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`;

export const BoxMovie = styled.div`
  color: white;
  width: 250px;
  height: 190px;
  border: 1px solid #564a4a;
  margin: 0px 20px 20px 20px;
  cursor: pointer;

  &:hover {
    transition: width 0.4s, height 0.4s;
    width: 290px;
    height: 230px;
    margin: 0px;
  }
`;

export const Vote = styled.span`
  color: ${(props) => (props.vote >= 5.0 ? "green" : "red")};
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0px 10px;
`;

export const ImageMovie = styled.img`
  width: 250px;
  height: 190px;

  &:hover {
    transition: width 0.4s, height 0.4s;
    width: 290px;
    height: 230px;
  }
`;

export const FooterBoxMovie = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
