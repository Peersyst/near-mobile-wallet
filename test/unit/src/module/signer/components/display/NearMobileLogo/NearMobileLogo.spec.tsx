import NearMobileLogo from "module/signer/components/display/NearMobileLogo/NearMobileLogo";
import { render, screen } from "test-utils";

describe("NearMobileLogo", () => {
    test("Renders correctly", () => {
        render(<NearMobileLogo />);

        expect(screen.getByTestId("NearMobileIcon")).toBeDefined();
    });
});
