import { render, translate, screen } from "test-utils";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";

describe("AddWallet tests", () => {
    test("Renders correctly", () => {
        render(<AddWallet />);
        expect(screen.getByText(translate("add_a_wallet_txt")));
    });
});
