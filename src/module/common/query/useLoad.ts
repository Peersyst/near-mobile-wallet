import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import WalletController from "module/wallet/utils/WalletController";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();

    useEffect(() => {
        const getStorage = async () => {
            const hasMnemonic = await WalletController.hasMnemonic();
            const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };

            if (!hasMnemonic) await SettingsStorage.set(settings);
            else await recoverWallets(settings.network);

            setSettingsState(settings);

            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
