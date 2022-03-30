import { render } from "test-utils";
import { transaction } from "mocks/transaction";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TransactionCard {...transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00"));
    });
});
