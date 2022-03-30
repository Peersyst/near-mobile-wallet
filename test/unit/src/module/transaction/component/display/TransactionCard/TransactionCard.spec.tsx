import { render } from "test-utils";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { transaction } from "mocks/transaction";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TransactionCard {...transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00"));
    });
});
