import { SelectOption } from "@peersyst/react-native-components";
import { DAppTag } from "../../../display/DApp/DApp.types";
import { DAppTagOption } from "../DAppTagSelect.types";
import { useTranslate } from "module/common/hook/useTranslate";

export default function useDAppTagSelectOptions(): SelectOption<DAppTagOption>[] {
    const translate = useTranslate();

    const options: SelectOption<DAppTagOption>[] = [
        {
            label: translate("all"),
            value: "all",
        },
        {
            label: DAppTag.DEX,
            value: DAppTag.DEX,
        },
        {
            label: DAppTag.BRIDGE,
            value: DAppTag.BRIDGE,
        },
        {
            label: DAppTag.LIQUID_STAKING,
            value: DAppTag.LIQUID_STAKING,
        },
        {
            label: DAppTag.LEARNING,
            value: DAppTag.LEARNING,
        },
        {
            label: DAppTag.SOCIAL,
            value: DAppTag.SOCIAL,
        },
        {
            label: DAppTag.LENDING,
            value: DAppTag.LENDING,
        },
        {
            label: DAppTag.NFT_MARKETPLACE,
            value: DAppTag.NFT_MARKETPLACE,
        },
    ];

    const parsedOptions = options.map((option) => ({
        ...option,
        label: option.label !== translate("all") ? `#${option.label}` : option.label,
    }));
    return parsedOptions;
}
