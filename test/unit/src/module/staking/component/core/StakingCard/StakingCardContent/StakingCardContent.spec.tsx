import { render } from "test-utils";

import { waitFor } from "@testing-library/react-native";
import { UseServiceInstanceMock, UseWalletStateMock } from "mocks/common";
import { StakingBalanceMock } from "mocks/NearSdk";
import StakingCardContent from "module/staking/component/core/StakingCard/StakingCardContent/StakingCardContent";

describe("Tests for StakingCardContent", () => {
    const { state } = new UseWalletStateMock();
    const wallet = state.wallets[0];
    const { serviceInstance } = new UseServiceInstanceMock();
    const mockedStakingBalance = new StakingBalanceMock();

    test("Renders correctly", async () => {
        const screen = render(<StakingCardContent wallet={wallet} />);
        jest.spyOn(serviceInstance, "getTotalStakingBalance").mockResolvedValue(mockedStakingBalance);

        await waitFor(() => expect(screen.getAllByText(mockedStakingBalance.staked.toString())).toBeDefined());
        await waitFor(() => expect(screen.getAllByText(mockedStakingBalance.available.toString())).toBeDefined());
    });
});
