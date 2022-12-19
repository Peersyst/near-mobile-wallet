import WalletsBackupSelectAccount from "module/wallet/component/core/WalletsBackupModal/WalletsBackupSelectAccount/WalletsBackupSelectAccount";
import { config } from "config";
import { UseWalletSelectorMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";
import * as Recoil from "recoil";

describe("WalletsBackupSelectAccount", () => {
    test("renders correctly", async () => {
        const mockedSubmit = jest.fn();
        const mockedSetState = jest.fn();
        const { wallets } = new UseWalletSelectorMock();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetState);
        render(<WalletsBackupSelectAccount onSubmit={mockedSubmit} />);
        expect(screen.getByText(translate("select_funding_acc"))).toBeDefined();
        await waitFor(() => expect(screen.getAllByText("5 " + config.tokenName)).toHaveLength(wallets.length));
        await waitFor(() => expect(screen.getByText(wallets[0].account)).toBeDefined());
        expect(screen.getByText(wallets[1].account)).toBeDefined();
        expect(screen.getByText(translate("continue"))).toBeDefined();
        await waitFor(() => expect(screen.getByTestId("RadioCheckedIcon")).toBeDefined());
        const btn = screen.getAllByRole("button")[2];
        fireEvent.press(screen.getByTestId("RadioUncheckedIcon"));
        expect(btn).not.toBeDisabled();
        fireEvent.press(btn);
        await waitFor(() => expect(mockedSubmit).toBeCalledTimes(1));
    });
});
