import DaoScreen from "module/dao/screen/DaoScreen";
import { render } from "test-utils";

describe("Test for the DaoScreen", () => {
    test("Renders correctly", () => {
        const screen = render(<DaoScreen />);
        expect(screen.getByText("Dao Screen")).toBeDefined();
    });
});
