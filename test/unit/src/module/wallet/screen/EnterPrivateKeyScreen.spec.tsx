import { render, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { MOCKED_PK, UseCreateWalletMock } from "test-mocks";
import EnterPrivateKeyScreen from "module/wallet/screen/EnterPrivateKeyScreen/EnterPrivateKeyScreen";
import { NearSDKService } from "near-peersyst-sdk";

describe("EnterPrivateKetScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Enters privateKey correctly", async () => {
        const handleSubmit = jest.fn();
        const { setPrivateKey } = new UseCreateWalletMock();
        jest.spyOn(NearSDKService, "isSecretKeyValid").mockReturnValue(true);
        const screen = render(<EnterPrivateKeyScreen onSubmit={handleSubmit} submitText={translate("set_pin")} />);
        const button = screen.getByText(translate("set_pin"));
        const input = screen.getByPlaceholderText(translate("enter_private_key"));
        expect(input).toBeDefined();
        fireEvent.changeText(input, MOCKED_PK);
        expect(button).toBeDefined();
        fireEvent.press(button);
        await waitFor(() => expect(setPrivateKey).toBeCalled());
    });
});
