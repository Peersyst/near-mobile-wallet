import TokenAmountInput from "module/transaction/component/input/AssetAmountInput/TokenAmountInput/TokenAmountInput";
import { TokenMetadataMock, TokenMock } from "test-mocks";
import { render, screen, fireEvent, translate } from "test-utils";

describe("TokenAmountInput Test", () => {
    test("Renders and validates correctly", () => {
        const metadata = new TokenMetadataMock({ symbol: "PUNKS" });
        const ft = new TokenMock({ balance: "10", metadata });
        render(<TokenAmountInput placeholder="Enter amount" ft={ft} />);
        //Wait untill the balance is loaded
        expect(screen.getByText("PUNKS")).toBeDefined();
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.changeText(input, "11");
        expect(screen.getByText(translate("invalid_number_lt", { n: "10 PUNKS", ns: "error" }))).toBeDefined();
        fireEvent.changeText(input, "9.99995");
        expect(screen.queryByText(translate("invalid_number_lt", { n: "10 PUNKS", ns: "error" }))).toBeNull();
        fireEvent.changeText(input, "0");
        expect(screen.getByText(translate("invalid_number_gt", { n: "0 PUNKS", ns: "error" }))).toBeDefined();
    });
});
