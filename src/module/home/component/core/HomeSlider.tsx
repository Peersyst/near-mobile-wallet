import { PagerView } from "@peersyst/react-native-components";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import useWalletState from "module/wallet/hook/useWalletState";

const HomeSlider = (): JSX.Element => {
    const {
        state: { wallets, selectedWallet = 0 },
        setSelectedWallet,
    } = useWalletState();

    return (
        <PagerView
            page={selectedWallet}
            onPageSelected={(page) => setSelectedWallet(page)}
            showPageIndicator
            gap={0}
            height="33%"
            pagePadding={{ horizontal: 20 }}
            style={{ minHeight: 180 }}
        >
            {wallets.map((wallet, i) => (
                <WalletCard key={i} wallet={wallet} />
            ))}
            <AddWalletCard />
        </PagerView>
    );
};

export default HomeSlider;
