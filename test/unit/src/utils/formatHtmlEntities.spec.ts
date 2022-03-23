import { formatHtmlEntities } from "utils/formatHtmlEntities";

describe("formatHtmlEntities tests", () => {
    test("Returns formatted number", () => {
        expect(formatHtmlEntities("&lt;")).toEqual("<");
        expect(formatHtmlEntities("&amp;")).toEqual("&");
        expect(formatHtmlEntities("&copy;")).toEqual("©");
    });
});
