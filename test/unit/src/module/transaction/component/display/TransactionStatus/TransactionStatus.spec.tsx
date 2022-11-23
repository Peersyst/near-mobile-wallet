import { render, translate } from "test-utils";
import TransactionStatus from "module/transaction/component/display/TransactionStatus/TransactionStatus";
import { TransactionStatus as TransactionStatusType } from "near-peersyst-sdk";

describe("TransactionStatus tests", () => {
    test("Renders pending", () => {
        const screen = render(<TransactionStatus status={TransactionStatusType.PENDING} variant="body1" />);
        expect(screen.getByText(translate(TransactionStatusType.PENDING))).toBeDefined();
    });

    test("Renders proposed", () => {
        const screen = render(<TransactionStatus status={TransactionStatusType.PROPOSED} variant="body1" />);
        expect(screen.getByText(translate(TransactionStatusType.PROPOSED))).toBeDefined();
    });

    test("Renders committed", () => {
        const screen = render(<TransactionStatus status={TransactionStatusType.COMMITTED} variant="body1" />);
        expect(screen.getByText(translate(TransactionStatusType.COMMITTED))).toBeDefined();
    });

    test("Renders rejected", () => {
        const screen = render(<TransactionStatus status={TransactionStatusType.REJECTED} variant="body1" />);
        expect(screen.getByText(translate(TransactionStatusType.REJECTED))).toBeDefined();
    });
});
