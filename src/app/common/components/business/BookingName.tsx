import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteBooking } from "../../../stores/booking/bookingAction";
import { Booking } from "../../class/Booking";
import { isCurrentBooking } from "../../utils/bookingUtils";
import { FlexDiv } from "../technical/FlexDiv";
import { RightDiv } from "../technical/RightDiv";

const BookingTitle = styled.h2`
  font-size: 120% !important;
  color: ${props => props.theme.colors.globalColor} !important;
`;

const CurrentBookingTitle = styled(BookingTitle)`
  color: ${props => props.theme.colors.timelineIconCurrentColor} !important;
`;

const DeleteButtonDiv = styled(RightDiv)`
  width: 2em;
  height: 2em;
  background-color: ${props => props.theme.colors.deleteIconBackgroundColor};
  border-radius: 50%;
  margin-top: 1em;
  cursor: pointer;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  width: 1.2em;
  height: 1.2em;
  color: ${props => props.theme.colors.deleteIconColor};
  padding: 0;
  margin-top: 0.4em;
  &.svg-inline--fa.fa-w-14 {
    margin-left: 0.56em;
  }
`;

interface IProps {
  booking: Booking;
  userId?: string;
}

interface DispatchProps {
  doDeleteBooking: (id: string) => void;
}

export type BookingNameProps = IProps & DispatchProps;

const BookingName: React.FC<BookingNameProps> = ({ booking, userId, doDeleteBooking }) => {
  return (
    <FlexDiv className="booking-name">
      {isCurrentBooking(booking) ? <CurrentBookingTitle>{booking.name}</CurrentBookingTitle> : <BookingTitle>{booking.name}</BookingTitle>}
      {userId != null && userId === booking.userId && (
        <DeleteButtonDiv>
          <DeleteIcon
            icon={faTrash}
            onClick={() => {
              doDeleteBooking(booking.id);
            }}
          />
        </DeleteButtonDiv>
      )}
    </FlexDiv>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doDeleteBooking: (id: string) => dispatch(deleteBooking(id))
});

export default connect(null, mapDispatchToProps)(BookingName);
