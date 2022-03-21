import * as UseWallet from "module/wallet/hook/useWallet";
import * as GetBalance from "module/wallet/mock/getBalance";
import { render, SuccessApiCall } from "test-utils";
import AccountSelector from "module/wallet/component/input/AccountSelector/AccountSelector";
import { mockedUseWallet } from "mocks/useWallet";
import { waitFor } from "@testing-library/react-native";

describe("AccountSelector tests", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWallet, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(GetBalance, "default").mockReturnValue(SuccessApiCall("1"));

        const screen = render(<AccountSelector />);
        expect(screen.getAllByText("Name")).toHaveLength(2);
        await waitFor(() => expect(screen.getAllByText("1")).toHaveLength(2));
        expect(screen.getAllByText("00")).toHaveLength(2);
        expect(screen.getAllByText("CKB")).toHaveLength(2);
    });
});
