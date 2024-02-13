import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import WalletController from "module/wallet/utils/WalletController";
import { useInitFactories } from "refactor/ui/common/hooks/useInitFactories";
import { useLoadFactories } from "refactor/ui/common/hooks/useLoadFactories";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Manrope_300Light, Manrope_400Regular, Manrope_600SemiBold } from "@expo-google-fonts/manrope";
import { i18nextInitializationPromise } from "refactor/ui/locale";
import { WalletStorage } from "module/wallet/WalletStorage";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const recoverWallets = useRecoverWallets();

    const areFactoriesInitialized = useInitFactories();
    useLoadFactories(areFactoriesInitialized);

    async function handleLoad(): Promise<void> {
        try {
            SplashScreen.preventAutoHideAsync();

            await Promise.all([
                // Load fonts
                Font.loadAsync({
                    Manrope_300Light,
                    Manrope_400Regular,
                    Manrope_600SemiBold,
                }),
                i18nextInitializationPromise,
            ]);

            const hasMnemonic = await WalletController.hasMnemonic();
            const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };

            if (!hasMnemonic) await SettingsStorage.set(settings);
            else await recoverWallets(settings.network);

            setSettingsState(settings);
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            // eslint-disable-next-line no-console
            console.warn(e);
        } finally {
            setLoading(false);
            SplashScreen.hideAsync();
        }
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return loading || !areFactoriesInitialized;
}
