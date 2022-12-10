import { render, translate, screen } from "test-utils";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { UseCreateWalletMock, UseServiceInstanceMock } from "test-mocks";

describe("SetWalletNameScreen tests", () => {
    test("Renders correctly", () => {
        render(<SetWalletNameScreen onSubmit={() => undefined} submitText="Submit" />);
        expect(screen.getByText(translate("enter_your_custom_address"))).toBeDefined();
        expect(screen.getByText("Submit")).toBeDefined();
    });

    test("Sets name and navigates to set pin", async () => {
        const handleSubmit = jest.fn();
        const { setName } = new UseCreateWalletMock();
        const { serviceInstance } = new UseServiceInstanceMock();

        render(<SetWalletNameScreen onSubmit={handleSubmit} submitText="Submit" />);
        const nameInput = screen.getByPlaceholderText("mycooldid");
        expect(nameInput).toBeDefined();

        //Tries with an name that is not available
        jest.spyOn(serviceInstance, "nameIsChoosalbe").mockResolvedValueOnce(false);
        fireEvent.changeText(nameInput, "cacatua");
        expect(screen.queryByText(translate("name_available", { name: "cacatua.near" }))).toBeNull();
        await waitFor(() => expect(serviceInstance.nameIsChoosalbe).toHaveBeenCalledWith("cacatua.near"));

        //Tries with an name that is available
        jest.spyOn(serviceInstance, "nameIsChoosalbe").mockResolvedValueOnce(true);
        fireEvent.changeText(nameInput, "holacaracola");
        await waitFor(() => expect(screen.getByText(translate("name_available", { name: "holacaracola.near" }))).toBeDefined());
        expect(serviceInstance.nameIsChoosalbe).toHaveBeenCalledWith("holacaracola.near");

        //Sets state and submits
        const submitButton = screen.getByText("Submit");
        fireEvent.press(submitButton);
        await waitFor(() => expect(setName).toHaveBeenCalledWith("holacaracola.near"));
        expect(handleSubmit).toHaveBeenCalled();
    });
});
