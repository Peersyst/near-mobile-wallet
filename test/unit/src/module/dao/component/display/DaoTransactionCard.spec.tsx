import { render } from "test-utils";
import { mockedDaoTransaction } from "mocks/daoTransaction";
import DaoTransactionCard from "module/dao/component/display/DaoTransactionCard";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<DaoTransactionCard {...mockedDaoTransaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
    });
});
