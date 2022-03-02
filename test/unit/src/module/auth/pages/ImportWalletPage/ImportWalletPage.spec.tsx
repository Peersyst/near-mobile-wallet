import { render } from "test-utils";
import ImportWalletPage from "module/auth/page/ImportWalletPage/ImportWalletPage";

describe("Import wallet page", () => {
    test("Renders correctly", () => {
        const screen = render(<ImportWalletPage />);
        expect(screen.getByTestId("LogoColIcon")).toBeDefined();
        expect(screen.getByText("Import wallet page"));
    });
});
