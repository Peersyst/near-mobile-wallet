import useImportWallets from "module/wallet/hook/useImportWallets";
import WalletController from "module/wallet/utils/WalletController";
import { Chains } from "near-peersyst-sdk";
import { CreateWalletStateMock, UseCreateWalletMock, WalletMock } from "test-mocks";
import { renderHook } from "test-utils";
import * as Recoil from "recoil";

export const renderUseImportWallets = () => {
    return renderHook(() => {
        const importWallets = useImportWallets();
        return importWallets;
    }).result.current;
};

describe("UseImportWallets test", () => {
    test("Calls wallet controller and updates state", async () => {
        const wallets = [new WalletMock()];
        const privateKey = "pK";
        const state = new CreateWalletStateMock({ privateKey });
        new UseCreateWalletMock({ state });
        const mockedImportWallet = jest.fn().mockReturnValue({ wallets });
        jest.spyOn(WalletController, "importWallets").mockImplementation(mockedImportWallet);
        const mockedSetState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetState);
        const importWallet = renderUseImportWallets();
        await importWallet(Chains.TESTNET);
        expect(mockedImportWallet).toHaveBeenCalledWith(Chains.TESTNET, state.pin, state.mnemonic?.join(" "), privateKey);
        expect(mockedSetState).toHaveBeenCalled();
    });
});
