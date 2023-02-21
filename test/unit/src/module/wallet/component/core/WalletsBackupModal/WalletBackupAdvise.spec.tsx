import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { render, translate } from "test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { AccountBalanceMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import * as Recoil from "recoil";

describe("WalletBackupAdvise", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    new UseWalletStateMock();

    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", async () => {
        const handleSubmit = jest.fn();
        const mockedSetState = jest.fn();
        const accountBalance = new AccountBalanceMock({ total: "1", staked: "0", available: "1" });

        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetState);

        render(<WalletsBackupAdvise onSubmit={handleSubmit} />);

        expect(screen.getByText(translate("keep_this_safe"))).toBeDefined();
        expect(screen.getByText(translate("backup_wallet_advise_text"))).toBeDefined();
        expect(screen.getByText(translate("backup_wallet_advise_text_2"))).toBeDefined();
        expect(screen.getByText(translate("export_mnemonic"))).toBeDefined();
        expect(screen.getByText(translate("export_private_key"))).toBeDefined();
        expect(screen.queryByText(translate("confirm_your_pin"))).toBeNull();
    });

    test("Export mnemonic", async () => {
        const handleSubmit = jest.fn();
        const mockedSetState = jest.fn();
        const accountBalance = new AccountBalanceMock({ total: "1", staked: "0", available: "1" });

        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetState);

        render(<WalletsBackupAdvise onSubmit={handleSubmit} />);
        const mnemonicBtn = screen.getByText(translate("export_mnemonic"));
        expect(screen.queryByText(translate("confirm_your_pin"))).toBeNull();
        expect(mnemonicBtn).toBeDefined();
        fireEvent.press(mnemonicBtn);
        expect(mockedSetState).toBeCalledWith({ method: "mnemonic" });
        //Displays modal
        await waitFor(() => expect(screen.getByText(translate("confirm_your_pin"))).toBeDefined());
    });

    test("Export privatekey", async () => {
        const handleSubmit = jest.fn();
        const mockedSetState = jest.fn();
        const accountBalance = new AccountBalanceMock({ total: "1", staked: "0", available: "1" });

        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetState);

        render(<WalletsBackupAdvise onSubmit={handleSubmit} />);
        const privateKeyBtn = screen.getByText(translate("export_private_key"));
        expect(screen.queryByText(translate("confirm_your_pin"))).toBeNull();
        expect(privateKeyBtn).toBeDefined();
        fireEvent.press(privateKeyBtn);
        expect(mockedSetState).toBeCalledWith({ method: "privateKey" });
        //Displays modal
        await waitFor(() => expect(screen.getByText(translate("confirm_your_pin"))).toBeDefined());
    });
});
