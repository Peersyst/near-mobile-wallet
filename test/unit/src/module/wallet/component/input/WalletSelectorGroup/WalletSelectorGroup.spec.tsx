import WalletSelectorGroup from "module/wallet/component/input/WalletSelectorGroup/WalletSelectorGroup";
import { render, screen } from "test-utils";

describe("WalletSelectorGroup", () => {
    test("renders correctly", () => {
        const screen = render(<WalletSelectorGroup />);
        expect(screen.getByText("Select funding account")).toBeDefined();
    });
});
