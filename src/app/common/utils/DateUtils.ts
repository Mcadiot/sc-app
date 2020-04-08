import moment from "moment";

export const FORMAT_DATE_WITH_TIME = "YYYY-MM-DDTHH:mm:ss";

export const fuseau = "+04:00";

export function getDateFromBackString(date?: string): moment.Moment | null {
  let dateMoment: moment.Moment = moment();
  if (date != null) {
    dateMoment = moment(date, FORMAT_DATE_WITH_TIME);
    if (dateMoment.isValid()) {
      dateMoment.utcOffset(fuseau);
      const newDate: moment.Moment = moment(dateMoment.format(FORMAT_DATE_WITH_TIME));
      return newDate;
    }
  }
  return null;
}
