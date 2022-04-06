import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { theme } from "module/common/style/theme";
import { SelectDAOWalletIcon } from "./SelectDAOWallet.styles";
import { useEffect, useState } from "react";
import useWalletState from "module/wallet/hook/useWalletState";

const SelectDAOWallet = (): JSX.Element => {
    const {
        state: { selectedWallet },
    } = useWalletState();
    
    const [rerender, setRerender] = useState<boolean>(false);
    useEffect(() => {
        setRerender(true);
    }, [selectedWallet]);
    useEffect(() => {
        if (rerender) setRerender(false);
    }, [rerender]);

    return (
        <ThemeProvider theme={theme}>
            {!rerender &&
                <WalletSelector defaultValue={selectedWallet || undefined} updateSelectedWalletState DisplayComponent={<SelectDAOWalletIcon />} />
            }
        </ThemeProvider>
    );
};
export default SelectDAOWallet;
