import { formatHtmlEntities } from "utils/formatHtmlEntities";

describe("formatHtmlEntities tests", () => {
    test("Returns string formatted", () => {
        expect(formatHtmlEntities("&lt;")).toEqual("<");
        expect(formatHtmlEntities("&amp;")).toEqual("&");
        expect(formatHtmlEntities("&copy;")).toEqual("©");
    });
});
