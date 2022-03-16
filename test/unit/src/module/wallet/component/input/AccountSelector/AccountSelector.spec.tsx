import * as UseWallet from "module/wallet/hook/useWallet";
import { render } from "test-utils";
import AccountSelector from "module/wallet/component/input/AccountSelector/AccountSelector";
import { mockedUseWallet } from "mocks/useWallet";

describe("AccountSelector tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);

        const screen = render(<AccountSelector />);
        expect(screen.getAllByText("Name")).toHaveLength(2);
        expect(screen.getAllByText("1")).toHaveLength(2);
        expect(screen.getAllByText("00")).toHaveLength(2);
        expect(screen.getAllByText("CKB")).toHaveLength(2);
    });
});
