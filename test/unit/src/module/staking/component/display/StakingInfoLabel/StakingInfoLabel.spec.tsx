import { render } from "test-utils";
import config from "config/config";
import StakingInfoLabel from "module/staking/component/display/StakingInfoLabel/StakingInfoLabel";

describe("Test for StakingInfoLabel component", () => {
    test("Renders correctly with data", () => {
        const mockedStakingInfoLabel = { amount: 100, label: "label", loading: false };
        const screen = render(
            <StakingInfoLabel
                amount={mockedStakingInfoLabel.amount}
                label={mockedStakingInfoLabel.label}
                loading={mockedStakingInfoLabel.loading}
            />,
        );

        expect(screen.getByText(mockedStakingInfoLabel.amount.toString())).toBeDefined();
        expect(screen.getByText(config.tokenName + " " + mockedStakingInfoLabel.label)).toBeDefined();
    });
});
