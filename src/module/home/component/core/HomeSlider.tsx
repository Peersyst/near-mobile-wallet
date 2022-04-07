import PagerView from "module/common/component/layout/PagerView/PagerView";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import useWalletState from "module/wallet/hook/useWalletState";

const HomeSlider = (): JSX.Element => {
    const {
        state: { wallets, selectedWallet },
        setSelectedWallet,
    } = useWalletState();

    return (
        <PagerView
            page={selectedWallet}
            onPageSelected={(page) => setSelectedWallet(page)}
            showPageIndicator
            height="33%"
            gap={0}
            pagePadding={{ horizontal: 20 }}
            style={{ minHeight: 203 }}
        >
            {wallets.map((wallet, i) => (
                <WalletCard key={i} wallet={wallet} />
            ))}
            <AddWalletCard />
        </PagerView>
    );
};

export default HomeSlider;
