import { render, translate } from "test-utils";
import StakingDetails from "module/staking/component/core/StakingDetails/StakingDetails";
import { UseServiceInstanceMock, UseWalletStateMock } from "mocks/common";
import { act, screen, waitFor } from "@testing-library/react-native";
import { StakingBalanceMock } from "mocks/NearSdk";

describe("Tests for StakingDetails", () => {
    new UseWalletStateMock();
    const { serviceInstance } = new UseServiceInstanceMock();
    const mockedStakingBalance = new StakingBalanceMock({ staked: 10, available: 5, pending: 2 });

    test("Renders correctly", async () => {
        const useGetTotalStakingMock = jest.spyOn(serviceInstance, "getTotalStakingBalance").mockResolvedValue(mockedStakingBalance);
        render(<StakingDetails />);

        await act(() => waitFor(() => expect(useGetTotalStakingMock).toHaveBeenCalled()));
        expect(screen.getByText(translate("totalAmountStaked"))).toBeDefined();
        expect(screen.getByText(translate("rewardsEarned"))).toBeDefined();
        expect(screen.getByText(translate("availableForWithdrawal"))).toBeDefined();

        expect(screen.getAllByTestId("NearIcon")).toHaveLength(4);
        expect(screen.getByText("10 NEAR")).toBeDefined();
        expect(screen.getByText("0 NEAR")).toBeDefined();
        expect(screen.getByText("5 NEAR")).toBeDefined();
        expect(screen.getByText("2 NEAR")).toBeDefined();
    });
});
