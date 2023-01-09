import WalletSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import useWalletState from "module/wallet/hook/useWalletState";
import StakingCard from "module/staking/component/core/StakingCard/StakingCard";

const StakingSlider = (): JSX.Element => {
    const {
        state: { wallets },
    } = useWalletState();

    const cards = wallets.map((wallet) => <StakingCard wallet={wallet} key={wallet.account} />);

    return <WalletSlider cards={cards} />;
};

export default StakingSlider;
