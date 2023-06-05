import { useTranslate } from "module/common/hook/useTranslate";
import { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import useExplorerButton from "./useExplorerButton/useExplorerButton";
import ExternalLinkButton, { ExternalLinkButtonProps } from "module/common/component/input/ExternalLinkButton/ExternalLinkButton";

export interface ExplorerButtonProps extends Omit<ExternalLinkButtonProps, "url" | "label"> {
    type: BlockchainAddressProps["type"];
    address: BlockchainAddressProps["address"];
    label?: ExternalLinkButtonProps["label"];
}

function ExplorerButton({ label, type, address, ...rest }: ExplorerButtonProps) {
    const translate = useTranslate();
    const { url } = useExplorerButton({ type, address });

    return <ExternalLinkButton label={label || translate("seeInExplorer")} url={url} {...rest} />;
}

export default ExplorerButton;
