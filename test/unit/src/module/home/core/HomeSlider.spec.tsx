import HomeSlider from "module/home/component/core/HomeSlider";
import { render } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("Test for the Home Slider", () => {
    test("Renders correctly with cells", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        const screen = render(<HomeSlider />);
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toBeDefined();
        expect(screen.getAllByText(mockedUseWallet.state.wallets[1].name)).toBeDefined();
    });
});
