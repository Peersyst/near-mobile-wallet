import OrderSuccess from "module/fiatorders/components/feedback/OrderSuccess/OrderSuccess";
import { render, screen } from "test-utils";

describe("OrderSuccess test", () => {
    test("Renders correctly", () => {
        const title = "PurchaseOK";
        const subTitle = "Subtitle";
        render(<OrderSuccess title={title} subtitle={subTitle} />);
        expect(screen.getByText(title)).toBeDefined();
        expect(screen.getByText(subTitle)).toBeDefined();
        expect(screen.getByTestId("SuccessIcon"));
    });
});
