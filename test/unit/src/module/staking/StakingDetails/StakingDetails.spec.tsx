import { render, translate } from "test-utils";
import StakingDetails from "module/staking/component/core/StakingDetails/StakingDetails";
import { UseServiceInstanceMock, UseWalletStateMock } from "mocks/common";
import { act, screen, waitFor } from "@testing-library/react-native";
import { StakingBalanceMock } from "mocks/NearSdk";

describe("Tests for StakingDetails", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();
    const mockedStakingBalance = new StakingBalanceMock();

    test("Renders correctly", async () => {
        const useGetTotalStakingMock = jest.spyOn(serviceInstance, "getTotalStakingBalance").mockResolvedValue(mockedStakingBalance);
        render(<StakingDetails />);

        await act(() => waitFor(() => expect(useGetTotalStakingMock).toHaveBeenCalled()));
        expect(screen.getByText(translate("totalAmountStaked"))).toBeDefined();
        expect(screen.getByText(translate("rewardsEarned"))).toBeDefined();
        expect(screen.getByText(translate("availableForWithdrawal"))).toBeDefined();

        expect(screen.getAllByTestId("NearIcon")).toHaveLength(4);
        expect(screen.getAllByText("0 NEAR")).toHaveLength(4);
    });
});
