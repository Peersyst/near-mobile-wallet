import DaoCardHeader, { DAO_INFO_URL } from "module/dao/core/DaoAccountCard/DaoCardHeader/DaoCardHeader";
import { fireEvent, render } from "test-utils";
import { Linking } from "react-native";

describe("Test for the header of the dao card", () => {
    test("Renders correctly", () => {
        const screen = render(<DaoCardHeader />);
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledDAOIcon"));
        expect(screen.getByTestId("InfoIcon"));
    });
    test("Goes to dao info page", () => {
        const mockedLinking = jest.fn();
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        const screen = render(<DaoCardHeader />);
        const infoButton = screen.getByTestId("InfoIcon");
        fireEvent.press(infoButton);
        expect(mockedLinking).toHaveBeenCalledWith(DAO_INFO_URL);
    })
});
