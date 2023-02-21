import AddStakeSuccessScreen from "module/staking/screen/SuccessScreen/AddStakeSuccessScreen/AddStakeSuccessScreen";
import { StakeStateMock, UseModalMock } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";

describe("AddStakeSuccessScreen", () => {
    test("renders correctly", () => {
        const { hideModal } = new UseModalMock();
        new StakeStateMock();
        render(<AddStakeSuccessScreen />);
        expect(screen.getByText(translate("stake_success"))).toBeDefined();

        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        expect(hideModal).toHaveBeenCalledWith(AddStakeModal.id);
    });
});
