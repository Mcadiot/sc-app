export interface Resource {
  id: string;
  name: string;
  minimumBookingDuration: number;
  maximumBookingDuration: number;
  bookingDurationStep: number;
}
