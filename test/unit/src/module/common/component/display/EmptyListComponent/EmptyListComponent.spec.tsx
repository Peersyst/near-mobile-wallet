import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import { render, translate } from "test-utils";

describe("EmptyListComponent test", () => {
    test("Renders correctly", () => {
        const screen = render(<EmptyListComponent />);
        expect(screen.getByText(translate("nothing_to_show", { ns: "error" }))).toBeDefined();
    });
});
