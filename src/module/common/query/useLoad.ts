import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { defaultSettingsState } from "module/settings/state/SettingsState";
import useServiceInstanceCreation from "module/wallet/hook/useServiceInstanceCreation";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);
    const setSettingsState = useSetRecoilState(settingsState);
    const createServiceInstance = useServiceInstanceCreation();

    useEffect(() => {
        const getStorage = async () => {
            //Check if there is a previous wallet
            const wallets = await WalletStorage.getWallets();

            //Has already a wallet if not will go to CreateWallet
            if (wallets) {
                setWalletState((state) => ({
                    ...state,
                    hasWallet: true,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    wallets: wallets.map(({ mnemonic, ...wallet }) => wallet).sort((w1, w2) => w1.index - w2.index),
                }));

                //Get the settings from storage and set it to the state
                const settings = (await SettingsStorage.getAllSettings()) || defaultSettingsState;
                setSettingsState(settings);

                for (let i = 0; i < wallets.length; i += 1) {
                    const { testnet, mainnet, mnemonic } = wallets.find((w) => w.index === i)!;
                    await createServiceInstance(i, mnemonic, testnet?.initialState, mainnet?.initialState);
                }

                //Use another thread
                setTimeout(async () => {
                    for (let i = 0; i < serviceInstancesMap.size; i += 1) {
                        await serviceInstancesMap.get(i)?.[settings.network]?.synchronize();
                    }
                });
            }
            setLoading(false);
        };
        getStorage();
    }, []);
    return loading;
}
