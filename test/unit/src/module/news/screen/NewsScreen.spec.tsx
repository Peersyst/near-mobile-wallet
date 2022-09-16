import NewsScreen from "module/news/screen/NewsScreen";
import { fireEvent, render, translate } from "test-utils";
import * as GetNews from "module/news/query/useGetNews";
import { ArrayNews } from "mocks/news";
import { Linking } from "react-native";

describe("Test for the NewsScreen", () => {
    test("Renders correctly with empty list component", () => {
        jest.spyOn<any, any>(GetNews, "default").mockReturnValue({
            isLoading: false,
            data: [],
        });
        const screen = render(<NewsScreen />);
        expect(screen.getByText(translate("nothing_to_show"))).toBeDefined();
    });
    test("Renders correctly with news", () => {
        jest.spyOn<any, any>(GetNews, "default").mockReturnValue({
            isLoading: false,
            data: ArrayNews,
        });
        const screen = render(<NewsScreen />);
        expect(screen.getByText("Title0")).toBeDefined();
        expect(screen.getByText("Title1")).toBeDefined();
        expect(screen.getByText("Title2")).toBeDefined();
        expect(screen.getByText("Title3")).toBeDefined();
        expect(screen.getByText("Title4")).toBeDefined();
    });
    test("Goes to the clicked news item", () => {
        jest.spyOn<any, any>(GetNews, "default").mockReturnValue({
            isLoading: false,
            data: ArrayNews,
        });
        const mockedLinking = jest.fn();
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        const screen = render(<NewsScreen />);
        const card = screen.getByText("Title0");
        fireEvent.press(card);
        expect(mockedLinking).toHaveBeenCalledWith("link0");
    });
});
