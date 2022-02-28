import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { render } from "test-utils";

describe("Isotip tests", () => {
    test("Renders correctly -> light mode", () => {
        const screen = render(<Isotip size={"sm"} />);
        expect(screen.getByTestId("LogoIcon")).toBeDefined();
    });
});
