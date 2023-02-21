import { MnemonicMocked } from "mocks/MnemonicMocked";
import useImportWalletModal from "module/wallet/component/core/ImportWalletModal/hook/useImportWalletModal";
import {
    UseCreateWalletMock,
    UseImportWalletsMock,
    UseModalMock,
    UseToastMock,
    WalletMock,
    CreateWalletStateMock,
    WalletsMock,
} from "test-mocks";
import { renderHook, translate, waitFor } from "test-utils";
import { Keyboard } from "react-native";
import ImportWalletModal from "module/wallet/component/core/ImportWalletModal/ImportWalletModal";

export const renderUseImportWalletModal = () => {
    return renderHook(() => {
        const importWalletModal = useImportWalletModal();
        return importWalletModal;
    }).result.current;
};

describe("useImportWalletModal tests", () => {
    const { hideModal } = new UseModalMock();
    const { showToast } = new UseToastMock();

    const mockedKeyboard = jest.spyOn(Keyboard, "dismiss");

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Imports one wallet successfully", async () => {
        jest.useFakeTimers();
        const wallet = new WalletMock();
        const { importWallets } = new UseImportWalletsMock({ wallets: [wallet] });
        const { handleWalletCreation } = renderUseImportWalletModal();
        await handleWalletCreation();
        expect(importWallets).toHaveBeenCalled();
        expect(mockedKeyboard).toHaveBeenCalled();
        expect(hideModal).toHaveBeenCalledWith(ImportWalletModal.id);
        jest.runAllTimers();
        await waitFor(() => expect(showToast).toHaveBeenCalledWith(translate("import_success_one"), { type: "success" }));
        jest.useRealTimers();
    });

    test("Imports multiple wallets successfully", async () => {
        jest.useFakeTimers();
        const wallets = new WalletsMock({ length: 4 }).wallets;
        const { importWallets } = new UseImportWalletsMock({ wallets });
        const { handleWalletCreation } = renderUseImportWalletModal();
        await handleWalletCreation();
        expect(importWallets).toHaveBeenCalled();
        expect(mockedKeyboard).toHaveBeenCalled();
        expect(hideModal).toHaveBeenCalledWith(ImportWalletModal.id);
        jest.runAllTimers();
        await waitFor(() => expect(showToast).toHaveBeenCalledWith(translate("import_success_other"), { type: "success" }));
        jest.useRealTimers();
    });

    test("Tries to create import a wallet with a mnemonic that already was in the storage ", async () => {
        const createState = new CreateWalletStateMock({ mnemonic: MnemonicMocked.split(" ") });
        new UseCreateWalletMock({ state: createState });
        jest.useFakeTimers();
        const { importWallets } = new UseImportWalletsMock({ wallets: [] });
        const { handleWalletCreation } = renderUseImportWalletModal();
        await handleWalletCreation();
        expect(importWallets).toHaveBeenCalled();
        expect(mockedKeyboard).toHaveBeenCalled();
        expect(hideModal).toHaveBeenCalledWith(ImportWalletModal.id);
        jest.runAllTimers();
        await waitFor(() =>
            expect(showToast).toHaveBeenCalledWith(translate("mnemonic_already_exists", { ns: "error" }), { type: "info" }),
        );
        jest.useRealTimers();
    });
});
