import { render } from "test-utils";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";
import { UseWalletStateMock } from "mocks/common";
import Typography from "module/common/component/display/Typography/Typography";
import { screen } from "@testing-library/react-native";

describe("Tests for BaseWalletCard", () => {
    const { state } = new UseWalletStateMock();
    const wallet = state.wallets[0];

    test("Renders correctly", () => {
        const mockedContent = "content";

        render(
            <BaseWalletCard wallet={wallet}>{{ content: <Typography variant="body2Strong">{mockedContent}</Typography> }}</BaseWalletCard>,
        );

        expect(screen.getAllByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getAllByText(mockedContent)).toBeDefined();
    });
});
