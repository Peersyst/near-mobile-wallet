import { StakeStateMock, UseModalMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import UnstakeSuccessScreen from "module/staking/screen/SuccessScreen/UnstakeSuccessScreen/UnstakeSuccessScreen";

describe("SuccessUnstakeScreen", () => {
    test("renders correctly", () => {
        const { hideModal } = new UseModalMock();
        new StakeStateMock();
        render(<UnstakeSuccessScreen />);
        expect(screen.getByText(translate("unstake_success"))).toBeDefined();
        expect(screen.getByText(translate("unstake_withdraw_waiting_time"))).toBeDefined();
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(hideModal).toHaveBeenCalledWith(UnstakeModal.id);
    });
});
