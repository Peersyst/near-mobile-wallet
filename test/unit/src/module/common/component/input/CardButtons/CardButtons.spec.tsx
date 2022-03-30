import { DAODepositIcon } from "icons";
import CardButtons from "module/common/component/input/CardButtons/CardButtons";
import { fireEvent, render } from "test-utils";

describe("Test for the card buttons", () => {
    test("Returns correctly", () => {
        const screen = render(
            <CardButtons
                //Left props
                leftLabel={"leftLabel"}
                leftIcon={<DAODepositIcon />}
                leftButtonOnPress={jest.fn()}
                //Right props
                rightLabel={"rightLabel"}
                rightIcon={<DAODepositIcon />}
                rightButtonOnPress={jest.fn()}
            />,
        );
        expect(screen.getByText("leftLabel")).toBeDefined();
        expect(screen.getByText("rightLabel")).toBeDefined();
        expect(screen.getAllByTestId("DAODepositIcon")).toHaveLength(2);
    });
    test("Triggers left function correctly", () => {
        const mockedLeftFunc = jest.fn();
        const screen = render(
            <CardButtons
                //Left props
                leftLabel={"leftLabel"}
                leftIcon={<DAODepositIcon />}
                leftButtonOnPress={mockedLeftFunc}
                //Right props
                rightLabel={"rightLabel"}
                rightIcon={<DAODepositIcon />}
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
                leftIcon={<DAODepositIcon />}
                leftButtonOnPress={jest.fn()}
                //Right props
                rightLabel={"rightLabel"}
                rightIcon={<DAODepositIcon />}
                rightButtonOnPress={mockedRightFunc}
            />,
        );
        const button = screen.getByText("rightLabel");
        fireEvent.press(button);
        expect(mockedRightFunc).toHaveBeenCalled();
    });
});
