import { usePostHog } from "posthog-react-native";
import { useMutation } from "react-query";
import useWalletState from "../../wallet/hook/useWalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useCaptureAccounts = () => {
    const posthog = usePostHog();
    const {
        state: { wallets },
    } = useWalletState();
    const network = useSelectedNetwork();

    return useMutation(async () => {
        try {
            posthog?.capture("load_accounts", {
                account_ids: wallets.map((wallet) => wallet.account),
                network,
            });
        } catch {}
    });
};

export default useCaptureAccounts;
