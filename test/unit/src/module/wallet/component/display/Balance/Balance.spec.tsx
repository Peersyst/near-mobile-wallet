import Balance from "module/wallet/component/display/Balance/Balance";
import { getActionLabel } from "module/wallet/component/display/Balance/utils/getActionLabel";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { render } from "test-utils";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} />);
        expect(screen.getByText("100")).toBeDefined();
    });
    test("Renders correctly near", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="token" />);
        expect(screen.getByText("100 NEAR")).toBeDefined();
    });
    test("Renders correctly eur", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="eur" />);
        expect(screen.getByText("100 " + CURRENCY_UNIT["eur"])).toBeDefined();
    });
    test("Renders correctly dollar", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="usd" />);
        expect(screen.getByText("100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
    test("Renders correctly round", () => {
        const screen = render(<Balance action="add" balance={"100"} variant={"h1"} units="usd" />);
        expect(screen.getByText(getActionLabel["add"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
    test("Renders correctly add", () => {
        const screen = render(<Balance action="round" balance={"100"} variant={"h1"} units="usd" />);
        expect(screen.getByText(getActionLabel["round"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
});
