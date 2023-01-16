import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletSliderRoot } from "./WalletSlider.styles";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";
import { Wallet } from "module/wallet/state/WalletState";

interface BaseWalletSliderProps {
    wallet: Wallet;
}

interface WalletSliderProps {
    Card: (props: BaseWalletSliderProps) => JSX.Element;
}

const WalletSlider = ({ Card }: WalletSliderProps): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
        setSelectedWallet,
    } = useWalletState();

    return (
        <DarkThemeProvider>
            <WalletSliderRoot
                page={selectedWallet}
                onPageSelected={(page) => setSelectedWallet(page)}
                showPageIndicator={true}
                gap={0}
                pagePadding={{ horizontal: 20 }}
            >
                {wallets.map((wallet) => (
                    <Card wallet={wallet} key={wallet.account} />
                ))}
                <AddWalletCard />
            </WalletSliderRoot>
        </DarkThemeProvider>
    );
};

export default WalletSlider;
