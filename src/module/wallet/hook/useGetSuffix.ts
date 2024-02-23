import { Chains } from "module/common/types";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";

export default function useGetSuffix(): string {
    const { network } = useRecoilValue(settingsState);
    return network === Chains.MAINNET ? ".near" : ".testnet";
}
