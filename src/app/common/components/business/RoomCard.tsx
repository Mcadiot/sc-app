import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { roomBaseUrl } from "../../../routes/routesConstants";
import { Resource } from "../../class/Resource";
import { Card } from "../technical/Card";
import { GreenCircleDiv, RedCircleDiv } from "../technical/CircleDiv";
import { ColoredName } from "../technical/ColoredName";
import { LinkDiv } from "../technical/Link";

interface IProps {
  resource: Resource;
  isOccupied: boolean;
}

export type LoginButtonProps = IProps;

const ButtonDiv = styled.div`
  padding: 1em;
`;

const OccupiedDivOccupied = styled.div`
  color: ${props => props.theme.colors.occupiedRoomColor};
  font-size: 150%;
  display: inline-flex;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const OccupiedDivEmpty = styled(OccupiedDivOccupied)`
  color: ${props => props.theme.colors.freeRoomColor};
`;

export const RoomCard: React.FC<LoginButtonProps> = props => {
  return (
    <Card>
      {props.isOccupied ? (
        <OccupiedDivOccupied>
          <RedCircleDiv />
          Salle occupée
        </OccupiedDivOccupied>
      ) : (
        <OccupiedDivEmpty>
          <GreenCircleDiv />
          Salle libre
        </OccupiedDivEmpty>
      )}
      <ColoredName>{props.resource.name}</ColoredName>
      <ButtonDiv>
        <LinkDiv to={`${roomBaseUrl}/${props.resource.id}`}>
          <FontAwesomeIcon icon={faPlusCircle} title="Utilisateur" />
          Détails
        </LinkDiv>
      </ButtonDiv>
    </Card>
  );
};
