import { render } from "test-utils";
import CreateWalletPage from "module/auth/page/CreateWalletPage/CreateWalletPage";

describe("Create wallet page", () => {
    test("Renders correctly", () => {
        const screen = render(<CreateWalletPage />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
        expect(screen.getByText("Create wallet page"));
    });
});
