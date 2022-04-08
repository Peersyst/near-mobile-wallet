import { MockedUnlockableAmounts } from "mocks/DAO";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";
import { fireEvent, render, waitFor } from "test-utils";

describe("Despoist selector test", () => {
    test("Renders correctly", () => {
        const screen = render(<DepositsSelector deposits={MockedUnlockableAmounts} />);
        expect(screen.getAllByText("12,345")).toHaveLength(2);
        expect(screen.getByText("50")).toBeDefined();
    });
    test("Renders correctly", async () => {
        const screen = render(<DepositsSelector deposits={MockedUnlockableAmounts} />);
        const deposit = screen.getByText("50");
        expect(screen.getAllByText("12,345")).toHaveLength(2);
        fireEvent.press(deposit);
        await waitFor(() => expect(screen.getAllByText("50")).toHaveLength(2));
    });
});
