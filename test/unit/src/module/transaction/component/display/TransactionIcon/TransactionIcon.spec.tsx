import { render } from "test-utils";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { TransactionType } from "ckb-peersyst-sdk";

describe("TransactionIcon tests", () => {
    test("Renders SendIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.SEND_NATIVE_TOKEN} />);
        expect(screen.getByTestId("ArrowUpCircleIcon")).toBeDefined();
    });

    test("Renders ReceiveIcon", () => {
        const screen = render(<TransactionIcon type={TransactionType.RECEIVE_NATIVE_TOKEN} />);
        expect(screen.getByTestId("ArrowDownCircleIcon")).toBeDefined();
    });
});
