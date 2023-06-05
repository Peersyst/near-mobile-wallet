import { useComponentConfig } from "@peersyst/react-native-components";
import useBlockchainAddressType from "module/common/component/display/BlockchainAddress/useBlockchainAddressType/useBlockchainAddressType";
import { useTranslate } from "module/common/hook/useTranslate";
import { ShareContent } from "react-native";

export default function useShareTxHashButton(txHash: string) {
    const translate = useTranslate();

    const type = useBlockchainAddressType("tx");
    const { blockchainLinks } = useComponentConfig("BlockchainAddress");
    const link = blockchainLinks[type] + txHash;

    const shareContent: ShareContent = {
        message: translate("shareTxText", { link }),
    };

    return {
        shareContent,
    };
}
