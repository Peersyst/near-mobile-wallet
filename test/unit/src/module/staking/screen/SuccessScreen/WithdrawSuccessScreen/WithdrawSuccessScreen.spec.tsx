import { StakeStateMock, UseModalMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";
import WithdrawSuccessScreen from "module/staking/screen/SuccessScreen/WithdrawSuccessScreen/WithdrawSuccessScreen";
import WithdrawModal from "module/staking/component/core/WithdrawModal/WithdrawModal";

describe("WithdrawSuccessScreen", () => {
    test("renders correctly", () => {
        const { hideModal } = new UseModalMock();
        new StakeStateMock();
        render(<WithdrawSuccessScreen />);
        expect(screen.getByText(translate("withdraw_success"))).toBeDefined();
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(hideModal).toHaveBeenCalledWith(WithdrawModal.id);
    });
});
