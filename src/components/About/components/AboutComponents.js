import styled from "styled-components";

export const Image = styled.img`
  width: 60%;
  color: #ffffff;
  border: 1px solid #564a4a;
  margin-bottom: 50px;
`;

export const ContainerAboutMovie = styled.div`
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  margin: 20px;
`;

export const Synopsis = styled.div`
  color: #ffffff;
  margin-top: 20px;
`;

export const DataMovie = styled.div`
  width: 36%;
  margin-left: 40px;
  text-align: left;

  @media (max-width: 1023px) {
    width: 90%;
    text-align: center;
  }
`;
