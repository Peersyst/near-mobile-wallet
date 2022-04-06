import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { theme } from "module/common/style/theme";
import { SelectDAOWalletIcon } from "./SelectDAOWallet.styles";

const SelectDAOWallet = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <WalletSelector updateSelectedWalletState DisplayComponent={<SelectDAOWalletIcon />} />
        </ThemeProvider>
    );
};
export default SelectDAOWallet;
