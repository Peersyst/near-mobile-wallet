import TokenCard from "module/token/component/display/TokenCard/TokenCard";
import { render } from "test-utils";
import * as Recoil from "recoil";
import { TokenMock } from "test-mocks";

describe("Test for the Token Card", () => {
    test("Renders correctly", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fiat: "eur" });
        const token = new TokenMock();
        const screen = render(<TokenCard token={token} />);
        expect(screen.getByText(token.metadata.name)).toBeDefined();
        expect(screen.getByText(token.balance.toString() + " " + token.metadata.symbol)).toBeDefined();
    });
});
