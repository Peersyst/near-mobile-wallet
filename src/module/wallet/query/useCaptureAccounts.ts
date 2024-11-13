import { NetworkType } from "module/settings/state/SettingsState";
import { usePostHog } from "posthog-react-native";
import { useMutation } from "react-query";
import useWalletState from "../hook/useWalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

export interface UseCaptureAccountsParams {
    accountIds: string[];
    network: NetworkType;
}

const useCaptureAccounts = () => {
    const posthog = usePostHog();
    const {
        state: { wallets },
    } = useWalletState();
    const network = useSelectedNetwork();

    return useMutation(async () => {
        try {
            posthog?.capture("load_accounts", {
                accountIds: wallets.map((wallet) => wallet.account),
                network,
            });
        } catch {}
    });
};

export default useCaptureAccounts;
