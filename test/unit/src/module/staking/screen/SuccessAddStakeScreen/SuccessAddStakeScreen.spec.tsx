import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";
import SuccessAddStakeScreen from "module/staking/screen/SuccessAddStakeScreen/SuccessAddStakeScreen";
import { UseModalMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";

describe("SuccessAddStakeScreen", () => {
    test("renders correctly", () => {
        const { hideModal } = new UseModalMock();
        render(<SuccessAddStakeScreen />);
        expect(screen.getByText(translate("stake_success"))).toBeDefined();
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(hideModal).toHaveBeenCalledWith(AddStakeModal.id);
    });
});
