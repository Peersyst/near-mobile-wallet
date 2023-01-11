import Typography from "module/common/component/display/Typography/Typography";
import WalletBackupBaseDisplay from "module/wallet/component/core/WalletsBackupModal/WalletBackupBaseDisplayScreen/WalletBackupBaseDisplayScreen";
import { fireEvent, render, screen, translate } from "test-utils";

describe("WalletBackupBaseDisplay", () => {
    test("Renders correctly", () => {
        const mockedOnClose = jest.fn();
        render(
            <WalletBackupBaseDisplay onClose={mockedOnClose} loading={false}>
                <Typography variant="body1Strong">Test</Typography>
            </WalletBackupBaseDisplay>,
        );
        expect(screen.getByText(translate("keep_this_safe"))).toBeDefined();
        expect(screen.getByText("Test")).toBeDefined();
        expect(screen.queryByTestId("ActivityIndicator")).toBeNull();
        const btn = screen.getByText(translate("close"));
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(mockedOnClose).toHaveBeenCalled();
    });
    test("Renders loading correctly", () => {
        render(
            <WalletBackupBaseDisplay onClose={jest.fn()} loading={true}>
                <Typography variant="body1Strong">Test</Typography>
            </WalletBackupBaseDisplay>,
        );
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        expect(screen.queryByText("Test")).toBeNull();
    });
});
