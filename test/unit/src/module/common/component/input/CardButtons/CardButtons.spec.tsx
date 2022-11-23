import { DatabaseIcon } from "icons";
import CardButtons from "module/common/component/input/CardButtons/CardButtons";
import { fireEvent, render } from "test-utils";

describe("Test for the card buttons", () => {
    test("Returns correctly", () => {
        const screen = render(
            <CardButtons
                //Left props
                leftLabel={"leftLabel"}
                leftIcon={<DatabaseIcon />}
                leftButtonOnPress={jest.fn()}
                //Right props
                rightLabel={"rightLabel"}
                rightIcon={<DatabaseIcon />}
                rightButtonOnPress={jest.fn()}
            />,
        );
        expect(screen.getByText("leftLabel")).toBeDefined();
        expect(screen.getByText("rightLabel")).toBeDefined();
        expect(screen.getAllByTestId("DatabaseIcon")).toHaveLength(2);
    });
    test("Triggers left function correctly", () => {
        const mockedLeftFunc = jest.fn();
        const screen = render(
            <CardButtons
                //Left props
                leftLabel={"leftLabel"}
                leftIcon={<DatabaseIcon />}
                leftButtonOnPress={mockedLeftFunc}
                //Right props
                rightLabel={"rightLabel"}
                rightIcon={<DatabaseIcon />}
                rightButtonOnPress={jest.fn()}
            />,
        );
        const button = screen.getByText("leftLabel");
        fireEvent.press(button);
        expect(mockedLeftFunc).toHaveBeenCalled();
    });
    test("Triggers left function correctly", () => {
        const mockedRightFunc = jest.fn();
        const screen = render(
            <CardButtons
                //Left props
                leftLabel={"leftLabel"}
                leftIcon={<DatabaseIcon />}
                leftButtonOnPress={jest.fn()}
                //Right props
                rightLabel={"rightLabel"}
                rightIcon={<DatabaseIcon />}
                rightButtonOnPress={mockedRightFunc}
            />,
        );
        const button = screen.getByText("rightLabel");
        fireEvent.press(button);
        expect(mockedRightFunc).toHaveBeenCalled();
    });
});
