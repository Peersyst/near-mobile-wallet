import formatNumber from "utils/formatNumber";

describe("formatNumber tests", () => {
    test("Returns formatted number", () => {
        expect(formatNumber(12345.6789)).toEqual("12,345.6789");
        expect(formatNumber(12345.6789, { split: true })).toEqual(["12,345", ".", "6789"]);
        expect(formatNumber(12345.6789, { maxDecimals: 2, minDecimals: 2 })).toEqual("12,345.67");
        expect(formatNumber(12345)).toEqual("12,345");
        expect(formatNumber(12345, { split: true })).toEqual(["12,345", undefined, undefined]);
        expect(formatNumber(12345, { maxDecimals: 2, minDecimals: 2 })).toEqual("12,345.00");
    });
});
