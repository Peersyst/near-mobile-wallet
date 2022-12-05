import { render, translate, screen } from "test-utils";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";

describe("AddWallet tests", () => {
    test("Renders correctly", () => {
        render(<AddWallet />);
    });
});
