import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppStore from "../../../../stores/AppStore";
import { Booking } from "../../../class/Booking";
import { UsersNames } from "../../../class/UsersNames";
import { getCurrentBooking, getNextBooking, getPreviousBooking } from "../../../utils/bookingUtils";
import { Card } from "../../technical/Card";
import { BookingResume } from "./BookingResume";

const CardContainer = styled(Card)`
  width: 80%;
  margin-top: 1em;
  margin-bottom: 1em;
  min-height: 5em;
  text-align: initial;
  padding-left: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  div.booking-name h2 {
    font-size: 100% !important;
  }
`;

const CurrentCardContainer = styled(CardContainer)`
  min-height: 7em;
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
  userName: string;
}

export type CurrentBookingProps = StateToProps & IProps;

const CurrentBooking: React.FC<CurrentBookingProps> = ({ bookings, users, userName }) => {
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
          <CardTitle tabIndex={0}>Dernière réunion: </CardTitle>
          <BookingResume
            booking={previousBooking}
            userName={users.users ? users.users.get(previousBooking.userId) || "" : ""}
            currentUserName={userName}
          />
        </CardContainer>
      )}
      {currentBooking && (
        <CurrentCardContainer>
          <BookingResume
            booking={currentBooking}
            userName={users.users ? users.users.get(currentBooking.userId) || "" : ""}
            currentUserName={userName}
          />
        </CurrentCardContainer>
      )}
      {nextBooking && (
        <CardContainer>
          <CardTitle tabIndex={0}>Réunion suivante: </CardTitle>
          <BookingResume booking={nextBooking} userName={users.users ? users.users.get(nextBooking.userId) || "" : ""} currentUserName={userName} />
        </CardContainer>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }: AppStore): StateToProps => {
  return { users: user.users, userName: user.userInfo && user.userInfo.name ? user.userInfo.name : "" };
};

export default connect(mapStateToProps)(CurrentBooking);
