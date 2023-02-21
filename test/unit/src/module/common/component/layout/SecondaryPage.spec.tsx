import SecondaryPage from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { Typography } from "@peersyst/react-native-components";
import { fireEvent, render } from "test-utils";
import * as ReactNavigation from "@react-navigation/native";

describe("Test for the secondary page", () => {
    test("Renders correctly", () => {
        const screen = render(
            <SecondaryPage title={"Settings"}>
                <Typography variant={"h1"}>hola</Typography>
            </SecondaryPage>,
        );
        expect(screen.getByText("Settings")).toBeDefined();
        expect(screen.getByText("hola")).toBeDefined();
    });
    test("Triggers correctly goBack", () => {
        const mockedCanGoBack = jest.fn().mockReturnValue(true);
        const mockedGoBack = jest.fn();
        const mockedNavigation = {
            canGoBack: mockedCanGoBack,
            goBack: mockedGoBack,
        };
        jest.spyOn(ReactNavigation, "useNavigation").mockReturnValue(mockedNavigation);
        const screen = render(
            <SecondaryPage title={"Settings"} back>
                <Typography variant={"h1"}>hola</Typography>
            </SecondaryPage>,
        );
        expect(screen.getByText("Settings")).toBeDefined();
        expect(screen.getByText("hola")).toBeDefined();
        const icon = screen.getByTestId("BackIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(mockedCanGoBack).toHaveBeenCalled();
        expect(mockedGoBack).toHaveBeenCalled();
    });
});
