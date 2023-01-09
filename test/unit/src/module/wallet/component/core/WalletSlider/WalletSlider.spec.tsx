import WalletSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import { render, translate } from "test-utils";
import { UseWalletStateMock } from "mocks/common";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import { capitalize } from "@peersyst/react-utils";
import StakingCard from "module/staking/component/core/StakingCard/StakingCard";

describe("Tests for WalletSlider component", () => {
    const { state } = new UseWalletStateMock();

    test("Renders correctly with WalletCards", () => {
        const mockedCards = state.wallets.map((wallet) => <WalletCard wallet={wallet} key={wallet.account} />);
        const screen = render(<WalletSlider cards={mockedCards} />);

        expect(screen.getAllByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getAllByText(capitalize(translate("send")))).toBeDefined();
        expect(screen.getAllByText(capitalize(translate("receive")))).toBeDefined();
    });

    test("Renders correctly with StakingCards", () => {
        const mockedCards = state.wallets.map((wallet) => <StakingCard wallet={wallet} key={wallet.account} />);
        const screen = render(<WalletSlider cards={mockedCards} />);

        expect(screen.getAllByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getAllByText(capitalize(translate("stakeMyTokens")))).toBeDefined();
    });
});
