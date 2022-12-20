import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import { Chains } from "near-peersyst-sdk";
import { renderHook } from "test-utils";
import * as Recoil from "recoil";
import WalletController from "module/wallet/utils/WalletController";
import { WalletMock } from "test-mocks";

export const renderUseRecoverWallets = () => {
    return renderHook(() => {
        const recoverWallets = useRecoverWallets();
        return recoverWallets;
    }).result.current;
};

describe("useRecoverWallets tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Return false if no have previous wallets", async () => {
        jest.spyOn(WalletController, "recoverWallets").mockResolvedValue({ wallets: [] });
        const recoverWallets = renderUseRecoverWallets();
        const hasPreviousWallet = await recoverWallets(Chains.TESTNET);
        expect(hasPreviousWallet).toBe(false);
    });

    test("Returns true if has wallet and updates state", async () => {
        const wallets = [new WalletMock()];
        const mockedSetState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetState);
        jest.spyOn(WalletController, "recoverWallets").mockResolvedValue({ wallets });
        const recoverWallets = renderUseRecoverWallets();
        const hasPreviousWallet = await recoverWallets(Chains.TESTNET);
        expect(hasPreviousWallet).toBe(true);
        expect(mockedSetState).toHaveBeenCalled();
    });
});
