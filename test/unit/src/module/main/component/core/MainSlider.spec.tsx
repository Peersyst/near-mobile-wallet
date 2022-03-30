import MainSlider from "module/main/component/core/MainSlider";
import { render } from "test-utils";
import { translate } from "locale";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("Test for the Main Slider", () => {
    test("Renders correctly without accounts", () => {
        const screen = render(<MainSlider />);
        expect(screen.getByText(translate("add_a_wallet"))).toBeDefined();
    });
    test("Renders correctly with cells", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        const screen = render(<MainSlider />);
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toBeDefined();
        expect(screen.getAllByText(mockedUseWallet.state.wallets[1].name)).toBeDefined();
    });
});
