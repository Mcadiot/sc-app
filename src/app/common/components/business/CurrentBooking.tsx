import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppStore from "../../../stores/AppStore";
import { Booking } from "../../class/Booking";
import { UsersNames } from "../../class/UsersNames";
import { getCurrentBooking, getNextBooking, getPreviousBooking } from "../../utils/bookingUtils";
import { Card } from "../technical/Card";
import { BookingResume } from "./BookingResume";

const CardContainer = styled(Card)`
  width: 80%;
  margin-top: 1em;
  margin-bottom: 1em;
  min-height: 7em;
  text-align: initial;
  padding-left: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  div.booking-name h2 {
    font-size: 100% !important;
  }
`;

const CurrentCardContainer = styled(Card)`
  min-height: 5em;
  background-color: ${props => props.theme.colors.timelineCurrentBackgroundColor};
  color: ${props => props.theme.colors.timelineCurrentColor};

  h2 {
    color: ${props => props.theme.colors.timelineCurrentColor} !important;
  }
`;

const CardTitle = styled.div`
  margin-bottom: 0.5em;
`;

interface IProps {
  bookings?: Booking[];
}

interface StateToProps {
  users: UsersNames;
}

export type CurrentBookingProps = StateToProps & IProps;

const CurrentBooking: React.FC<CurrentBookingProps> = ({ bookings, users }) => {
  const [currentBooking, setCurrentBooking] = React.useState(bookings != null && bookings.length > 0 ? getCurrentBooking(bookings) : null);
  const [nextBooking, setNextBooking] = React.useState(bookings != null && bookings.length > 0 ? getNextBooking(bookings) : null);
  const [previousBooking, setPreviousBooking] = React.useState(bookings != null && bookings.length > 0 ? getPreviousBooking(bookings) : null);

  React.useEffect(() => {
    if (bookings != null && bookings.length > 0) {
      setCurrentBooking(getCurrentBooking(bookings));
      setNextBooking(getNextBooking(bookings));
      setPreviousBooking(getPreviousBooking(bookings));
    }
  }, [bookings]);

  return (
    <div>
      {previousBooking && (
        <CardContainer>
          <CardTitle>Dernière réunion: </CardTitle>
          <BookingResume booking={previousBooking} userName={users.users.get(previousBooking.userId) || ""} />
        </CardContainer>
      )}
      {currentBooking && (
        <CurrentCardContainer>
          <BookingResume booking={currentBooking} userName={users.users.get(currentBooking.userId) || ""} />
        </CurrentCardContainer>
      )}
      {nextBooking && (
        <CardContainer>
          <CardTitle>Réunion suivante: </CardTitle>
          <BookingResume booking={nextBooking} userName={users.users.get(nextBooking.userId) || ""} />
        </CardContainer>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }: AppStore): StateToProps => {
  return { users: user.users };
};

export default connect(mapStateToProps)(CurrentBooking);
