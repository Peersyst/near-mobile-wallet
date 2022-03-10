import Balance from "module/wallet/component/display/Balance/Balance";
import { render } from "test-utils";
import { translate } from "locale";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance units={translate("token")} balance={"100.00"} variant={"h1"} />);
        expect(screen.getByText(translate("token"))).toBeDefined();
        expect(screen.getByText("100.")).toBeDefined();
        expect(screen.getByText("00")).toBeDefined();
    });
    test("Renders smallBalance", () => {
        const screen = render(<Balance smallBalance units={"X"} balance={"10,00.00"} variant={"h1"} />);
        const normalFontSize = screen.getByText("10,00.").props.style.fontSize;
        expect(screen.getByText("00").props.style.fontSize).toEqual(normalFontSize * 0.7);
    });
});
