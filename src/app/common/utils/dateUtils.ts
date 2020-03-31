import moment from "moment";

export const FORMAT_DATE_WITH_TIME = "YYYY-MM-DDTHH:mm:ss";

export function getDateFromBackString(date?: string): moment.Moment | null {
  let dateMoment = moment();
  if (date != null) {
    dateMoment = moment(date, FORMAT_DATE_WITH_TIME);
    if (dateMoment.isValid()) {
      return dateMoment;
    }
  }
  return null;
}
