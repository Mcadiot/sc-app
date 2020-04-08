import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteBooking } from "../../../../stores/booking/BookingAction";
import { Booking } from "../../../class/Booking";
import { isCurrentBooking } from "../../../utils/BookingUtils";
import { Confirm } from "../../technical/Confirm";
import { FlexDiv } from "../../technical/layout/FlexDiv";
import { RightDiv } from "../../technical/layout/RightDiv";

const BookingTitle = styled.h2`
  font-size: 120% !important;
  color: ${(props) => props.theme.colors.globalColor} !important;
  word-break: break-word;
  width: 95%;
`;

const CurrentBookingTitle = styled(BookingTitle)`
  color: ${(props) => props.theme.colors.timelineIconCurrentColor} !important;
`;

const DeleteButtonDiv = styled(RightDiv)`
  width: 2em;
  height: 2em;
  background-color: ${(props) => props.theme.colors.deleteIconBackgroundColor};
  border-radius: 50%;
  margin-top: 1em;
  cursor: pointer;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  width: 1.2em;
  height: 1.2em;
  color: ${(props) => props.theme.colors.deleteIconColor};
  padding: 0;
  margin-top: 0.4em;
  &.svg-inline--fa.fa-w-14 {
    margin-left: 0.56em;
    @media screen and (max-width: 350px) {
      margin-left: 0.46em;
    }
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
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const onCancelDelete = () => {
    setIsConfirmOpen(false);
  };
  const onConfirmDelete = () => {
    doDeleteBooking(booking.id);
  };
  return (
    <>
      <Confirm
        title={getConfirmTitle()}
        isOpen={isConfirmOpen}
        content={getConfirmContent()}
        label="supprimer la réservation"
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
      <FlexDiv className="booking-name">
        {isCurrentBooking(booking) ? <CurrentBookingTitle>{booking.name}</CurrentBookingTitle> : <BookingTitle>{booking.name}</BookingTitle>}
        {userId != null && userId === booking.userId && (
          <DeleteButtonDiv className="delete-button-div">
            <DeleteIcon
              className="delete-icon"
              icon={faTrash}
              title="Supprimer la réservation"
              onClick={() => {
                setIsConfirmOpen(true);
              }}
            />
          </DeleteButtonDiv>
        )}
      </FlexDiv>
    </>
  );
};

const ContentContainer = styled.div`
  min-height: 5em;
`;
function getConfirmContent() {
  return <ContentContainer>Etes vous sur de vouloir supprimer la réservation?</ContentContainer>;
}

function getConfirmTitle() {
  return "Supprimer la réservation";
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doDeleteBooking: (id: string) => dispatch(deleteBooking(id)),
});

export default connect(null, mapDispatchToProps)(BookingName);
