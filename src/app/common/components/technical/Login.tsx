import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 2em;
  margin-right: auto;
  margin-left: auto;
  padding-left: 1em;
`;

export const Login: React.FC = () => {
  return <StyledContainer>Vous devez être connecté pour voir les données de cette page</StyledContainer>;
};
