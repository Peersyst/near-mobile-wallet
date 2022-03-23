import { translate } from "locale";
import NewsScreen from "module/news/screen/NewsScreen/NewsScreen";
import { render } from "test-utils";

describe("Test for the NewsScreen", () => {
    test("Renders correctly", () => {
        const screen = render(<NewsScreen />);
        expect(screen.getByText(translate("news"))).toBeDefined();
    });
});
