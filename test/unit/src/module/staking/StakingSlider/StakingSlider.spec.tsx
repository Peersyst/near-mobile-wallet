import StakingSlider from "module/staking/component/core/StakingSlider/StakingSlider";
import { render, translate } from "test-utils";
import { UseServiceInstanceMock, UseWalletStateMock } from "mocks/common";
import config from "config/config";

describe("Test for StakingSlider component", () => {
    const { state } = new UseWalletStateMock();
    new UseServiceInstanceMock();
    test("Renders correctly", () => {
        const screen = render(<StakingSlider />);

        expect(screen.getAllByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getAllByText(config.tokenName + " " + translate("available"))).toBeDefined();
        expect(screen.getAllByText(config.tokenName + " " + translate("staked"))).toBeDefined();
        expect(screen.getAllByRole("button", { name: translate("stakeMyTokens") })).toBeDefined();
    });
});
