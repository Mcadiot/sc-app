import { faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { Booking } from "../common/class/Booking";
import { Resource } from "../common/class/Resource";
import { RoomCard } from "../common/components/business/RoomCard";
import { FlexDiv } from "../common/components/technical/FlexDiv";
import { Login } from "../common/components/technical/Login";
import { Title } from "../common/components/technical/Title";
import { isRoomOccupied } from "../common/utils/bookingUtils";
import AppStore from "../stores/AppStore";
import { getResource } from "../stores/resource/resourceAction";

interface IProps {}

interface StateToProps {
  resource?: Resource;
  isLoggedIn: boolean;
  bookings?: Booking[];
}

interface DispatchProps {
  doGetResource: () => void;
}

export type RoomsProps = IProps & StateToProps & DispatchProps;

const Rooms: React.FC<RoomsProps> = ({ doGetResource, resource, isLoggedIn, bookings }) => {
  const [isOccupied, setIsOccupied] = React.useState(false);

  React.useEffect(() => {
    if (bookings) {
      setIsOccupied(isRoomOccupied(bookings));
    }
  }, [bookings]);

  const doGetResourceCallBack = React.useCallback(() => {
    doGetResource();
  }, [doGetResource]);

  React.useEffect(() => {
    if (isLoggedIn) {
      doGetResourceCallBack();
    }
  }, [doGetResourceCallBack, isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Title>
            <FontAwesomeIcon icon={faTh} />
            Salles
          </Title>

          {resource ? <RoomCard resource={resource} isOccupied={isOccupied} /> : "Aucune salle"}
        </>
      ) : (
        <FlexDiv>
          <Login />
        </FlexDiv>
      )}
    </div>
  );
};

const mapStateToProps = ({ resource, user, booking }: AppStore): StateToProps => {
  return { resource: resource.resource, bookings: booking.bookings, isLoggedIn: user.isLoggedIn };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doGetResource: () => dispatch(getResource())
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
