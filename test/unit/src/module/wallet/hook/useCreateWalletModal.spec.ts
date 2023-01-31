import CreateWalletModal from "module/wallet/component/core/CreateWalletModal/CreateWalletModal";
import { useCreateWalletModal } from "module/wallet/component/core/CreateWalletModal/hook/useCreateWalletModal";
import { UseCreateNewWalletMock, UseModalMock, UseToastMock, WalletMock } from "test-mocks";
import { renderHook } from "test-utils";

export const renderUseCreateWalletModal = () => {
    return renderHook(() => {
        const createWalletModalController = useCreateWalletModal();
        return createWalletModalController;
    }).result.current;
};

describe("useCreateWalletModal tests", () => {
    const { hideModal } = new UseModalMock();
    const { showToast } = new UseToastMock();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Handles close correctly", async () => {
        const { handleClose } = renderUseCreateWalletModal();
        handleClose();
        expect(hideModal).toHaveBeenCalledWith(CreateWalletModal.id);
    });

    test("Creates successfully", async () => {
        const wallet = new WalletMock();
        const { createNewWallet } = new UseCreateNewWalletMock({ wallet });
        const { handleWalletCreation } = renderUseCreateWalletModal();
        await handleWalletCreation();
        expect(createNewWallet).toHaveBeenCalled();
        expect(hideModal).not.toHaveBeenCalledWith(CreateWalletModal.id);
        expect(showToast).not.toHaveBeenCalled();
    });

    test("Creates error handling", async () => {
        const { createNewWallet } = new UseCreateNewWalletMock({ wallet: undefined });
        const { handleWalletCreation } = renderUseCreateWalletModal();
        await handleWalletCreation();
        expect(createNewWallet).toHaveBeenCalled();
        expect(hideModal).toHaveBeenCalledWith(CreateWalletModal.id);
        expect(showToast).toHaveBeenCalled();
    });
});
