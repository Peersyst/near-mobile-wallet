import HomeSlider from "module/home/component/core/HomeSlider";
import { render } from "test-utils";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the Home Slider", () => {
    const { state } = new UseWalletStateMock();
    new UseServiceInstanceMock();
    test("Renders correctly with cells", () => {
        const screen = render(<HomeSlider />);
        expect(screen.getAllByText(state.wallets[0].name)).toBeDefined();
        expect(screen.getAllByText(state.wallets[1].name)).toBeDefined();
    });
});
