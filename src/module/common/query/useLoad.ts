import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import WalletController from "module/wallet/utils/WalletController";
import walletState from "../../wallet/state/WalletState";
import { Alert, Linking, Platform } from "react-native";
import { WalletStorage } from "module/wallet/WalletStorage";
import useTranslate from "../hook/useTranslate";
import { config } from "config";

export function useLoad(): boolean {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const [loading, setLoading] = useState(true);
    const setSettingsState = useSetRecoilState(settingsState);
    const setWalletState = useSetRecoilState(walletState);
    const recoverWallets = useRecoverWallets();

    useEffect(() => {
        const getStorage = async () => {
            const settings = { ...defaultSettingsState, ...((await SettingsStorage.getAllSettings()) || {}) };

            try {
                const hasMnemonic = await WalletController.hasMnemonic();
                const isBackupDone = await WalletController.getIsBackupDone();
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
            } catch (e) {
                // If the error was caused by the decryption of backed up data in Android, it means the user reinstalled the app.
                // We can safely clear the storage and start fresh.
                // To test this Android behavior, see this page: https://developer.android.com/identity/data/testingbackup
                // @see https://docs.expo.dev/versions/v52.0.0/sdk/securestore/#android-auto-backup
                // @see https://github.com/expo/expo/issues/23426
                // @see https://github.com/expo/expo/issues/23426#issuecomment-2178534351
                if (
                    e instanceof Error &&
                    Platform.OS === "android" &&
                    e.message === "Could not encrypt/decrypt the value for SecureStore"
                ) {
                    await WalletStorage.clearAll();

                    setSettingsState(settings);

                    setLoading(false);
                } else {
                    Alert.alert(
                        translateError("somethingWentWrongLoadingTheAppTitle"),
                        translateError("somethingWentWrongLoadingTheAppDescription"),
                        [
                            {
                                text: translate("contactUs"),
                                onPress: () => Linking.openURL(config.discordUrl),
                            },
                            {
                                text: translate("close"),
                                style: "cancel",
                            },
                        ],
                    );
                }
            }
        };
        getStorage();
    }, []);
    return loading;
}
