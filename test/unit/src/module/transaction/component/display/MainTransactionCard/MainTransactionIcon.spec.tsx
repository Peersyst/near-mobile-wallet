import MainTransactionIcon from "module/transaction/component/display/MainTransactionCard/MainTransactionIcon";
import { render } from "test-utils";

describe("Test for the main tx Icon", () => {
    test("Returns correctly received icon", () => {
        const screen = render(<MainTransactionIcon received={true} />);
        expect(screen.getByTestId("ReceiveIcon"));
    });
    test("Returns correctly send icon", () => {
        const screen = render(<MainTransactionIcon received={false} />);
        expect(screen.getByTestId("SendIcon"));
    });
});
