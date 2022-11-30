import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import useImportWallets from "../hook/useImportWallets";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const [{ network }, setSettingsState] = useRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);
    const importWallets = useImportWallets();
    useEffect(() => {
        const setStorage = async () => {
            await importWallets(network);
            await SettingsStorage.set(defaultSettingsState);
            setSettingsState(defaultSettingsState);
            //After all clean createWalletState
            resetCreateWalletState();
        };
        setTimeout(setStorage, 2000); //TODO: Revise this timeout
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
