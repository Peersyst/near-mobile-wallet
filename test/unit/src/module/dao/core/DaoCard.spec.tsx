import { translate } from "locale";
import DaoCard from "module/dao/core/DaoAccountCard/DaoCard";
import { render } from "test-utils";

describe("Test for the Dao Card", () => {
    test("Renders correctly", () => {
        const screen = render(<DaoCard />);
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        expect(screen.getByText("12,635")).toBeDefined();
        expect(screen.getByText("304223")).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText("594")).toBeDefined();
        expect(screen.getByText("323")).toBeDefined();
        expect(screen.getByText(translate("current_apc"))).toBeDefined();
        expect(screen.getByText("2.4%")).toBeDefined();

        //Buttons
        expect(screen.getByText(translate("deposit"))).toBeDefined();
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
        expect(screen.getByText(translate("withdraw"))).toBeDefined();

        //Header
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledDAOIcon"));
        expect(screen.getByTestId("DAOIcon"));
    });
});
