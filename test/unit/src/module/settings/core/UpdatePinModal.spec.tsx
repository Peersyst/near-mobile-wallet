import { render, translate } from "test-utils";
import UpdatePinModal from "module/settings/components/core/UpdatePinModal/UpdatePinModal";

describe("Test for the UpdatePinScreen", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<UpdatePinModal />);
        expect(screen.getByText(translate("update_your_pin")));
        expect(screen.getAllByTestId("BackIcon"));
        expect(screen.getByText(translate("enter_new_pin").toUpperCase()));
    });
});
