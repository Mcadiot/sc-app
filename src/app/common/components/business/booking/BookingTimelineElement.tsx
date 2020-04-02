import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled, { ThemeContext } from "styled-components";
import AppStore from "../../../../stores/AppStore";
import { getUser } from "../../../../stores/user/userAction";
import { Booking } from "../../../class/Booking";
import { UsersNames } from "../../../class/UsersNames";
import { isBookingPassed, isCurrentBooking } from "../../../utils/bookingUtils";
import { BookingResume } from "./BookingResume";

interface StateToProps {
  users: UsersNames;
  userId: string;
  currentUserName: string;
}

interface DispatchProps {
  doGetUser: (id: string) => void;
}

interface IProps {
  booking: Booking;
}

const Icon = styled(FontAwesomeIcon)`
  width: 1.5em !important;
`;

const CurrentVerticalTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content.bounce-in {
    background-color: ${props => props.theme.colors.timelineCurrentBackgroundColor};
    color: ${props => props.theme.colors.timelineCurrentColor};
  }
  .vertical-timeline-element-content-arrow {
    border-right-color: ${props => props.theme.colors.timelineCurrentBackgroundColor};
  }

  .delete-button-div {
    border: ${props => props.theme.icon.deleteIConBorder};

    .delete-icon {
      margin-left: 0.45em;
      margin-top: 0.25em;
    }
  }
`;

export type BookingTimelineElementProps = IProps & StateToProps & DispatchProps;

const BookingTimelineElement: React.FC<BookingTimelineElementProps> = ({ booking, users, doGetUser, userId, currentUserName }) => {
  const [userName, setUserName] = React.useState("");

  const themeContext = useContext(ThemeContext);
  const iconBackgroundColor = isBookingPassed(booking)
    ? themeContext.colors.timelineIconBackgroundColor
    : isCurrentBooking(booking)
    ? themeContext.colors.timelineIconCurrentBackgroundColor
    : themeContext.colors.timelineIconTodoBackgroundColor;
  const iconColor = isBookingPassed(booking)
    ? themeContext.colors.timelineIconColor
    : isCurrentBooking(booking)
    ? themeContext.colors.timelineIconCurrentColor
    : themeContext.colors.timelineIconTodoColor;

  React.useEffect(() => {
    const name = users.users.get(booking.userId);
    if (name != null) {
      setUserName(name);
    } else {
      doGetUser(booking.userId);
    }
  }, [users, doGetUser, booking.userId]);

  if (isCurrentBooking(booking)) {
    return (
      <CurrentVerticalTimelineElement iconStyle={{ background: iconBackgroundColor, color: iconColor }} icon={<Icon icon={faCalendar} />}>
        <BookingResume booking={booking} currentUserId={userId} userName={userName} currentUserName={currentUserName} />
      </CurrentVerticalTimelineElement>
    );
  }
  return (
    <VerticalTimelineElement iconStyle={{ background: iconBackgroundColor, color: iconColor }} icon={<Icon icon={faCalendar} />}>
      <BookingResume booking={booking} currentUserId={userId} userName={userName} currentUserName={currentUserName} />
    </VerticalTimelineElement>
  );
};

const mapStateToProps = ({ user }: AppStore): StateToProps => {
  return {
    users: user.users,
    userId: user.userInfo ? user.userInfo.id : "",
    currentUserName: user.userInfo && user.userInfo.name ? user.userInfo.name : ""
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doGetUser: (id: string) => dispatch(getUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingTimelineElement);
