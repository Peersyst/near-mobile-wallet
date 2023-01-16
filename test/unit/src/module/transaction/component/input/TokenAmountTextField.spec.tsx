import TokenAmountTextField from "module/transaction/component/input/AssetAmountTextField/TokenAmountTextField/TokenAmountTextField";
import { TokenMetadataMock, TokenMock } from "test-mocks";
import { render, screen, fireEvent, translate } from "test-utils";

describe("TokenAmountTextField Test", () => {
    test("Renders and validates correctly", () => {
        const metadata = new TokenMetadataMock({ symbol: "PUNKS" });
        const ft = new TokenMock({ balance: "10", metadata });
        render(<TokenAmountTextField placeholder="Enter amount" token={ft} />);
        //Wait untill the balance is loaded
        expect(screen.getByText("PUNKS")).toBeDefined();
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.changeText(input, "11");
        expect(screen.getByText(translate("invalid_number_lte", { n: "10 PUNKS", ns: "error" }))).toBeDefined();
        fireEvent.changeText(input, "9.99995");
        expect(screen.queryByText(translate("invalid_number_lt", { n: "10 PUNKS", ns: "error" }))).toBeNull();
        fireEvent.changeText(input, "0");
        expect(screen.getByText(translate("invalid_number_gt", { n: "0 PUNKS", ns: "error" }))).toBeDefined();
    });
});
