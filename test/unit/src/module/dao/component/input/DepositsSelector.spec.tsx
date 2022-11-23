import { MockedUnlockableAmounts } from "mocks/DAO";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";
import { fireEvent, render } from "test-utils";

describe("Despoist selector test", () => {
    test("Renders correctly", async () => {
        const screen = render(<DepositsSelector deposits={MockedUnlockableAmounts} />);
        const item = screen.getByText("500");
        expect(item).toBeDefined();
        fireEvent.press(item);
        const newDeposit = screen.getByText("50");
        fireEvent.press(newDeposit);
        expect(screen.getAllByText("50")).toHaveLength(2);
    });
});
