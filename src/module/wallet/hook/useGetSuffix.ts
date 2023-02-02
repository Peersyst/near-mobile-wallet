import settingsState from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";
import { useRecoilValue } from "recoil";

export default function useGetSuffix(): string {
    const { network } = useRecoilValue(settingsState);
    return network === Chains.MAINNET ? ".near" : ".testnet";
}
