import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { render } from "test-utils";

describe("Isotip tests", () => {
    test("Renders correctly", () => {
        const screen = render(<Isotip size={"sm"} appearance={"light"} />);
    });
});
