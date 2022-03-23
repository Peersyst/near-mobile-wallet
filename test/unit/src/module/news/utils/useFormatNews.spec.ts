import { useFormatNews } from "module/news/utils/useFormatNews";

describe("useFormatNews tests", () => {
    const mockedNews = {
        content: {
            __url: "imageUri",
        },
        link: "link",
        pubDate: "date",
        title: "There are &lt;",
    };
    const resultTitle = `There are <
`;
    test("Returns formatted News", () => {
        expect(useFormatNews(mockedNews)).toEqual(
            expect.objectContaining({ title: resultTitle, date: "date", imageUri: "imageUri", uri: "link" }),
        );
    });
});
