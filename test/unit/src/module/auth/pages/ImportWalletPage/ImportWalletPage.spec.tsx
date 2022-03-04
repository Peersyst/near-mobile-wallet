import { render } from "test-utils";
import ImportWalletPage from "module/auth/screen/ImportWalletPage/ImportWalletPage";

describe("Import wallet page", () => {
    test("Renders correctly", () => {
        const screen = render(<ImportWalletPage />);
        expect(screen.getByText("Import wallet page"));
    });
});
