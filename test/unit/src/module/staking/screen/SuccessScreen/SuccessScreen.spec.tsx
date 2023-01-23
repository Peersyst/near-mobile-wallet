import SuccessScreen from "module/staking/screen/SuccessScreen/SuccessScreen";
import { UseModalMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";
import Typography from "module/common/component/display/Typography/Typography";

describe("SuccessScreen.spec", () => {
    test("renders correctly", async () => {
        const { hideModal } = new UseModalMock();
        const mockMessage = "message";

        render(
            <SuccessScreen onClose={() => hideModal()} message={mockMessage}>
                <Typography variant="body2Strong">{translate("stake_success")}</Typography>
            </SuccessScreen>,
        );

        expect(screen.getByText(translate("stake_success"))).toBeDefined();
        const btn = screen.getByRole("button", { name: translate("close") });
        fireEvent.press(btn);
        await waitFor(() => expect(hideModal).toHaveBeenCalled());
    });
});
