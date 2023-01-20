import SuccessUnstakeScreen from "module/staking/screen/SuccessUnstakeScreen/SuccessUnstakeScreen";
import { StakeStateMock } from "test-mocks";

import { fireEvent, render, screen, translate } from "test-utils";

describe("SuccessUnstakeScreen", () => {
    test("renders correctly", () => {
        const mockOnClose = jest.fn();
        new StakeStateMock();
        render(<SuccessUnstakeScreen />);
        expect(screen.getByText(translate("unstake_success"))).toBeDefined();
        expect(screen.getByText(translate("unstake_withdraw_waiting_time"))).toBeDefined();
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(mockOnClose).toBeCalledTimes(1);
    });
});
