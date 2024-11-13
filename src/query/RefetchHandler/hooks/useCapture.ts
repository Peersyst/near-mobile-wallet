import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { NetworkType } from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import useCaptureAccounts from "module/wallet/query/useCaptureAccounts";
import { useEffect, useRef } from "react";

export function useCapture() {
    const prevNetwork = useRef<NetworkType>();
    const prevAccount = useRef<string[]>([]);
    const { state } = useWalletState();
    const { mutate: captureAccounts } = useCaptureAccounts();
    const network = useSelectedNetwork();

    useEffect(() => {
        /**
         * Only capture load_accounts event when the app is loaded for the first time.
         * When the network changes or a new wallet is added, the event will be captured in other hooks.
         */
        if (prevAccount.current.length === 0 && state.wallets.length !== 0 && prevNetwork.current === undefined && network !== undefined) {
            const currentAccounts = state.wallets.map((wallet) => wallet.account);
            prevAccount.current = currentAccounts;
            prevNetwork.current = network;
            captureAccounts();
        }
    }, [state.wallets]);
}
