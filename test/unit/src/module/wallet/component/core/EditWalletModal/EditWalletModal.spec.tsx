import * as UseWallet from "module/wallet/hook/useWallet";
import * as UseEditWallet from "module/wallet/hook/useEditWallet";
import { wallet } from "mocks/wallet";
import { render, SuccessApiCall, translate } from "test-utils";
import EditWalletModal from "module/wallet/component/core/EditWalletModal/EditWalletModal";
import { fireEvent, waitFor } from "@testing-library/react-native";
import createEditWalletMock, { useEditWalletMock } from "mocks/useEditWallet";
import * as Genesys from "@peersyst/react-native-components";
import { WalletStorage } from "module/wallet/WalletStorage";

describe("EditWallet tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
    });

    test("Renders correctly", () => {
        jest.spyOn(UseEditWallet, "default").mockReturnValue(useEditWalletMock);
        const screen = render(<EditWalletModal index={0} />);

        expect(screen.getByText(translate("edit_wallet")));
        expect(screen.getByDisplayValue(wallet.name));
    });

    test("Wallet is edited and saved correctly", async () => {
        const setName = jest.fn();
        const setColorIndex = jest.fn();
        jest.spyOn(UseEditWallet, "default").mockReturnValue(
            createEditWalletMock({
                setName,
                setColorIndex,
            }),
        );
        const showToast = jest.fn();
        jest.spyOn(Genesys, "useToast").mockReturnValue({
            showToast,
            hideToast: jest.fn(),
            toastActive: false,
        });
        const editWallet = jest.spyOn(WalletStorage, "editWallet").mockReturnValue(SuccessApiCall(undefined));

        const screen = render(<EditWalletModal index={0} />);

        expect(screen.getByText(translate("edit_wallet")));

        fireEvent.changeText(screen.getByDisplayValue(wallet.name), "New name");
        expect(setName).toHaveBeenCalledWith("New name");
        fireEvent.press(screen.getAllByRole("button")[5]);
        expect(setColorIndex).toHaveBeenCalledWith(3);

        fireEvent.press(screen.getByText(translate("save")));
        expect(editWallet).toHaveBeenCalledWith(0, expect.any(Object));
        await waitFor(() => expect(showToast).toHaveBeenCalledWith(translate("wallet_edited"), { type: "success" }));
    });

    test("Wallet is edited and then cancelled", async () => {
        const setName = jest.fn();
        const setColorIndex = jest.fn();
        const reset = jest.fn();
        jest.spyOn(UseEditWallet, "default").mockReturnValue(
            createEditWalletMock({
                setName,
                setColorIndex,
                reset,
            }),
        );

        const screen = render(<EditWalletModal index={0} />);

        expect(screen.getByText(translate("edit_wallet")));

        fireEvent.changeText(screen.getByDisplayValue(wallet.name), "New name");
        expect(setName).toHaveBeenCalledWith("New name");
        fireEvent.press(screen.getAllByRole("button")[5]);
        expect(setColorIndex).toHaveBeenCalledWith(3);

        fireEvent.press(screen.getByText(translate("cancel")));
        expect(reset).toHaveBeenCalled();
    });
});
