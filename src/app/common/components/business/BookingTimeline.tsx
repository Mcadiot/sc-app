import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import { Booking } from "../../class/Booking";
import BookingTimelineElement from "./BookingTimelineElement";

interface IProps {
  bookings: Booking[];
}

export type BookingTimelineProps = IProps;

const TimelineContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBackgroundColor};

  .vertical-timeline-element {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .vertical-timeline-element .vertical-timeline-element-content.bounce-in {
    padding-top: 0.5em;
    padding-bottom: 0;
  }
`;

export const BookingTimeline: React.FC<BookingTimelineProps> = ({ bookings }) => {
  return (
    <TimelineContainer>
      <VerticalTimeline layout={"1-column"}>
        {bookings.map(booking => {
          return <BookingTimelineElement booking={booking} key={booking.id} />;
        })}
      </VerticalTimeline>
    </TimelineContainer>
  );
};
