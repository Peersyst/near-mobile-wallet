import { render } from "test-utils";
import { Text } from "react-native";
import { fireEvent } from "@testing-library/react-native";
import Button from "module/common/component/input/Button/Button";
import { theme } from "module/common/style/theme";


describe("Button tests", () => {
    test("Renders correctly + darkmode default", () => {
        const screen = render(
            <Button>
                Press me
            </Button>,
        );
        expect(screen.getByText("Press me")).toBeDefined();
        //test default dark type
        expect(screen.getByRole("button").props.style.outlined.borderColor).toEqual(theme.palette.black)
    });
    test("Renders correctly white type", () => {
        const screen = render(
            <Button type="light">
                Press me
            </Button>,
        );
        //test default white type
        expect(screen.getByRole("button").props.style.outlined.borderColor).toEqual(theme.palette.white)
    });
    test("onPress is called", () => {
        const onPress = jest.fn();
        const screen = render(
            <Button onPress={onPress}>
                Press me
            </Button>,
        );

        const button = screen.getByText("Press me");
        fireEvent.press(button);
        expect(onPress).toHaveBeenCalled();
    });
});
