import SecondaryPage from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { Typography } from "@peersyst/react-native-components";
import { fireEvent, render } from "test-utils";

describe("Test for the secondary page", () => {
    test("Renders correctly", () => {
        const screen = render(
            <SecondaryPage title={"Settings"} navigation={jest.fn() as any}>
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
        const screen = render(
            <SecondaryPage title={"Settings"} back navigation={mockedNavigation as any}>
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
