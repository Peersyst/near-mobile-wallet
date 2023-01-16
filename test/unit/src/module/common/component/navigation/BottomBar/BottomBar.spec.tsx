import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import { fireEvent, render, translate } from "test-utils";
import mockedState from "./utils/mockedState";

describe("BottomBar test", () => {
    test("Renders correctly", () => {
        const screen = render(<BottomBar state={{ ...mockedState, index: 0 } as any} navigation={{ navigate: jest.fn() } as any} />);
        //Staking
        expect(screen.getByText(translate("staking"))).toBeDefined();
        expect(screen.getByTestId("DatabaseIcon")).toBeDefined();
        //Wallet
        expect(screen.getByText(translate("wallet"))).toBeDefined();
        expect(screen.getByTestId("NearIcon")).toBeDefined();
        //News
        expect(screen.getByTestId("PinIcon")).toBeDefined();
        expect(screen.getByText(translate("news"))).toBeDefined();
    });
    test("Navigate to Staking Screen", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("DatabaseIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).toHaveBeenCalledWith(MainBottomScreens.STAKING);
    });
    test("Navigate to Home Screen", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("NearIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).toHaveBeenCalledWith(MainBottomScreens.HOME);
    });
    test("Navigate to News Screen", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={{ ...mockedState, index: 0 } as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("PinIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).toHaveBeenCalledWith(MainBottomScreens.NEWS);
    });
    test("Dont't navigate to news because it is in the news screen. index 2 in the routes -> see mockedState", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("PinIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).not.toHaveBeenCalled();
    });
});
