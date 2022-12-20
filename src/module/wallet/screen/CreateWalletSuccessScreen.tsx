import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import useImportWallets from "../hook/useImportWallets";
import { InteractionManager } from "react-native";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const [{ network }] = useRecoilState(settingsState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);
    const importWallets = useImportWallets();
    useEffect(() => {
        const setStorage = async () => {
            await SettingsStorage.set(defaultSettingsState);
            await importWallets(network);
            //After all clean createWalletState
            resetCreateWalletState();
        };
        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                setStorage();
            });
        }, 500);
    }, []);

    return <></>;
};

export default CreateWalletSuccessScreen;
