import { translate } from "locale";
import { MockedUnlockableAmounts } from "mocks/DAO";
import WithdrawButton from "module/dao/screen/SelectAccountAndDepositScreen/WithdrawButton";
import { render } from "test-utils";
import * as UseUncommittedTransaction from "module/transaction/hook/useUncommittedTransaction";

describe("Test for the withdraw button", () => {
    beforeAll(() => {
        jest.spyOn(UseUncommittedTransaction, "default").mockReturnValue(false);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with a selected deposit", () => {
        const screen = render(
            <WithdrawButton unlockableDeposits={MockedUnlockableAmounts} buttonLoading={false} selectedDeposit={0} errMsg={undefined} />,
        );
        expect(screen.getByText(translate("withdraw"))).toBeDefined();
    });
    test("Renders correctly with a selected withdraw unlockable", () => {
        const screen = render(
            <WithdrawButton unlockableDeposits={MockedUnlockableAmounts} buttonLoading={false} selectedDeposit={1} errMsg={undefined} />,
        );
        expect(screen.getByText(translate("unlock"))).toBeDefined();
    });
    test("Renders correctly with a selected withdraw non-unlockable", () => {
        const screen = render(
            <WithdrawButton unlockableDeposits={MockedUnlockableAmounts} buttonLoading={false} selectedDeposit={2} errMsg={undefined} />,
        );
        expect(screen.getByText(translate("remaining_time") + ": " + `00 ${translate("hours")}, 45 ${translate("minutes")}`)).toBeDefined();
    });
});
