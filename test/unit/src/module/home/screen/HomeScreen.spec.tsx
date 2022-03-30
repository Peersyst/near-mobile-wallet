import { render } from "test-utils";
import { translate } from "locale";
import HomeScreen from "module/home/screen/HomeScreen";

describe("HomeScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(<HomeScreen />);

        expect(screen.getAllByText(translate("transactions"))).toHaveLength(1);
    });
});
