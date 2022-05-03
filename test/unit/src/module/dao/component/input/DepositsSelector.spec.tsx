import { MockedUnlockableAmounts } from "mocks/DAO";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";
import { fireEvent, render, waitFor } from "test-utils";

describe("Despoist selector test", () => {
    test("Renders correctly", async () => {
        const screen = render(<DepositsSelector deposits={MockedUnlockableAmounts} />);
        expect(screen.getAllByText("500")).toHaveLength(4);
        const deposit = screen.getByText("50");
        fireEvent.press(deposit);
        await waitFor(() => expect(screen.getAllByText("50")).toHaveLength(2));
    });
});
