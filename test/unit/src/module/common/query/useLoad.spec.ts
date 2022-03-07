import { useLoad } from "module/common/query/useLoad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useRecoilValue } from "recoil";
import { renderHook, waitFor } from "test-utils";
import walletState from "module/wallet/state/WalletState";

const renderUseLoad = () =>
    renderHook(() => {
        const loading = useLoad();
        const { hasWallet, name, isAuthenticated } = useRecoilValue(walletState);
        return { loading, hasWallet, name, isAuthenticated };
    });

describe("useLoad tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Loads without wallet", async () => {
        const getAuthToken = jest.spyOn(WalletStorage, "getName").mockImplementation(() => new Promise((resolve) => resolve(undefined)));

        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.name).toBeUndefined();
        expect(result.current.hasWallet).toBe(false);
    });

    test("Loads with wallet", async () => {
        const getAuthToken = jest.spyOn(WalletStorage, "getName").mockImplementation(() => new Promise((resolve) => resolve("wallet")));

        const { result } = renderUseLoad();
        expect(result.current.loading).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.hasWallet).toBe(true);
        expect(result.current.name).toEqual("wallet");
    });
});
