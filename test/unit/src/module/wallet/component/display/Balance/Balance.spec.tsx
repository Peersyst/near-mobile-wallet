import Balance from "module/wallet/component/display/Balance/Balance";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { render } from "test-utils";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance balance={"100"} variant={"body2Strong"} />);
        expect(screen.getByText("100")).toBeDefined();
    });
    test("Renders correctly near", () => {
        const screen = render(<Balance balance={"100"} variant={"body2Strong"} units="token" />);
        expect(screen.getByText("100 NEAR")).toBeDefined();
    });
    test("Renders correctly eur", () => {
        const screen = render(<Balance balance={"100"} variant={"body2Strong"} units="eur" />);
        expect(screen.getByText("100 " + CURRENCY_UNIT["eur"])).toBeDefined();
    });
    test("Renders correctly dollar", () => {
        const screen = render(<Balance balance={"100"} variant={"body2Strong"} units="usd" action="add" />);
        expect(screen.getByText(ACTION_LABEL["add"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
    test("Renders correctly round", () => {
        const screen = render(<Balance action="round" balance={"100"} variant={"body2Strong"} units="usd" />);
        expect(screen.getByText(ACTION_LABEL["round"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
    test("Renders correctly when loading", () => {
        const screen = render(<Balance balance={"100"} variant={"body2Strong"} isLoading />);
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
    });
});
