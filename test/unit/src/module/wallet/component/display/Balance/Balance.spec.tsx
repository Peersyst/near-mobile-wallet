import Balance from "module/wallet/component/display/Balance/Balance";
import { render, translate } from "test-utils";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance units={translate("token")} balance={"100"} decimals={6} variant={"h1"} />);
        expect(screen.getByText(translate("token"))).toBeDefined();
        expect(screen.getByText("100")).toBeDefined();
        expect(screen.getByText("000000")).toBeDefined();
    });
    test("Renders smallBalance", () => {
        const screen = render(<Balance smallBalance units={"X"} balance={"1000"} decimals={6} variant={"h1"} />);
        const normalFontSize = screen.getByText("1,000").props.style.fontSize;
        expect(screen.getByText("000000").props.style.fontSize).toEqual(normalFontSize * 0.7);
    });
});
