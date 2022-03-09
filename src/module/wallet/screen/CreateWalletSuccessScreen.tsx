import { useEffect } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const { navigate } = useNavigation();
    const {
        state: { mnemonic, pin, name },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);

    useEffect(() => {
        WalletStorage.set({ name: name!, pin: pin!, mnemonic: mnemonic! }).then(async () => {
            await new Promise((resolve) => setTimeout(() => resolve(null), 2000));
            setWalletState({ hasWallet: true, isAuthenticated: true, name: name, cells: [] });
            navigate(MainScreens.MAIN);
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
