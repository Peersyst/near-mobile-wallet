import SelectNetwork from "module/settings/components/core/SelectNetwork/SelectNetwork";
import { fireEvent, render, translate, waitFor } from "test-utils";
import * as Recoil from "recoil";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import { UseConfigMock } from "mocks/genesys/useConfig/useConfig.mock";

describe("Test for the select network", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test("Returns correctly", () => {
        const screen = render(<SelectNetwork />);
        expect(screen.getByText(translate("select_your_network"))).toBeDefined();
        expect(screen.getByText(translate("network_name", { name: capitalize(defaultSettingsState.network) }))).toBeDefined();
    });
    test("Change the network correctly", async () => {
        new UseConfigMock({ config: { enableChangeNetwork: true } });
        const setSettingsState = jest.fn();
        const mockedRecoilState = [{ ...defaultSettingsState, network: Chains.MAINNET }, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectNetwork />);
        const defaultItem = screen.getByText(translate("network_name", { name: "Mainnet" }));
        fireEvent.press(defaultItem); //open modal
        const newNetworkItem = await screen.findByText(translate("network_name", { name: "Testnet" }));
        fireEvent.press(newNetworkItem); //select the mainnet
        //Opens the modal
        await waitFor(() => {
            expect(screen.getByText(translate("recovering_accounts"))).toBeDefined();
        });
    });
});
