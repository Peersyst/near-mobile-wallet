import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import { fireEvent, render, translate } from "test-utils";
import mockedState from "./utils/mockedState";
import { capitalize } from "@peersyst/react-utils";
import config from "config/config";

describe("BottomBar test", () => {
    test("Renders correctly", () => {
        const screen = render(<BottomBar state={{ ...mockedState, index: 0 } as any} navigation={{ navigate: jest.fn() } as any} />);
        //Staking
        expect(screen.getByText(capitalize(translate("staking")))).toBeDefined();
        expect(screen.getByTestId("DatabaseIcon")).toBeDefined();
        //Wallet
        expect(screen.getByText(translate("wallet"))).toBeDefined();
        expect(screen.getByTestId("NearIcon")).toBeDefined();
        //News
        expect(screen.getByTestId("PinIcon")).toBeDefined();
        expect(screen.getByText(translate("news"))).toBeDefined();

        if (config.signerFeature) {
            expect(screen.getByTestId("LaptopIcon")).toBeDefined();
            expect(screen.getByText(translate("dapps"))).toBeDefined();

            expect(screen.getByTestId("QRCodeIcon")).toBeDefined();
            expect(screen.getByText("Scan")).toBeDefined();
        } else {
            expect(screen.queryByTestId("LaptopIcon")).toBeNull();
            expect(screen.queryByText(translate("dapps"))).toBeNull();

            expect(screen.queryByTestId("QRCodeIcon")).toBeNull();
            expect(screen.queryByText("Scan")).toBeNull();
        }
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

    test("Navigates to Dapps Screen", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        if (config.signerFeature) {
            const newsButton = screen.getByTestId("LaptopIcon");
            fireEvent.press(newsButton);
            expect(mockedNavigate).toHaveBeenCalledWith(MainBottomScreens.DAPPS);
        } else {
            expect(screen.queryByTestId("LaptopIcon")).toBeNull();
            expect(screen.queryByText(translate("dapps"))).toBeNull();
        }
    });

    test("Dont't navigate to news because it is in the news screen. index 2 in the routes -> see mockedState", () => {
        const mockedNavigate = jest.fn();
        const screen = render(<BottomBar state={mockedState as any} navigation={{ navigate: mockedNavigate } as any} />);
        const newsButton = screen.getByTestId("PinIcon");
        fireEvent.press(newsButton);
        expect(mockedNavigate).not.toHaveBeenCalled();
    });
});
