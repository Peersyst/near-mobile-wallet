import { render } from "test-utils";
import HomePage from "module/main/screen/HomePage/HomePage";

describe("HomePage tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<HomePage />);
        expect(screen.getByText("Log out"));
    });
});
