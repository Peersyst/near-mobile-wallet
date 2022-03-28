import { formatNews } from "module/news/utils/formatNews";

describe("formatNews tests", () => {
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
        expect(formatNews(mockedNews)).toEqual(
            expect.objectContaining({ title: resultTitle, date: "date", imageUri: "imageUri", uri: "link" }),
        );
    });
});
