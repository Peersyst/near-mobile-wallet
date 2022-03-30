import { render } from "test-utils";
import MainTransactionCard from "module/transaction/component/display/MainTransactionCard/MainTransactionCard";
import { mockedDaoTransaction } from "mocks/daoTransaction";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<MainTransactionCard {...mockedDaoTransaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
    });
});
