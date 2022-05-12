import { token } from "mocks/tokens";
import TokenCard from "module/token/component/display/TokenCard/TokenCard";
import { render } from "test-utils";
import * as useGetTokenPrice from "module/token/query/useGetTokenPrice";
import * as Recoil from "recoil";
describe("Test for the Token Card", () => {
    test("Renders correctly", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fiat: "eur" });
        jest.spyOn(useGetTokenPrice, "useGetTokenPrice").mockReturnValue({ data: 10 } as any);
        const screen = render(<TokenCard token={token} />);
        expect(screen.getByText("Wrapped BTC")).toBeDefined();
        expect(screen.getByText("ForceBridge from BSC")).toBeDefined();
        //Balance in CKB
        expect(screen.getByText("20")).toBeDefined();
        //Balance in EUR
        expect(screen.getByText("200")).toBeDefined();
        expect(screen.getByText("eur")).toBeDefined();
    });
});
