import { render } from "test-utils";
import Advise from "module/common/component/display/Advise/Advise";

describe("Advise", () => {
    test("Renders correctly with text", () => {
        const screen = render(<Advise title="Title" text="Text" />);
        expect(screen.getByText("Title")).toBeDefined();
        expect(screen.getByText("Text")).toBeDefined();
    });
    test("Renders correctly with text", () => {
        const screen = render(<Advise title="Title" />);
        expect(screen.getByText("Title")).toBeDefined();
    });
});
