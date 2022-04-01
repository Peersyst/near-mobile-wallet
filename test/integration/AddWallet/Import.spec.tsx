import { render, SuccessApiCall } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { translate } from "locale";
import * as GenerateMnemonic from "module/wallet/mock/generateMnemonic";
import { StorageWallet, WalletStorage } from "module/wallet/WalletStorage";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import createUseWalletStateMock from "mocks/useWalletState";
import ImportWalletModal from "module/wallet/component/core/ImportWalletModal/ImportWalletModal";

describe("AddWallet - Import", () => {
    jest.setTimeout(20000);
    test("Adds a created wallet successfully", async () => {
        jest.spyOn(GenerateMnemonic, "default").mockReturnValue(["Pizza", "Taco", "Fries"]);
        const addWalletToStorage = jest
            .spyOn(WalletStorage, "addWallet")
            .mockImplementation((wallet: Omit<StorageWallet, "index">) => SuccessApiCall({ ...wallet, index: 1 }));
        const setWalletState = jest.fn();
        jest.spyOn(UseWalletState, "default").mockReturnValue(createUseWalletStateMock({ setState: setWalletState }));

        const screen = render(<ImportWalletModal />);

        fireEvent.changeText(screen.getByPlaceholderText(translate("wallet_name")), "New wallet");
        fireEvent.press(screen.getByText(translate("next")));

        await waitFor(() => expect(screen.getByText(translate("mnemonic"))).toBeDefined());
        const mnemonicInput = screen.getByPlaceholderText(translate("add_a_word"));
        const mnemonic = [...Array(12)].map((_, i) => String.fromCharCode(i + 65));
        mnemonic.forEach((word) => {
            fireEvent.changeText(mnemonicInput, word);
            fireEvent(mnemonicInput, "submitEditing", { nativeEvent: { text: word } });
        });
        fireEvent.press(screen.getAllByText(translate("import_wallet"))[1]);

        await waitFor(() =>
            expect(addWalletToStorage).toHaveBeenCalledWith({
                name: "New wallet",
                mnemonic: mnemonic,
                colorIndex: undefined,
            }),
        );
        await waitFor(() => expect(setWalletState).toHaveBeenCalled());
    });
});
