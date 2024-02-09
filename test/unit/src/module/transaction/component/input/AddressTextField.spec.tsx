import AddressTextField from "module/transaction/component/input/AddressTextField/AddressTextField";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("AddressTextField Test", () => {
    test("Renders and validates correctly", async () => {
        new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        jest.spyOn(serviceInstance, "acccountIsValidReceivingAccount").mockResolvedValue(true);
        render(<AddressTextField defaultValue="manolo.testnet" />);

        const input = screen.getByPlaceholderText(translate("address"));
        expect(input).toBeDefined();
        //Loading because of the default value
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();

        //Update the input because of an invalid name
        fireEvent.changeText(input, "m");
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        expect(input.props.value).toBe("m");
        await waitFor(() => {
            screen.getByText(translate("invalid_address", { ns: "error" }));
        });
        expect(screen.queryByTestId("ActivityIndicator")).toBeNull();
    });
});
