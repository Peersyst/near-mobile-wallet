import DAOCardHeader, { DAO_INFO_URL } from "module/dao/component/core/DAOAccountCard/DAOCardHeader/DAOCardHeader";
import { fireEvent, render } from "test-utils";
import { Linking } from "react-native";

describe("Test for the header of the DAO card", () => {
    test("Renders correctly", () => {
        const screen = render(<DAOCardHeader />);
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledDAOIcon"));
        expect(screen.getByTestId("InfoIcon"));
    });
    test("Goes to DAO info page", () => {
        const mockedLinking = jest.fn();
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        const screen = render(<DAOCardHeader />);
        const infoButton = screen.getByTestId("InfoIcon");
        fireEvent.press(infoButton);
        expect(mockedLinking).toHaveBeenCalledWith(DAO_INFO_URL);
    });
});
