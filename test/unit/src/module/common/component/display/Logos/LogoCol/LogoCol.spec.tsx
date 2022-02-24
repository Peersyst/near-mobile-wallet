import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { render } from "test-utils";

describe("LogoCol test", () => {
    test("Renders correctly -> medium + dark", () => {
        const screen = render(<LogoCol />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
    });
});
