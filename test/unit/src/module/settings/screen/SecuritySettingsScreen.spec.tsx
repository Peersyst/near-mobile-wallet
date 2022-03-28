import { translate } from "locale";
import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import { fireEvent, render } from "test-utils";
import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";

describe("Test for the SecuritySettingsScreen", () => {
    test("Renders correctly", () => {
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("change_passcode")));
    });
    test("Open confirm modal to update pin", () => {
        const showModal = jest.fn();
        jest.spyOn(UseModal, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("change_passcode"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalled();
    });
});
