import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { render, screen } from "test-utils";

describe("AddWalletModal tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        render(<AddWalletModal navbar={{ title: "Add wallet" }}>{<></>}</AddWalletModal>);
        expect(screen.getByText("Add wallet"));
    });
});
