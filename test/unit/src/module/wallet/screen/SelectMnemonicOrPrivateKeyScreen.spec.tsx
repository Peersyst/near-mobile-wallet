import { render, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { UseCreateWalletMock } from "test-mocks";
import { NearSDKService } from "near-peersyst-sdk";
import SelectMnemonicOrPrivateKeyScreen from "module/wallet/screen/SelectMnemonicOrPrivateKeyScreen/SelectMnemonicOrPrivateKeyScreen";

describe("SelectMnemonicOrPrivateKeyScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Selects mnemonic", async () => {
        const handleSubmit = jest.fn();
        const { setImportWithPrivateKey } = new UseCreateWalletMock();
        jest.spyOn(NearSDKService, "isSecretKeyValid").mockReturnValue(true);
        const screen = render(<SelectMnemonicOrPrivateKeyScreen onSubmit={handleSubmit} />);
        const button = screen.getByText(translate("import_with_mnemonic"));
        fireEvent.press(button);
        await waitFor(() => expect(setImportWithPrivateKey).toBeCalledWith(false));
    });
    test("Selects privateKey", async () => {
        const handleSubmit = jest.fn();
        const { setImportWithPrivateKey } = new UseCreateWalletMock();
        jest.spyOn(NearSDKService, "isSecretKeyValid").mockReturnValue(true);
        const screen = render(<SelectMnemonicOrPrivateKeyScreen onSubmit={handleSubmit} />);
        const button = screen.getByText(translate("import_with_private_key"));
        fireEvent.press(button);
        await waitFor(() => expect(setImportWithPrivateKey).toBeCalledWith(true));
    });
});
