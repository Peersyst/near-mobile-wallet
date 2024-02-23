import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import WalletController from "module/wallet/utils/WalletController";
import walletState from "../../wallet/state/WalletState";
import { useInitFactories } from "refactor/ui/common/hooks/useInitFactories";
import { useLoadFactories } from "refactor/ui/common/hooks/useLoadFactories";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Manrope_300Light, Manrope_400Regular, Manrope_600SemiBold } from "@expo-google-fonts/manrope";
import { i18nextInitializationPromise } from "refactor/ui/locale";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const setWalletState = useSetRecoilState(walletState);
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
            // <<< refactor
            const storedSettings = await ControllerFactory.settingsController.getAllSettings();
            // refactor >>>

            const settings = { ...defaultSettingsState, ...(storedSettings || {}) };

            // <<< refactor
            if (!hasMnemonic) await ControllerFactory.settingsController.set(settings);
            // refactor >>>
            // Do not await this so the user can enter the app instantly with a loading state
            else {
                setWalletState((state) => ({
                    ...state,
                    loading: true,
                    hasWallet: true,
                }));

                recoverWallets(settings.network);
            }

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
