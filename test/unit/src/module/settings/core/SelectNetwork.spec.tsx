import SelectNetwork from "module/settings/components/core/SelectNetwork/SelectNetwork";
import { fireEvent, render } from "test-utils";
import * as Recoil from "recoil";
import { defaultSettingsState, SettingsState } from "module/settings/state/SettingsState";
import { translate } from "locale";
import { SettingsStorage } from "module/settings/SettingsStorage";

describe("Test for the select network", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test("Returns correctly", () => {
        const setSendState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSendState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectNetwork />);
        expect(screen.getAllByText(translate("select_your_network"))).toHaveLength(2);
        expect(screen.getByText(translate("network_name").replace("{n}", "Testnet"))).toBeDefined();
        expect(screen.getAllByText(translate("network_name").replace("{n}", "Mainnet"))).toHaveLength(2);
    });
    test("Change the network correctly", () => {
        jest.useFakeTimers();
        const setSendState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSendState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));
        const screen = render(<SelectNetwork />);
        const item = screen.getByText(translate("network_name").replace("{n}", "Testnet"));
        fireEvent.press(item);
        jest.runAllTimers();
        const resultSettings: SettingsState = { ...defaultSettingsState, network: "testnet" };
        expect(setSettingsStorage).toHaveBeenCalledWith(expect.objectContaining(resultSettings));
        expect(setSendState).toHaveBeenCalledWith(resultSettings);
        jest.useRealTimers();
    });
});
