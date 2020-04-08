import { isEmptyString, isValidString } from "../app/common/utils/FormUtils";

describe("FormUtils", () => {
  it("isEmptyString - chaine de caractère avec que des espaces", () => {
    expect(isEmptyString("  ")).toBe(true);
  });

  it("isEmptyString - chaine de caractère vide", () => {
    expect(isEmptyString("")).toBe(true);
  });

  it("isValidString  - chaine de caractère vide", () => {
    expect(isValidString("")).toBe(false);
  });
});
