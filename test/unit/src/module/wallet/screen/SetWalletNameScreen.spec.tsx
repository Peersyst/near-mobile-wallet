import { render } from "test-utils";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { translate } from "locale";
import * as UseCreateWalletState from "module/wallet/hook/useCreateWallet";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createMockedUseCreateWallet } from "mocks/useCreateWallet";

describe("SetWalletNameScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(<SetWalletNameScreen onSubmit={() => undefined} submitText="Submit" />);
        expect(screen.getByText(translate("set_wallet_name_text"))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("wallet_name"))).toBeDefined();
        expect(screen.getByText("Submit")).toBeDefined();
    });

    test("Sets name and navigates to set pin", async () => {
        const setName = jest.fn();
        const handleSubmit = jest.fn();
        const mockedCreateWallet = createMockedUseCreateWallet(jest.fn(), setName);
        jest.spyOn(UseCreateWalletState, "default").mockReturnValue(mockedCreateWallet);

        const screen = render(<SetWalletNameScreen onSubmit={handleSubmit} submitText="Submit" />);
        const nameInput = screen.getByPlaceholderText(translate("wallet_name"));
        fireEvent.changeText(nameInput, "Wallet Name");
        const submitButton = screen.getByText("Submit");
        fireEvent.press(submitButton);
        await waitFor(() => expect(setName).toHaveBeenCalledWith("Wallet Name"));
        expect(handleSubmit).toHaveBeenCalled();
    });
});
