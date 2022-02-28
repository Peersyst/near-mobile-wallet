import { render } from "test-utils";
import DashboardScreen from "module/dashboard/DashboardScreen";

describe("DashboardScreen tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<DashboardScreen />);
        expect(screen.getByText("Login"));
    });
});
