import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import { render } from "test-utils";

describe("EmptyListComponent test", () => {
    test("Renders correctly", () => {
        const screen = render(<EmptyListComponent message="EmptyList" />);
        expect(screen.getByText("EmptyList")).toBeDefined();
    });
});
