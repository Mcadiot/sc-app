import { Booking } from "../app/common/class/Booking";
import { Resource } from "../app/common/class/Resource";
import { calculateMaxDuration, getDurations, sortBooking } from "../app/common/utils/BookingUtils";
import { getDateFromBackString } from "../app/common/utils/DateUtils";

describe("BookingUtils", () => {
  it("getDurations", () => {
    const min = 1;
    const max = 10;
    const step = 2;
    const durations = getDurations(min, max, step);
    expect(durations.length).toBe(5);
    let i = 0;
    for (let duration of durations) {
      expect(duration).toBe(min + i * step);
      i++;
    }
  });

  it("calculateMaxDuration", () => {
    const resource: Resource = {
      id: "test",
      name: "test",
      minimumBookingDuration: 5,
      maximumBookingDuration: 80,
      bookingDurationStep: 5
    };

    expect(calculateMaxDuration(resource, 18)).toBe(15);
    expect(calculateMaxDuration(resource, 90)).toBe(80);
    expect(calculateMaxDuration(resource, 2)).toBe(0);
  });

  it("sortBooking", () => {
    const start1 = "2020-04-03T04:58:37.533Z";
    const end1 = "2020-04-03T05:38:37.533Z";
    const book1: Booking = {
      id: "test1",
      start: getDateFromBackString(start1),
      end: getDateFromBackString(end1),
      name: "test1",
      userId: "test1"
    };

    const start2 = "2020-04-03T02:58:37.533Z";
    const end2 = "2020-04-03T03:25:37.533Z";
    const book2: Booking = {
      id: "test1",
      start: getDateFromBackString(start2),
      end: getDateFromBackString(end2),
      name: "test1",
      userId: "test1"
    };

    const books = [book1, book2];

    expect(sortBooking(books).length).toBe(2);
    expect(sortBooking(books)[0]).toBe(book2);
    expect(sortBooking(books)[1]).toBe(book1);
  });
});
