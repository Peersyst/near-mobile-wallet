import PagerView from "module/common/component/layout/PagerView/PagerView";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import useWalletState from "module/wallet/hook/useWalletState";
import useCkbSync from "module/wallet/hook/useCkbSync";
import { useEffect } from "react";

const HomeSlider = (): JSX.Element => {
    const {
        state: { wallets, selectedWallet },
        setSelectedWallet,
    } = useWalletState();
    const { synchronizing, synchronize } = useCkbSync(selectedWallet);

    useEffect(() => {
        if (!synchronizing) synchronize();
    }, [selectedWallet]);

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
