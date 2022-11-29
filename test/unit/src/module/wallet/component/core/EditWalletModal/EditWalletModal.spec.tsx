import * as UseEditWallet from "module/wallet/hook/useEditWallet";
import { render, SuccessApiCall, translate } from "test-utils";
import EditWalletModal from "module/wallet/component/core/EditWalletModal/EditWalletModal";
import { fireEvent, waitFor } from "@testing-library/react-native";
import createEditWalletMock, { useEditWalletMock } from "mocks/useEditWallet";
import * as Genesys from "@peersyst/react-native-components";
import { WalletStorage } from "module/wallet/WalletStorage";
import { UseWalletMock } from "mocks/common/wallet/useWallet.mock";

describe("EditWallet tests", () => {
    new UseWalletMock();

    test("Renders correctly", () => {
        jest.spyOn(UseEditWallet, "default").mockReturnValue(useEditWalletMock);
        const screen = render(<EditWalletModal index={0} />);
        expect(screen.getByText(translate("edit_wallet")));
    });

    test("Wallet is edited and saved correctly", async () => {
        const setColorIndex = jest.fn();
        jest.spyOn(UseEditWallet, "default").mockReturnValue(
            createEditWalletMock({
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

        fireEvent.press(screen.getAllByRole("button")[5]);
        expect(setColorIndex).toHaveBeenCalledWith(3);

        fireEvent.press(screen.getByText(translate("save")));
        expect(editWallet).toHaveBeenCalledWith(0, expect.any(Object));
        await waitFor(() => expect(showToast).toHaveBeenCalledWith(translate("wallet_edited"), { type: "success" }));
    });

    test("Wallet is edited and then cancelled", async () => {
        const setColorIndex = jest.fn();
        const reset = jest.fn();
        jest.spyOn(UseEditWallet, "default").mockReturnValue(
            createEditWalletMock({
                setColorIndex,
                reset,
            }),
        );

        const screen = render(<EditWalletModal index={0} />);

        expect(screen.getByText(translate("edit_wallet")));

        fireEvent.press(screen.getAllByRole("button")[5]);
        expect(setColorIndex).toHaveBeenCalledWith(3);

        fireEvent.press(screen.getByText(translate("cancel")));
        expect(reset).toHaveBeenCalled();
    });
});
