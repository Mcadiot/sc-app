import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { Button } from "../../technical/Button";
import { FlexDiv } from "../../technical/FlexDiv";
import { RightDiv } from "../../technical/RightDiv";

const DivContainer = styled(FlexDiv)`
  min-height: 3em;
  line-height: 3em;

  @media screen and (max-width: 350px) {
    display: block;

    button {
      width: 100%;
      margin-bottom: 1em;
      margin-right: 0;
    }
  }
`;

const NewReuButton = styled(Button)`
  max-height: 2em;
  margin-top: 0.5em;
  margin-right: 2em;
`;

const CheckBox = styled.input`
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
  margin-top: 1em;
  margin-right: 0.5em;
`;

const CheckBoxContainer = styled.div`
  @media screen and (max-width: 350px) {
    width: 100%;
    line-height: 1em;
  }
`;

interface BookingFiltersProps {
  onFilter: (onlyUser: boolean) => void;
  openModale: () => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({ onFilter, openModale }) => {
  const [onlyUsers, setOnlyUsers] = React.useState(false);

  const onOnlyMineChecked = () => {
    setOnlyUsers(!onlyUsers);
  };

  React.useEffect(() => {
    onFilter(onlyUsers);
  }, [onlyUsers, onFilter]);

  return (
    <DivContainer>
      <CheckBoxContainer>
        <CheckBox name="onlyMine" type="checkbox" checked={onlyUsers} onChange={onOnlyMineChecked} /> Ne voir que mes réunions
      </CheckBoxContainer>
      <RightDiv>
        <NewReuButton onClick={openModale}>
          <FontAwesomeIcon icon={faPlusCircle} title="Nouvelle réunion" />
          Nouvelle Réunion
        </NewReuButton>
      </RightDiv>
    </DivContainer>
  );
};
