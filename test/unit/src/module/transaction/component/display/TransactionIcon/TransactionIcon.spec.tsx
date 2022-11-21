import { render } from "test-utils";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { TransactionType } from "near-peersyst-sdk";

describe("TransactionIcon tests", () => {
    test("Renders SendIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.SEND_NATIVE_TOKEN} />);
        expect(screen.getByTestId("ArrowUpCircleIcon")).toBeDefined();
    });

    test("Renders ReceiveIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.RECEIVE_NATIVE_TOKEN} />);
        expect(screen.getByTestId("ArrowDownCircleIcon")).toBeDefined();
    });

    test("Renders StakeIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.STAKE} />);
        expect(screen.getByTestId("NearIcon")).toBeDefined();
    });

    test("Renders Unstake", () => {
        const screen = render(<TransactionIcon type={TransactionType.UNSTAKE} />);
        expect(screen.getByTestId("NearIcon")).toBeDefined();
    });
});
