import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { render } from "test-utils";
import { translate } from "locale";
import { act, fireEvent } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import createUseWalletStateMock from "mocks/useWalletState";

describe("WalletBackupAdvise", () => {
    test("Renders correctly", () => {
        const handleSelection = jest.fn();
        const useWalletStateMock = createUseWalletStateMock();
        jest.spyOn(UseWalletState, "default").mockReturnValue(useWalletStateMock);

        jest.useFakeTimers();
        const screen = render(<WalletsBackupAdvise onWalletSelected={handleSelection} />);

        expect(screen.getByText(translate("backup_wallet_advise_text"))).toBeDefined();
        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("back_up_now")));
        fireEvent.press(screen.getByText(useWalletStateMock.state.wallets[0].name));
        expect(handleSelection).toHaveBeenCalledWith(0);
        jest.useRealTimers();
    });
});
