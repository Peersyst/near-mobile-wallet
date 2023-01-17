import NEARAmountWithMaxTextField from "module/transaction/component/input/NEARAmountWithMaxTextField/NEARAmountWithMaxTextField";
import { AccountBalanceMock, UseGetBalanceMock } from "test-mocks";
import { fireEvent, render, screen, waitFor } from "test-utils";

describe("NEARAmountWithMaxTextField Test", () => {
    test("Renders and validates correctly", async () => {
        const balance = new AccountBalanceMock({ available: "10" });
        new UseGetBalanceMock({ balance });
        render(<NEARAmountWithMaxTextField index={0} placeholder="Enter amount" available="8" />);
        //Spinner until the balance is loaded
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        //Wait untill the balance is loaded
        await waitFor(() => expect(screen.getByText("Max")).toBeDefined());
        const maxButton = screen.getByText("Max");
        fireEvent.press(maxButton);
        expect(screen.getByText("7.9995")).toBeDefined();
    });
});
