import { useLoad } from "module/common/query/useLoad";
import * as Recoil from "recoil";
import { renderHook, waitFor } from "test-utils";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import * as UseRecoverWallet from "module/wallet/hook/useRecoverWallets";
import { SettingsStorage } from "module/settings/SettingsStorage";

const renderUseLoad = () =>
    renderHook(() => {
        const loading = useLoad();
        return { loading };
    });

describe("useLoad tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Loads without wallets", async () => {
        jest.spyOn(UseRecoverWallet, "default").mockReturnValue(jest.fn().mockResolvedValue(false));
        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));
    });

    test("Loads with a wallet", async () => {
        jest.spyOn(UseRecoverWallet, "default").mockReturnValue(jest.fn().mockResolvedValue(true));
        const mockedSetSettingsState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetSettingsState);
        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));
        await waitFor(() => expect(mockedSetSettingsState).toBeCalledWith(defaultSettingsState));
    });

    test("Loads with a testnet wallet but without mainnet", async () => {
        const mockedRecover = jest.fn();
        mockedRecover.mockResolvedValueOnce(false);
        mockedRecover.mockResolvedValueOnce(true);
        jest.spyOn(UseRecoverWallet, "default").mockReturnValue(mockedRecover);

        const mockedSetSettingsState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetSettingsState);

        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));
        await waitFor(() => expect(mockedSetSettingsState).toBeCalledWith({ ...defaultSettingsState, network: "testnet" }));
    });
});
