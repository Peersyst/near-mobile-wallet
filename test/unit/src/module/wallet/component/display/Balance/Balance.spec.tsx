import Balance from "module/wallet/component/display/Balance/Balance";
import { render } from "test-utils";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} />);
        expect(screen.getByText("100")).toBeDefined();
    });
    test("Renders correctly when loading", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} isLoading />);
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
    });
});
