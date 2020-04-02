import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  background-color: ${props => props.theme.colors.errorBackgroundColor};
  color: ${props => props.theme.colors.errorColor};
  line-height: 2em;
  padding-left: 1em;
  margin-bottom: 1em;
`;

interface ErrorBoxProps {
  onClose: () => void;
}

const CloseButton = styled(FontAwesomeIcon)`
  margin-right: 1em;
  cursor: pointer;
`;

export const ErrorBox: React.FC<ErrorBoxProps> = ({ onClose, children }) => {
  return (
    <ErrorContainer>
      <CloseButton icon={faTimesCircle} onClick={onClose} />
      {children}
    </ErrorContainer>
  );
};
