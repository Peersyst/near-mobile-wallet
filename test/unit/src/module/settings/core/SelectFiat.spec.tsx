import SelectFiat from "module/settings/components/core/SelectFiat/SelectFiat";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { fireEvent, render } from "test-utils";
import * as Recoil from "recoil";
import { translate } from "locale";
import { SettingsStorage } from "module/settings/SettingsStorage";

describe("Test for the SelectFiat component", () => {
    test("Renders correctly", () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectFiat />);
        expect(screen.getAllByText(translate("default_currency"))).toHaveLength(2);
        expect(screen.getAllByText("USD")).toHaveLength(2);
        expect(screen.getByText("EUR")).toBeDefined();
        expect(screen.getByText("GBP")).toBeDefined();
        expect(screen.getByText("JPY")).toBeDefined();
        expect(screen.getByText("CNY")).toBeDefined();
    });
    test("Change the fiat currency correctly", () => {
        jest.useFakeTimers();
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));
        const screen = render(<SelectFiat />);
        const item = screen.getByText("EUR");
        fireEvent.press(item);
        jest.runAllTimers();
        expect(setSettingsStorage).toHaveBeenCalledWith({ fiat: "eur" });
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
