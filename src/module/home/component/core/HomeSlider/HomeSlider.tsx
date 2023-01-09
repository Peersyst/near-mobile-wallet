import WalletSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import useWalletState from "module/wallet/hook/useWalletState";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";

const HomeSlider = (): JSX.Element => {
    const {
        state: { wallets },
    } = useWalletState();

    const cards = wallets.map((wallet) => <WalletCard wallet={wallet} key={wallet.account} />);

    return <WalletSlider cards={cards} />;
};

export default HomeSlider;
