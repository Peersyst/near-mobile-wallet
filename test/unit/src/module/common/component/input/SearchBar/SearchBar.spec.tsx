import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import { render, screen, translate } from "test-utils";

describe("SearchBar", () => {
    test("Renders correctly", () => {
        render(<SearchBar />);

        expect(screen.getByPlaceholderText(translate("search"))).toBeDefined();
        expect(screen.getByTestId("SearchIcon")).toBeDefined();
    });
});
