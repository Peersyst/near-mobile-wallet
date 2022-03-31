import DaoTransactionIcon from "module/dao/component/display/DaoTransactionIcon";
import { render } from "test-utils";

describe("Test for the Dao tx icons", () => {
    test("Renders deposit correctly", () => {
        const screen = render(<DaoTransactionIcon isDeposit={true} />);
        expect(screen.getByTestId("DAODepositIcon"));
    });
    test("Renders withdraw correctly", () => {
        const screen = render(<DaoTransactionIcon isDeposit={false} />);
        expect(screen.getByTestId("DAOWithdrawIcon"));
    });
});
