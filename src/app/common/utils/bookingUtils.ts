import moment from "moment";
import { Booking } from "../class/Booking";

export function isRoomOccupied(bookings: Booking[]): boolean {
  if (bookings.length === 0) {
    return false;
  } else {
    const now = moment();
    for (let booking of bookings) {
      if (booking.start && booking.end && now.isAfter(booking.start) && now.isBefore(booking.end)) {
        return true;
      }
    }
  }
  return false;
}

export function sortBooking(bookings: Booking[]): Booking[] {
  return bookings.sort((book1, book2) => {
    if (book1.start && book2.start && book1.start.isAfter(book2.start)) {
      return 1;
    }

    if (book1.start && book2.start && book1.start.isBefore(book2.start)) {
      return -1;
    }

    return 0;
  });
}

export function isBookingPassed(booking: Booking): boolean {
  const now = moment();
  if (booking.start && now.isAfter(booking.start) && booking.end && now.isAfter(booking.end)) {
    return true;
  }
  return false;
}

export function isCurrentBooking(booking: Booking): boolean {
  const now = moment();
  if (booking.start && booking.end && now.isAfter(booking.start) && now.isBefore(booking.end)) {
    return true;
  }
  return false;
}

export function getCurrentBooking(bookings: Booking[]): Booking | null {
  for (let booking of bookings) {
    if (isCurrentBooking(booking)) {
      return booking;
    }
  }
  return null;
}

/**
 * Bookings doit être ordonné par date de début croissante
 */
export function getNextBooking(bookings: Booking[]): Booking | null {
  const now = moment();
  for (let booking of bookings) {
    if (booking.start && booking.start.isAfter(now)) {
      return booking;
    }
  }
  return null;
}

/**
 * Bookings doit être ordonné par date de début croissante
 */
export function getPreviousBooking(bookings: Booking[]): Booking | null {
  const now = moment();
  let previous = null;
  for (let booking of bookings) {
    if (booking.start && booking.start.isBefore(now)) {
      previous = booking;
    }
  }
  return previous;
}
