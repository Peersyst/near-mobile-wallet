import SummaryField from "module/transaction/component/display/SummaryField/SummaryField";
import { render, translate } from "test-utils";

describe("Test for the SummaryField component", () => {
    test("Renders correctly", () => {
        const text = "content";
        const screen = render(<SummaryField label={translate("from")}>{text}</SummaryField>);
        expect(screen.getByText(translate("from") + ":")).toBeDefined();
        expect(screen.getByText(text)).toBeDefined();
    });
});
