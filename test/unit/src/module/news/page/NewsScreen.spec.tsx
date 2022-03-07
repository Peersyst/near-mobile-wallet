import NewsScreen from "module/news/page/NewsScreen";
import { render } from "test-utils";

describe("Test for the NewsScreen", () => {
    test("Renders correctly", () => {
        const screen = render(<NewsScreen />);
        expect(screen.getByText("News Screen")).toBeDefined();
    });
});
