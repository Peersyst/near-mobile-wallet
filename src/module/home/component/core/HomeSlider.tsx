import { PagerView, useTheme } from "@peersyst/react-native-components";
import { alpha } from "@peersyst/react-utils";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import useWalletState from "module/wallet/hook/useWalletState";

const HomeSlider = (): JSX.Element => {
    const {
        state: { wallets, selectedWallet = 0 },
        setSelectedWallet,
    } = useWalletState();
    const { palette: p } = useTheme();
    return (
        <PagerView
            page={selectedWallet}
            onPageSelected={(page) => setSelectedWallet(page)}
            showPageIndicator={true}
            gap={0}
            pagePadding={{ horizontal: 20 }}
            style={{
                marginBottom: 30,
                minHeight: 200,
                pagination: { dot: { backgroundColor: alpha(p.white, 0.5), active: { backgroundColor: p.white } } },
            }}
        >
            {wallets.map((wallet, i) => (
                <WalletCard key={i} wallet={wallet} />
            ))}
            <AddWalletCard />
        </PagerView>
    );
};

export default HomeSlider;
