import * as UseWallet from "module/wallet/hook/useWallet";
import { render } from "test-utils";
import AccountSelector from "module/wallet/component/input/AccountSelector/AccountSelector";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";

describe("AccountSelector tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWallet, "default").mockReturnValue({
            state: {
                hasWallet: true,
                isAuthenticated: true,
                isFirstTime: false,
                cells: [{ address: "address", balance: "1", name: "Name" }],
                selectedAccount: 0,
            },
            setAuthenticated: jest.fn(),
            setCells: jest.fn(),
            setSelectedAccount: jest.fn(),
            setState: jest.fn(),
            reset: jest.fn(),
        });

        const screen = render(<AccountSelector />);
        const select = screen.getByText(translate("no_account_selected"));
        fireEvent.press(select);
        const myAccount = screen.getByText("Name");
        fireEvent.press(myAccount);
        expect(screen.getAllByText("Name")).toHaveLength(2);
        expect(screen.getAllByText("1")).toHaveLength(2);
        expect(screen.getAllByText("00")).toHaveLength(2);
        expect(screen.getAllByText("CKB")).toHaveLength(2);
    });
});
