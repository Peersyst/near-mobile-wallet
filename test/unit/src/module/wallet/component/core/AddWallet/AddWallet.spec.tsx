import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import Recoil from "recoil";
import { render } from "test-utils";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";

describe("AddWallet tests", () => {
    test("Renders correctly", () => {
        const setColorIndex = jest.fn();
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: undefined, pin: undefined, mnemonic: undefined, colorIndex: undefined },
            setName: jest.fn(),
            setPin: jest.fn(),
            setMnemonic: jest.fn(),
            setColorIndex,
        });
        const resetCreateWalletState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetCreateWalletState);

        const screen = render(<AddWallet />);

        expect(setColorIndex).toHaveBeenCalled();
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(8); // 6 from color picker, create wallet and import wallet
        expect(screen.getByText(translate("create_a_wallet"))).toBeDefined();
        expect(screen.getByText(translate("import_a_wallet"))).toBeDefined();

        fireEvent.press(buttons[1]);
        expect(setColorIndex).toHaveBeenCalledWith(1);
    });
});
