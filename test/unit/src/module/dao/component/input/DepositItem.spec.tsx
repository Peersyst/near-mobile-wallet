import DepositItem from "module/dao/component/input/DepositsSelector/DepositItem";
import { render } from "test-utils";

describe("Test for the deposit Item", () => {
    test("Renders correctly", () => {
        const screen = render(<DepositItem amount={BigInt(10)} value={0} selectedIndex={0} />);
        expect(screen.getByText("CKB")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();
    });
});
