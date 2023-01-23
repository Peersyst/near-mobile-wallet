import Typography from "module/common/component/display/Typography/Typography";
import SuccessStakeScreen from "module/staking/screen/SuccessStakeScreen/SuccessStakeScreen";
import { StakeStateMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";

describe("SuccessStakeScreen", () => {
    test("renders correctly", () => {
        const mockOnClose = jest.fn();
        new StakeStateMock();
        render(
            <SuccessStakeScreen message="message" onClose={mockOnClose}>
                <Typography variant="body3Strong">Unstake success</Typography>
            </SuccessStakeScreen>,
        );
        expect(screen.getByText("message")).toBeDefined();
        expect(screen.getByText("Unstake success")).toBeDefined();
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(mockOnClose).toBeCalledTimes(1);
    });
});
