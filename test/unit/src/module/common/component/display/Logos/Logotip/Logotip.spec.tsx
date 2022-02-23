import Logotip from "module/common/component/display/Logos/Logotip/Logotip";
import { render } from "test-utils";

describe("Logotip tests", () => {
    test("Renders correctly", () => {
        const screen = render(<Logotip size={"sm"} appearance={"light"} />);
        const chip = screen.getByText("BULL");
        expect(chip).toBeDefined();
    });
});
