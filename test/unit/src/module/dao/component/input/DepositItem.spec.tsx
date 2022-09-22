import DepositItem from "module/dao/component/input/DepositsSelector/DepositItem";
import { render, translate } from "test-utils";

describe("Test for the deposit Item", () => {
    test("Renders correctly", () => {
        const screen = render(
            <DepositItem
                amount={BigInt(1000000000)}
                value={0}
                selectedIndex={0}
                compensation={BigInt(0)}
                remainingCycleMinutes={0}
                unlockable={false}
                type={"deposit"}
            />,
        );
        expect(screen.getAllByText("CKB")).toHaveLength(2);
        expect(screen.getByText("10")).toBeDefined();
        expect(screen.getByText("(APC: 0%)")).toBeDefined();
        expect(screen.getByText(translate("compensation") + ":")).toBeDefined();
        expect(screen.getByText(translate("remaining_time") + ": " + `00 ${translate("hours")}, 00 ${translate("minutes")}`)).toBeDefined();
    });
    test("Renders correctly", () => {
        const screen = render(
            <DepositItem
                amount={BigInt(1000000000)}
                value={0}
                selectedIndex={0}
                compensation={BigInt(100000000)}
                remainingCycleMinutes={0}
                unlockable={true}
                type={"deposit"}
            />,
        );
        expect(screen.getAllByText("CKB")).toHaveLength(2);
        expect(screen.getByText("10")).toBeDefined();
        expect(screen.getByText("(APC: 10%)")).toBeDefined();
        expect(screen.getByText(translate("compensation") + ":")).toBeDefined();
        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText(translate("available"))).toBeDefined();
    });
});
