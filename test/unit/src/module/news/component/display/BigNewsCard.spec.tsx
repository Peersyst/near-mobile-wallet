import { News } from "mocks/news";
import { fireEvent, render } from "test-utils";
import { Linking } from "react-native";
import BigNewsCard from "module/news/component/display/BigNewsCard/BigNewsCard";

describe("Test for the BigNewsCard", () => {
    test("Renders correctly", () => {
        const screen = render(<BigNewsCard {...News} />);
        expect(screen.getByText("Title"));
        expect(screen.getByText("23/03/2022 - 04:32"));
    });
    test("Goes to link correctly", () => {
        const mockedLinking = jest.fn();
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        const screen = render(<BigNewsCard {...News} />);
        const news = screen.getByText("Title");
        fireEvent.press(news);
        expect(mockedLinking).toHaveBeenCalledWith("link");
    });
});
