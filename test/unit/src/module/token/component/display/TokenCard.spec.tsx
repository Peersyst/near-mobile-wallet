import TokenCard from "module/token/component/display/TokenCard/TokenCard";
import { render } from "test-utils";
import * as useGetTokenPrice from "module/token/query/useGetTokenPrice";
import * as Recoil from "recoil";

describe("Test for the Token Card", () => {
    test("Renders correctly", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fiat: "eur" });
        jest.spyOn(useGetTokenPrice, "useGetTokenPrice").mockReturnValue({ data: 10 } as any);
        const screen = render(
            <TokenCard token={{ metadata: { name: "Bitcoin", symbol: "BTC", decimals: 8, imageUri: "" }, balance: BigInt(200) }} />,
        );
        expect(screen.getByText("Bitcoin")).toBeDefined();
        expect(screen.getByText("200 BTC")).toBeDefined();
    });
});
