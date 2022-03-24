import { News } from "mocks/news";
import SimpleNewsCard from "module/news/component/display/SimpleNewsCard/SimpleNewsCard";
import { fireEvent, render } from "test-utils";
import { Linking } from "react-native";

describe("Test for the SimpleNewsCard", () => {
    test("Renders correctly", () => {
        const screen = render(<SimpleNewsCard {...News} />);
        expect(screen.getByText("Title"));
    });
    test("Goes to link correctly", () => {
        const mockedLinking = jest.fn();
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        const screen = render(<SimpleNewsCard {...News} />);
        const news = screen.getByText("Title");
        fireEvent.press(news);
        expect(mockedLinking).toHaveBeenCalledWith("link");
    });
});
