import { getDateFromBackString } from "../app/common/utils/DateUtils";

describe("DateUtils", () => {
  it("getDateFromBackString", () => {
    const dateStr = "2020-04-03T02:58:37.533Z";
    const date = getDateFromBackString(dateStr);
    expect(date).not.toBe(null);
    if (date != null) {
      expect(date.format("dd/MM/yyyy")).not.toBe("03/04/2020");
      expect(date.format("HH:mm")).not.toBe("06:58");
    }
  });
});
