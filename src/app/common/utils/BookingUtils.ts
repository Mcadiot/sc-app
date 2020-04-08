import moment from "moment";
import { Booking } from "../class/Booking";
import { Resource } from "../class/Resource";

export function isRoomOccupied(bookings: Booking[]): boolean {
  if (bookings.length === 0) {
    return false;
  } else {
    const now: moment.Moment = moment();
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
  const now: moment.Moment = moment();
  if (booking.start && now.isAfter(booking.start) && booking.end && now.isAfter(booking.end)) {
    return true;
  }
  return false;
}

export function isCurrentBooking(booking: Booking): boolean {
  const now: moment.Moment = moment();
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
 * @returns la prochaine résetvation si celle ci n'est pas la réservation courrante
 */
export function getNextBooking(bookings: Booking[]): Booking | null {
  const now: moment.Moment = moment();
  const current: Booking | null = getCurrentBooking(bookings);
  for (let booking of bookings) {
    if (booking.start && booking.start.isAfter(now)) {
      if (!(current && current.id === booking.id)) {
        return booking;
      }
    }
  }
  return null;
}

/**
 * Bookings doit être ordonné par date de début croissante
 *  @returns la dernière réservation si celle ci n'est pas la même que la réservation courrante
 */
export function getPreviousBooking(bookings: Booking[]): Booking | null {
  const now: moment.Moment = moment();
  let previous: Booking | null = null;
  for (let booking of bookings) {
    if (booking.start && booking.start.isBefore(now) && booking.end && booking.end.isBefore(now)) {
      previous = booking;
    }
  }
  return previous;
}

export function getPossibleMaxDuration(resource: Resource, bookings: Booking[]): number {
  const { maximumBookingDuration } = resource;
  const current: Booking | null = getCurrentBooking(bookings);
  if (current != null) {
    return 0;
  } else {
    const nextBooking = getNextBooking(bookings);
    if (nextBooking) {
      const start = nextBooking.start;
      if (start) {
        const now: moment.Moment = moment();
        const ms: number = start.diff(now);
        const d: moment.Duration = moment.duration(ms);
        const minutesBeforeNext: number = d.hours() * 60 + d.minutes();
        return calculateMaxDuration(resource, minutesBeforeNext);
      }
    }
  }
  return maximumBookingDuration;
}

export function calculateMaxDuration(resource: Resource, minutesBeforeNext: number): number {
  const { minimumBookingDuration, maximumBookingDuration, bookingDurationStep } = resource;
  if (minutesBeforeNext >= maximumBookingDuration) {
    return maximumBookingDuration;
  } else if (minutesBeforeNext === minimumBookingDuration) {
    return minimumBookingDuration;
  } else if (minutesBeforeNext > minimumBookingDuration) {
    let duration: number = minimumBookingDuration;
    while (duration + bookingDurationStep <= minutesBeforeNext) {
      duration += bookingDurationStep;
    }
    return duration;
  }

  return 0;
}

export function getDurations(min: number, max: number, step: number): number[] {
  const durations: number[] = [];
  for (let i = min; i <= max; i = i + step) {
    durations.push(i);
  }
  return durations;
}
