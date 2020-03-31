import moment from "moment";
import { getDateFromBackString } from "../utils/dateUtils";

export class Booking {
  public id: string;
  public start: moment.Moment | null;
  public end: moment.Moment | null;
  public name: string;
  public userId: string;

  constructor(data: any) {
    this.id = data.id;
    this.start = getDateFromBackString(data.start);
    this.end = getDateFromBackString(data.end);
    this.name = data.name;
    this.userId = data.userId;
  }
}
