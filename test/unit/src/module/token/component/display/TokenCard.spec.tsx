import { token } from "mocks/tokens";
import TokenCard from "module/token/component/display/TokenCard/TokenCard";
import { render } from "test-utils";
import * as useCkbConversion from "module/common/hook/useCkbConversion";

describe("Test for the Token Card", () => {
    test("Renders correctly", () => {
        jest.spyOn(useCkbConversion, "default").mockReturnValue({ value: 10, convertBalance: jest.fn() });
        const screen = render(<TokenCard token={token} />);
        expect(screen.getByText("USDC|eth")).toBeDefined();
        //Balance in CKB
        expect(screen.getByText("20")).toBeDefined();
        //Balance in USD
        expect(screen.getByText("10")).toBeDefined();
    });
});
