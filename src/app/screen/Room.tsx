import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Booking } from "../common/class/Booking";
import { Resource } from "../common/class/Resource";
import { BookingFilters } from "../common/components/business/booking/BookingFilters";
import { BookingTimeline } from "../common/components/business/booking/BookingTimeline";
import { CreateBookingModal } from "../common/components/business/booking/CreateBookingModal";
import CurrentBooking from "../common/components/business/booking/CurrentBooking";
import { Panel, PanelLeft, PanelRight } from "../common/components/technical/Panel";
import AppStore from "../stores/AppStore";
import { getBookings } from "../stores/booking/bookingAction";
import { getResource } from "../stores/resource/resourceAction";

interface StateToProps {
  resource?: Resource;
  bookings?: Booking[];
  userId: string;
  isLoggedIn: boolean;
}

interface DispatchProps {
  doGetResource: () => void;
  doGetBookings: () => void;
}

const PageTitle = styled.h1`
  font-size: 150%;
  word-break: break-word;
`;

export type RoomProps = StateToProps & DispatchProps;

const Room: React.FC<RoomProps> = ({ bookings, resource, userId, doGetBookings, isLoggedIn }) => {
  const [visibleBookings, setVisibleBookings] = React.useState(bookings);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onFilter = React.useCallback(
    (isOnlyUser: boolean) => {
      if (bookings != null && userId !== "" && isOnlyUser) {
        const userBookings = bookings.filter(booking => booking.userId === userId);
        setVisibleBookings(userBookings);
      } else {
        setVisibleBookings(bookings);
      }
    },
    [bookings, userId]
  );

  React.useEffect(() => {
    setVisibleBookings(bookings);
  }, [bookings]);

  React.useEffect(() => {
    if (bookings == null) {
      doGetBookings();
    }
  }, [doGetBookings, bookings]);

  if (!isLoggedIn) {
    return <Redirect to="" />;
  }

  const openModale = () => {
    setIsModalOpen(true);
  };

  const closeModale = () => {
    setIsModalOpen(false);
  };

  return (
    <Panel>
      {resource && bookings && <CreateBookingModal isOpen={isModalOpen} resource={resource} bookings={bookings} onClose={closeModale} />}
      <PanelLeft>
        <CurrentBooking bookings={bookings} />
      </PanelLeft>
      <PanelRight>
        <PageTitle>Réunions de la salle {resource && resource.name}</PageTitle>
        <div>
          <BookingFilters onFilter={onFilter} openModale={openModale} />
        </div>
        <div>
          {visibleBookings != null && visibleBookings.length > 0 ? <BookingTimeline bookings={visibleBookings} /> : "Aucune réunion de prévu"}
        </div>
      </PanelRight>
    </Panel>
  );
};

const mapStateToProps = ({ resource, booking, user }: AppStore): StateToProps => {
  return { resource: resource.resource, bookings: booking.bookings, userId: user.userInfo ? user.userInfo.id : "", isLoggedIn: user.isLoggedIn };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doGetResource: () => dispatch(getResource()),
  doGetBookings: () => dispatch(getBookings())
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
