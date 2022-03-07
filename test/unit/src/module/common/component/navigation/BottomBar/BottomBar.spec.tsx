import { translate } from "locale";
import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { fireEvent, render } from "test-utils";
import mockedState from "./utils/mockedState";

describe("BottomBar test", () => {
    test("Renders correctly", () => {
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: jest.fn() } as any} />);
        expect(screen.getByText(translate("dao"))).toBeDefined();
        expect(screen.getByText(translate("news"))).toBeDefined();
        expect(screen.getByTestId("NewsIcon")).toBeDefined();
        expect(screen.getByTestId("DAOIcon")).toBeDefined();
        expect(screen.getByRole("imagebutton")).toBeDefined();
    });
    test("Navigate to Dao Screen", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("DAOIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).toHaveBeenCalledWith(MainScreens.DAO);
    });
    test("Dont't navigate to news because it is in the news screen. index 2 in the routes -> see mockedState", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("NewsIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).not.toHaveBeenCalled();
    });
});
