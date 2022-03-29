import { translate } from "locale";
import DaoCardBalance from "module/dao/core/DaoAccountCard/DaoCardBalance/DaoCardBalance";
import { render } from "test-utils";

describe("Dao Card balance test", () => {
    test("Renders correctly", () => {
        const screen = render(<DaoCardBalance availableBalance={"10"} lockedBalance={"2"} currentAPC={"3"} />);
        expect(screen.getByText(translate("available"))).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();
        expect(screen.getByText("000000")).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText("2")).toBeDefined();
        expect(screen.getByText("000")).toBeDefined();
        expect(screen.getByText(translate("current_apc"))).toBeDefined();
        expect(screen.getByText("3%")).toBeDefined();
    });
});
