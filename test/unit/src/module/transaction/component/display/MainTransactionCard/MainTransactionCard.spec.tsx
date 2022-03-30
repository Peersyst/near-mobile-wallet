import { render } from "test-utils";
import { transaction } from "mocks/transaction";
import MainTransactionCard from "module/transaction/component/display/MainTransactionCard/MainTransactionCard";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<MainTransactionCard {...transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
    });
});
