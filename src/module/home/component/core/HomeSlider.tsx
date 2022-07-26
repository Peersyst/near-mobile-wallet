import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import useWalletState from "module/wallet/hook/useWalletState";
import { HomeSliderRoot } from "./HomeSlider.styles";

const HomeSlider = (): JSX.Element => {
    const {
        state: { wallets, selectedWallet = 0 },
        setSelectedWallet,
    } = useWalletState();

    return (
        <DarkThemeProvider>
            <HomeSliderRoot
                page={selectedWallet}
                onPageSelected={(page) => setSelectedWallet(page)}
                showPageIndicator={true}
                gap={0}
                pagePadding={{ horizontal: 20 }}
            >
                {wallets.map((wallet) => (
                    <WalletCard key={wallet.account} wallet={wallet} />
                ))}
                <AddWalletCard />
            </HomeSliderRoot>
        </DarkThemeProvider>
    );
};

export default HomeSlider;
