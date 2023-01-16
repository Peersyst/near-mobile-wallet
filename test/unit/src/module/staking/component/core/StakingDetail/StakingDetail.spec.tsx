import StakingDetail from "module/staking/component/core/StakingDetail/StakingDetail";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react-native";

describe("Tests for StakingDetails", () => {
    test("Renders correctly being stakeable", () => {
        const mockStakingDetail = { title: "title", amount: 0 };

        render(<StakingDetail title={mockStakingDetail.title} amount={mockStakingDetail.amount} stakeable />);

        expect(screen.getByText(mockStakingDetail.title)).toBeDefined();
        expect(screen.getByText("0 NEAR")).toBeDefined();
        expect(screen.getByRole("button", { name: translate("unstake") })).toBeDefined();
    });

    test("Renders correctly not being stakeable", () => {
        const mockStakingDetail = { title: "title", amount: 0 };

        render(<StakingDetail title={mockStakingDetail.title} amount={mockStakingDetail.amount} />);

        expect(screen.getByText(mockStakingDetail.title)).toBeDefined();
        expect(screen.getByText("0 NEAR")).toBeDefined();
        expect(screen.queryByRole("button", { name: translate("unstake") })).toBeNull();
    });
});
