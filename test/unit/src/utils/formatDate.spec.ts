import formatDate from "utils/formatDate";

describe("Format date tests", () => {
    test("Returns 04/01/1970 in date-hours mode", () => {
        expect(formatDate(new Date(1970, 0, 4), "date-hours", "en")).toEqual("04/01/1970 - 00:00");
    });
    test("Returns 04/01/1970 in weekday mode", () => {
        expect(formatDate(new Date(1970, 0, 4), "weekday", "en")).toEqual("Sun 04 Jan, 1970");
    });
    test("Returns 14/11/1970 in date-hours mode", () => {
        expect(formatDate(new Date(1970, 10, 14), "date-hours", "es")).toEqual("14/11/1970 - 00:00");
    });
    test("Returns 14/11/1970 in weekday mode", () => {
        expect(formatDate(new Date(1970, 10, 14), "weekday", "es")).toEqual("sáb. 14 nov, 1970");
    });
});
