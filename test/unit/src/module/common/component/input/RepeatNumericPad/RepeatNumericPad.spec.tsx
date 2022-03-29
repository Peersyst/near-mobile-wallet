import { translate } from "locale";
import { fireEvent, render } from "test-utils";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";

describe("Test for the RepeatNumericPad component", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<RepeatNumericPad onCancel={jest.fn()} placeholder="placeholder" onSuccess={jest.fn()} />);
        expect(screen.getByText("placeholder"));
        expect(screen.getAllByTestId("BackIcon"));
        expect(screen.getByText(translate("cancel")));
    });
    test("Triggers functino if pin is correct", () => {
        const mockedOnSuccess = jest.fn();
        const screen = render(<RepeatNumericPad onSuccess={mockedOnSuccess} />);
        for (let i = 1; i < 5; i++) {
            fireEvent.press(screen.getByText(i.toString()));
        }
        expect(screen.getByText(translate("repeat_pin"))).toBeDefined();
        for (let i = 1; i < 5; i++) {
            fireEvent.press(screen.getByText(i.toString()));
        }
        expect(mockedOnSuccess).toHaveBeenCalled();
    });
    test("Triggers function if pin is correct", () => {
        const mockedOnSuccess = jest.fn();
        const screen = render(<RepeatNumericPad onSuccess={mockedOnSuccess} />);
        for (let i = 1; i < 5; i++) {
            fireEvent.press(screen.getByText(i.toString()));
        }
        expect(screen.getByText(translate("repeat_pin"))).toBeDefined();
        for (let i = 5; i > 1; i--) {
            fireEvent.press(screen.getByText(i.toString()));
        }
        expect(mockedOnSuccess).not.toHaveBeenCalled();
    });
    test("Triggers function onCancel", () => {
        const mockedOnCancel = jest.fn();
        const screen = render(<RepeatNumericPad onSuccess={jest.fn()} onCancel={mockedOnCancel} />);
        fireEvent.press(screen.getByText(translate("cancel")));
        expect(mockedOnCancel).toHaveBeenCalled();
    });
});
