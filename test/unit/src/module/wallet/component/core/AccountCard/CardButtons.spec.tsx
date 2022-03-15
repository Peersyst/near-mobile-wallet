import { translate } from "locale";
import CardButtons from "module/wallet/component/core/AccountCard/CardButtons/CardButtons";
import { render } from "test-utils";
import { fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { cells } from "mocks/cells";

describe("Renders card button", () => {
    test("Renders correctly", () => {
        const screen = render(<CardButtons address={"test"} />);
        expect(screen.getByText(translate("send"))).toBeDefined();
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("receive"))).toBeDefined();
    });
    test("Triggers correctly send button", () => {
        const mockedNavigation = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<CardButtons address={"test"} />);
        const button = screen.getByText(translate("send"));
        fireEvent.press(button);
        expect(mockedNavigation).toHaveBeenCalledWith(MainScreens.SEND);
    });
    test("Triggers correctly receive button", () => {
        const mockedNavigation = jest.fn();
        const address = cells[0].address;
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigation });
        const screen = render(<CardButtons address={address} />);
        const button = screen.getByText(translate("receive"));
        fireEvent.press(button);
        expect(mockedNavigation).toHaveBeenCalledWith(MainScreens.RECEIVE, { address });
    });
});
