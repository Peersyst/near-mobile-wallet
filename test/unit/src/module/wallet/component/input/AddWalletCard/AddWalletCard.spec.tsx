import { translate } from "locale";
import { render } from "test-utils";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";

describe("AddWalletCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<AddWalletCard />);
        expect(screen.getByTestId("PlusIcon")).toBeDefined();
        expect(screen.getByText(translate("add_a_wallet"))).toBeDefined();
    });
});
