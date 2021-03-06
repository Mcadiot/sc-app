import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Booking } from "../../../class/Booking";
import BookingName from "./BookingName";

interface BookingResumeProps {
  booking: Booking;
  currentUserId?: string;
  currentUserName: string;
  userName: string;
}

export const BookingResume: React.FC<BookingResumeProps> = ({ booking, currentUserId, userName, currentUserName }) => {
  return (
    <div tabIndex={0}>
      <div>
        {booking.start && booking.start.format("HH:mm")} <FontAwesomeIcon icon={faArrowRight} /> {booking.end && booking.end.format("HH:mm")}
      </div>
      <BookingName booking={booking} userId={currentUserId} />
      <div>{currentUserName === userName ? "Moi" : userName}</div>
    </div>
  );
};
