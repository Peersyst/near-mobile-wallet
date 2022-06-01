import formatDate from "utils/formatDate";

describe("Format date tests", () => {
    test("Returns 04/01/1970", () => {
        expect(formatDate(new Date(1970, 0, 4))).toEqual("04/01/1970 - 00:00");
    });
    test("Returns 14/11/1970", () => {
        expect(formatDate(new Date(1970, 10, 14))).toEqual("14/11/1970 - 00:00");
    });
});
