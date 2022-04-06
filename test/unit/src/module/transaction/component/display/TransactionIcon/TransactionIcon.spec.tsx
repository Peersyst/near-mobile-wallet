import { render } from "test-utils";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { TransactionType } from "module/transaction/types";

describe("TransactionIcon tests", () => {
    test("Renders SendIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.SEND_CKB} />);
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        screen.rerender(<TransactionIcon type={TransactionType.SEND_TOKEN} />);
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        screen.rerender(<TransactionIcon type={TransactionType.SEND_NFT} />);
        expect(screen.getByTestId("SendIcon")).toBeDefined();
    });

    test("Renders ReceiveIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.RECEIVE_CKB} />);
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        screen.rerender(<TransactionIcon type={TransactionType.RECEIVE_TOKEN} />);
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        screen.rerender(<TransactionIcon type={TransactionType.RECEIVE_NFT} />);
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
    });

    test("Renders DAODepositIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.DEPOSIT_DAO} />);
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
    });

    test("Renders DAOWithdrawIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.WITHDRAW_DAO} />);
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
    });

    test("Renders SmartContractIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.SMART_CONTRACT} />);
        expect(screen.getByTestId("SmartContractIcon")).toBeDefined();
    });

    test("Renders UnlockDAOIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.UNLOCK_DAO} />);
        expect(screen.getByTestId("UnlockDAOIcon")).toBeDefined();
    });
});
