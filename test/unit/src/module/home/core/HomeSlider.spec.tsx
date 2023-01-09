import HomeSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import { render } from "test-utils";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the Home Slider", () => {
    const { state } = new UseWalletStateMock();
    new UseServiceInstanceMock();
    test("Renders correctly with cells", () => {
        const screen = render(<HomeSlider />);
        expect(screen.getAllByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getAllByText(state.wallets[1].account)).toBeDefined();
    });
});
