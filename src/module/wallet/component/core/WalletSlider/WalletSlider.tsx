import useWalletState from "module/wallet/hook/useWalletState";
import { WalletSliderRoot } from "./WalletSlider.styles";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import { Wallet } from "module/wallet/state/WalletState";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

interface BaseWalletSliderProps {
    wallet: Wallet;
}

interface WalletSliderProps {
    Card: (props: BaseWalletSliderProps) => JSX.Element;
    Skeleton?: () => JSX.Element;
}

const WalletSlider = ({ Card, Skeleton }: WalletSliderProps): JSX.Element => {
    const {
        state: { loading, selectedWallet = 0, wallets },
        setSelectedWallet,
    } = useWalletState();

    const handleSelectedWallet = (page: number) => {
        setSelectedWallet(page);
    };

    return (
        <WalletSliderRoot
            page={selectedWallet}
            onPageSelected={handleSelectedWallet}
            showPageIndicator={true}
            gap={0}
            pagePadding={{ horizontal: 20 }}
        >
            {loading && Skeleton ? (
                <DarkThemeProvider>
                    <Skeleton />
                </DarkThemeProvider>
            ) : (
                [wallets.map((wallet) => <Card wallet={wallet} key={wallet.account} />), <AddWalletCard key="add-wallet-card" />]
            )}
        </WalletSliderRoot>
    );
};

export default WalletSlider;
