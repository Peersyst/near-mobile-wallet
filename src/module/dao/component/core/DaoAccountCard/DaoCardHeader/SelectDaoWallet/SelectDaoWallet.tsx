import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { theme } from "module/common/style/theme";
import { SelectDaoWalletIcon } from "./SelectDaoWallet.styles";


const SelectDaoWallet = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <WalletSelector updateSelectedWalletOnClose DisplayComponent={<SelectDaoWalletIcon />} />
        </ThemeProvider>
    );
};
export default SelectDaoWallet;
