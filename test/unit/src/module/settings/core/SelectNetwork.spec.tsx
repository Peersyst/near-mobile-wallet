import SelectNetwork from "module/settings/components/core/SelectNetwork/SelectNetwork";
import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { SettingsStorage } from "module/settings/SettingsStorage";

describe("Test for the select network", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test("Returns correctly", () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectNetwork />);
        expect(screen.getAllByText(translate("select_your_network"))).toHaveLength(2);
        expect(screen.getByText(translate("network_name", { name: "Mainnet" }))).toBeDefined();
        expect(screen.getAllByText(translate("network_name", { name: "Testnet" }))).toHaveLength(2);
    });
    test("Change the network correctly", () => {
        jest.useFakeTimers();
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));
        const screen = render(<SelectNetwork />);
        const item = screen.getByText(translate("network_name", { name: "Mainnet" }));
        fireEvent.press(item);
        jest.runAllTimers();
        expect(setSettingsStorage).toHaveBeenCalledWith({ network: "mainnet" });
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
