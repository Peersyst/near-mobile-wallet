import SelectDaoWallet from "module/dao/component/core/DaoAccountCard/DaoCardHeader/SelectDaoWallet/SelectDaoWallet";
import { fireEvent, render, SuccessApiCall, waitFor } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import createUseWalletStateMock, { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("Test for the SelectDaoWallet", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(20000), occupiedBalance: BigInt(9600), freeBalance: BigInt(14567) }),
        );
        const screen = render(<SelectDaoWallet />);
        await waitFor(() => expect(screen.getAllByText("14,567")).toHaveLength(2));
        expect(screen.getAllByText("14,567")[0].props.style.color).toEqual("#FFFFFF");
        expect(screen.getAllByText("14,567")[1].props.style.color).toEqual("#000000");
    });
    test("Updates global selectedWallet correctly", async () => {
        const setSelectedWallet = jest.fn();
        jest.spyOn(UseWalletState, "default").mockReturnValue(createUseWalletStateMock({ setSelectedWallet }));
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(20000), occupiedBalance: BigInt(9600), freeBalance: BigInt(14567) }),
        );
        const screen = render(<SelectDaoWallet />);
        await waitFor(() => expect(screen.getAllByText("14,567")).toHaveLength(2));
        const walletItem = screen.getAllByText("14,567")[1];
        fireEvent.press(walletItem);
        expect(setSelectedWallet).toBeCalledWith(1);
    });
});
