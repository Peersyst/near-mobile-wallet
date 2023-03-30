import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();

    useEffect(() => {
        const getStorage = async () => {
            const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };
            const hasPreviousWallet = await recoverWallets(settings.network);
            if (hasPreviousWallet) setSettingsState(settings);
            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
