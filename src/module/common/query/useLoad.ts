import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import WalletController from "module/wallet/utils/WalletController";
import walletState from "../../wallet/state/WalletState";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ExpoSecureStore from "expo-secure-store";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const setWalletState = useSetRecoilState(walletState);
    const recoverWallets = useRecoverWallets();

    useEffect(() => {
        const getStorage = async () => {
            try {
                const hasMnemonic = await WalletController.hasMnemonic();
                const isBackupDone = await WalletController.getIsBackupDone();
                const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };
                if (!hasMnemonic) await SettingsStorage.set(settings);
                // Do not await this so the user can enter the app instantly with a loading state
                else {
                    setWalletState((state) => ({
                        ...state,
                        loading: true,
                        hasWallet: true,
                        isBackupDone,
                    }));

                    recoverWallets(settings.network);
                }

                setSettingsState(settings);

                setLoading(false);

                AsyncStorage.getItem("wallet").then((value) => {
                    Alert.alert("wallet", JSON.stringify(value));
                });

                ExpoSecureStore.getItemAsync("wallet_SECURE").then((value) => {
                    Alert.alert("wallet_SECURE", JSON.stringify(value));
                });
            } catch (e) {
                Alert.alert("Error", e instanceof Error ? e.message : JSON.stringify(e));
                AsyncStorage.getItem("wallet").then((value) => {
                    Alert.alert("wallet", JSON.stringify(value));
                });

                ExpoSecureStore.getItemAsync("wallet_SECURE").then((value) => {
                    Alert.alert("wallet_SECURE", JSON.stringify(value));
                });
            }
        };
        getStorage();
    }, []);
    return loading;
}
