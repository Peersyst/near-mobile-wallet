import Button from "module/common/component/input/Button/Button";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { UseToastMock, WalletMock } from "test-mocks";
import { fireEvent, render, SuccessApiCall, translate, waitFor, screen } from "test-utils";
import * as UseImportWallets from "module/wallet/hook/useImportWallets";
import * as UseCreateNewWallet from "module/wallet/hook/useCreateNewWallet";

describe("AddWalletModal tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        render(<AddWalletModal title="Add wallet">{() => <></>}</AddWalletModal>);
        expect(screen.getByText("Add wallet"));
    });

    describe("Import wallet methods", () => {
        test("Imports a wallet successfully", async () => {
            const handleClose = jest.fn();
            const handleExited = jest.fn();
            const mockedImportWallets = jest.fn().mockReturnValue(SuccessApiCall([new WalletMock()]));
            const { showToast } = new UseToastMock();
            jest.spyOn(UseImportWallets, "default").mockReturnValue(mockedImportWallets);
            render(
                <AddWalletModal title="Add wallet" onClose={handleClose} onExited={handleExited} imported>
                    {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
                </AddWalletModal>,
            );
            fireEvent.press(screen.getByText("Add Wallet"));
            await waitFor(() => expect(mockedImportWallets).toHaveBeenCalled());
            expect(handleClose).toHaveBeenCalledWith();
            expect(showToast).toHaveBeenCalledWith(translate("import_success_one"), { type: "success" });
        });

        test("Imports 2 wallets successfully", async () => {
            const handleClose = jest.fn();
            const handleExited = jest.fn();
            const mockedImportWallets = jest.fn().mockReturnValue(SuccessApiCall([new WalletMock(), new WalletMock()]));
            const { showToast } = new UseToastMock();
            jest.spyOn(UseImportWallets, "default").mockReturnValue(mockedImportWallets);
            render(
                <AddWalletModal title="Add wallet" onClose={handleClose} onExited={handleExited} imported>
                    {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
                </AddWalletModal>,
            );
            fireEvent.press(screen.getByText("Add Wallet"));
            await waitFor(() => expect(mockedImportWallets).toHaveBeenCalled());
            expect(handleClose).toHaveBeenCalledWith();
            expect(showToast).toHaveBeenCalledWith(translate("import_success_other"), { type: "success" });
        });

        test("Tries to import a wallet that already has", async () => {
            const handleClose = jest.fn();
            const handleExited = jest.fn();
            const mockedImportWallets = jest.fn().mockReturnValue(SuccessApiCall([]));
            const { showToast } = new UseToastMock();
            jest.spyOn(UseImportWallets, "default").mockReturnValue(mockedImportWallets);
            render(
                <AddWalletModal title="Add wallet" onClose={handleClose} onExited={handleExited} imported>
                    {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
                </AddWalletModal>,
            );
            fireEvent.press(screen.getByText("Add Wallet"));
            await waitFor(() => expect(mockedImportWallets).toHaveBeenCalled());
            expect(handleClose).toHaveBeenCalledWith();
            expect(showToast).not.toHaveBeenCalled();
        });
    });

    describe("Create wallet methods", () => {
        test("Creates a wallet successfully", async () => {
            const handleClose = jest.fn();
            const handleExited = jest.fn();
            const wallet = new WalletMock();
            const mockedCreateWallet = jest.fn().mockResolvedValue(wallet);
            jest.spyOn(UseCreateNewWallet, "default").mockReturnValue(mockedCreateWallet);
            render(
                <AddWalletModal title="Add wallet" onClose={handleClose} onExited={handleExited}>
                    {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
                </AddWalletModal>,
            );
            fireEvent.press(screen.getByText("Add Wallet"));
            expect(mockedCreateWallet).toHaveBeenCalled();
            expect(handleClose).not.toHaveBeenCalledWith();
        });

        test("Handles error successfully", async () => {
            const handleClose = jest.fn();
            const handleExited = jest.fn();
            const mockedCreateWallet = jest.fn().mockResolvedValue(undefined);
            const { showToast } = new UseToastMock();
            jest.spyOn(UseCreateNewWallet, "default").mockReturnValue(mockedCreateWallet);
            render(
                <AddWalletModal title="Add wallet" onClose={handleClose} onExited={handleExited}>
                    {(handleWalletCreation) => <Button onPress={handleWalletCreation}>Add Wallet</Button>}
                </AddWalletModal>,
            );
            fireEvent.press(screen.getByText("Add Wallet"));
            expect(mockedCreateWallet).toHaveBeenCalled();
            await waitFor(() =>
                expect(showToast).toHaveBeenCalledWith(translate("error_creating_account", { ns: "error" }), { type: "error" }),
            );
            expect(handleClose).toHaveBeenCalledWith();
        });
    });
});
