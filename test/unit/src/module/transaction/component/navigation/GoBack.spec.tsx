import GoBack from "module/transaction/component/navigation/GoBack";
import { fireEvent, render } from "test-utils";
import * as Navigation from "@react-navigation/native";
import { translate } from "locale";

describe("Go back component", () => {
    test("Renders correctly", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ canGoBack: mockedNavigation });
        const screen = render(<GoBack />);
        const text = screen.getByText(translate("go_back"));
        expect(text).toBeDefined();
        expect(screen.getByTestId("BackIcon")).toBeDefined();
        fireEvent.press(text);
        expect(mockedNavigation).toHaveBeenCalled();
    });
});
