import { translate } from "locale";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import { wallet } from "mocks/wallet";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("WalletCard tests", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(20000), occupiedBalance: BigInt(9600), freeBalance: BigInt(10400) }),
        );
        const screen = render(<WalletCard wallet={wallet} />);

        /**Account header */
        expect(screen.getByText(mockedUseWallet.state.wallets[0].name)).toBeDefined();
        expect(screen.getByTestId("StarIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();

        /**Account Balance */
        await waitFor(() => expect(screen.getByText("10,400")).toBeDefined());
        expect(screen.getByText("000000")).toBeDefined();
        expect(screen.getByText("ckb")).toBeDefined();

        /**Account Buttons */
        expect(screen.getByText(translate("send"))).toBeDefined();
        expect(screen.getByTestId("ReceiveIcon")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
        expect(screen.getByText(translate("receive"))).toBeDefined();
    });
});
