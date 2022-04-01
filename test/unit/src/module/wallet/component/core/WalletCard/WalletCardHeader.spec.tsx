import { fireEvent, render } from "test-utils";
import * as Clipboard from "expo-clipboard";
import WalletCardHeader from "module/wallet/component/core/WalletCard/WalletCardHeader/WalletCardHeader";
import * as UseWallet from "module/wallet/hook/useWallet";
import { wallet } from "mocks/wallet";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("WalletCardHeader tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<WalletCardHeader name="my_account" index={0} />);
        expect(screen.getByText("my_account")).toBeDefined();
        expect(screen.getByTestId("EditIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();
    });

    test("Copies correctly", () => {
        jest.spyOn(Clipboard, "setString");
        const screen = render(<WalletCardHeader name="my_account" index={0} />);
        const icon = screen.getByTestId("CopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith("0xMockedAddress");
    });
});
