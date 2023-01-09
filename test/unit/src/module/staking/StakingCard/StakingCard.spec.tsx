import { render, translate } from "test-utils";
import StakingCard from "module/staking/component/core/StakingCard/StakingCard";
import { UseServiceInstanceMock, UseWalletStateMock } from "mocks/common";
import { StakingBalanceMock } from "mocks/NearSdk";
import { waitFor } from "@testing-library/react-native";

describe("Test for StakingCard component", () => {
    const { state } = new UseWalletStateMock();
    const wallet = state.wallets[0];
    const { serviceInstance } = new UseServiceInstanceMock();
    const mockedStakingBalance = new StakingBalanceMock();

    test("Renders correctly all staking data", async () => {
        const screen = render(<StakingCard wallet={state.wallets[0]} />);
        jest.spyOn(serviceInstance, "getTotalStakingBalance").mockResolvedValue(mockedStakingBalance);

        expect(screen.getAllByText(state.wallets[0].account)).toBeDefined();
        await waitFor(() => expect(screen.getAllByText(mockedStakingBalance.staked.toString())).toBeDefined());
        await waitFor(() => expect(screen.getAllByText(mockedStakingBalance.available.toString())).toBeDefined());

        expect(screen.getByRole("button", { name: translate("stakeMyTokens") })).toBeDefined();
    });

    test("Display imported tag", () => {
        const screen = render(<StakingCard wallet={{ ...wallet, imported: true }} />);
        expect(screen.getByText(translate("imported").toUpperCase())).toBeDefined();
    });
});
