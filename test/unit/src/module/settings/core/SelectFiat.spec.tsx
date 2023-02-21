import SelectFiat from "module/settings/components/core/SelectFiat/SelectFiat";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";

describe("Test for the SelectFiat component", () => {
    test("Renders correctly", () => {
        const screen = render(<SelectFiat />);
        expect(screen.getByText(translate("default_currency"))).toBeDefined();
        expect(screen.getByText("USD")).toBeDefined();
    });
    test("Change the fiat currency correctly", async () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockResolvedValue();
        const screen = render(<SelectFiat />);
        const usdItem = screen.getByText("USD");
        fireEvent.press(usdItem); //open the modal
        const eurItem = await screen.findByText("EUR");
        fireEvent.press(eurItem); //select the EUR currency
        expect(setSettingsStorage).toHaveBeenCalledWith({ fiat: "eur" });
        expect(setSettingsState).toHaveBeenCalled();
    });
});
