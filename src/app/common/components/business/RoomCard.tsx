import { faArrowRight, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { roomBaseUrl } from "../../../routes/RoutesConstants";
import { Booking } from "../../class/Booking";
import { Resource } from "../../class/Resource";
import { LinkDiv } from "../technical/button/LinkDiv";
import { Card } from "../technical/layout/Card";
import { GreenCircleDiv, RedCircleDiv } from "../technical/layout/CircleDiv";
import { ColoredName } from "../technical/layout/ColoredName";

interface IProps {
  resource: Resource;
  isOccupied: boolean;
  currentBooking?: Booking;
}

export type LoginButtonProps = IProps;

const ButtonDiv = styled.div`
  padding: 1em;
`;

const OccupiedDivOccupied = styled.div`
  color: ${(props) => props.theme.colors.occupiedRoomColor};
  font-size: 150%;
  display: inline-flex;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const OccupiedDivEmpty = styled(OccupiedDivOccupied)`
  color: ${(props) => props.theme.colors.freeRoomColor};
`;

const FullDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const CardContainer = styled(Card)`
  max-width: 20em;
  min-height: 20em;

  @media screen and (max-width: 350px) {
    max-width: 18em;
    min-height: 16em;
  }
`;

const DateDiv = styled.div`
  margin-bottom: 0.5em;
`;

export const RoomCard: React.FC<LoginButtonProps> = (props) => {
  return (
    <CardContainer>
      {props.isOccupied && props.currentBooking ? (
        <>
          <OccupiedDivOccupied>
            <RedCircleDiv />
            Salle occupée
          </OccupiedDivOccupied>
          <DateDiv>
            {props.currentBooking.start && props.currentBooking.start.format("HH:mm")} <FontAwesomeIcon icon={faArrowRight} />{" "}
            {props.currentBooking.end && props.currentBooking.end.format("HH:mm")}
          </DateDiv>
        </>
      ) : (
        <OccupiedDivEmpty>
          <GreenCircleDiv />
          Salle libre
        </OccupiedDivEmpty>
      )}
      <FullDiv>
        <ColoredName>{props.resource.name}</ColoredName>
      </FullDiv>
      <ButtonDiv>
        <LinkDiv to={`${roomBaseUrl}/${props.resource.id}`}>
          <FontAwesomeIcon icon={faPlusCircle} title="Utilisateur" />
          Détails
        </LinkDiv>
      </ButtonDiv>
    </CardContainer>
  );
};
