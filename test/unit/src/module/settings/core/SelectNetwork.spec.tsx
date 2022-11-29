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
        const screen = render(<SelectNetwork />);
        expect(screen.getByText(translate("select_your_network"))).toBeDefined();
        expect(screen.getByText(translate("network_name", { name: "Mainnet" }))).toBeDefined();
    });
    test("Change the network correctly", async () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockResolvedValue();
        const screen = render(<SelectNetwork />);
        const testnetItem = screen.getByText(translate("network_name", { name: "Mainnet" }));
        fireEvent.press(testnetItem); //open modal
        const mainnetItem = await screen.findByText(translate("network_name", { name: "Testnet" }));
        fireEvent.press(mainnetItem); //select the mainnet

        expect(setSettingsStorage).toHaveBeenCalledWith({ network: "testnet" });
        expect(setSettingsState).toHaveBeenCalled();
    });
});
