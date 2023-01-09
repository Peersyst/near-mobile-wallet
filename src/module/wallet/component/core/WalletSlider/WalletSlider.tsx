import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletSliderRoot } from "./WalletSlider.styles";
import AddWalletCard from "module/wallet/component/display/AddWalletCard/AddWalletCard";

interface WalletSliderProps {
    cards: JSX.Element[];
}

const WalletSlider = ({ cards }: WalletSliderProps): JSX.Element => {
    const {
        state: { selectedWallet = 0 },
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
                {cards}
                <AddWalletCard />
            </WalletSliderRoot>
        </DarkThemeProvider>
    );
};

export default WalletSlider;
