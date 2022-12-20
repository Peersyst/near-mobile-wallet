import { render } from "test-utils";
import ActionIcon from "module/transaction/component/display/ActionIcon/ActionIcon";
import { TransactionType } from "near-peersyst-sdk";

describe("ActionIcon tests", () => {
    test("Renders SendIcon", () => {
        const screen = render(<ActionIcon type={TransactionType.SEND_NATIVE_TOKEN} />);
        expect(screen.getByTestId("ArrowUpCircleIcon")).toBeDefined();
    });

    test("Renders ReceiveIcon", () => {
        const screen = render(<ActionIcon type={TransactionType.RECEIVE_NATIVE_TOKEN} />);
        expect(screen.getByTestId("ArrowDownCircleIcon")).toBeDefined();
    });

    test("Renders StakeIcon", () => {
        const screen = render(<ActionIcon type={TransactionType.STAKE} />);
        expect(screen.getByTestId("NearIcon")).toBeDefined();
    });

    test("Renders Unstake", () => {
        const screen = render(<ActionIcon type={TransactionType.UNSTAKE} />);
        expect(screen.getByTestId("NearIcon")).toBeDefined();
    });
});
