import * as UseWalletState from "module/wallet/hook/useWalletState";
import { render, SuccessApiCall } from "test-utils";
import { waitFor } from "@testing-library/react-native";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("WalletSelector tests", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(1), occupiedBalance: BigInt(0), freeBalance: BigInt(1) }),
        );

        const screen = render(<WalletSelector />);
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        await waitFor(() => expect(screen.getAllByText("1")).toHaveLength(3));
        expect(screen.getAllByText("00")).toHaveLength(3);
        expect(screen.getAllByText("CKB")).toHaveLength(3);
    });
});
