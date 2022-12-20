import Button from "module/common/component/input/Button/Button";
import { ConfirmPinModalWrapper } from "module/settings/components/core/ConfirmPinModal/ConfirmPinModalWrapper";
import { fireEvent, render, screen, translate } from "test-utils";

describe("ConfirmPinModalWrapper", () => {
    test("should render correctly", () => {
        render(
            <ConfirmPinModalWrapper onPinConfirmed={jest.fn()}>
                {({ showConfirmPinModal }) => <Button onPress={showConfirmPinModal}>Show</Button>}
            </ConfirmPinModalWrapper>,
        );

        //By default de confirm pin modal is not visible
        expect(screen.queryByText(translate("confirm_your_pin"))).toBeNull();
        const showBtn = screen.getByText("Show");
        expect(showBtn).toBeDefined();
        //Click on the button to show the confirm pin modal
        fireEvent.press(showBtn);
        //Shows the modal
        expect(screen.getByText(translate("confirm_your_pin"))).toBeDefined();
    });
});
