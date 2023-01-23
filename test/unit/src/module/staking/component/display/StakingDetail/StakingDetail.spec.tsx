import { render, translate } from "test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import StakingDetailCard from "module/staking/component/display/StakingDetailCard/StakingDetailCard";

describe("Tests for StakingDetails", () => {
    test("Renders correctly being stakeable", async () => {
        const mockStakingDetail = { title: "title", amount: "0" };
        const mockOnAction = jest.fn();

        render(
            <StakingDetailCard
                title={mockStakingDetail.title}
                amount={mockStakingDetail.amount}
                action="unstake"
                onAction={mockOnAction}
            />,
        );

        expect(screen.getByText(mockStakingDetail.title)).toBeDefined();
        expect(screen.getByText("0 NEAR")).toBeDefined();
        const button = screen.getByRole("button", { name: translate("unstake") });
        expect(button).toBeDefined();
        fireEvent.press(button);

        await waitFor(() => expect(mockOnAction).toHaveBeenCalled());
    });

    test("Renders correctly not being stakeable", () => {
        const mockStakingDetail = { title: "title", amount: "0" };

        render(<StakingDetailCard title={mockStakingDetail.title} amount={mockStakingDetail.amount} />);

        expect(screen.getByText(mockStakingDetail.title)).toBeDefined();
        expect(screen.getByText("0 NEAR")).toBeDefined();
        expect(screen.queryByRole("button", { name: translate("unstake") })).toBeNull();
    });
});
