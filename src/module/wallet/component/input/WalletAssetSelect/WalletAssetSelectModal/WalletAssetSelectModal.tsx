import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import { useTranslate } from "module/common/hook/useTranslate";
import AssetSelect from "../InnerAssetSelect/InnerAssetSelect";
import { WalletAssetSelectModalProps } from "./WalletAssetSelectModal.types";

export const WalletAssetSelectModal = ({ style, ...rest }: WalletAssetSelectModalProps) => {
    const translate = useTranslate();
    return (
        <CardSelectModal title={translate("choose_what_to_send")} style={{ minHeight: 280, ...style }} {...rest}>
            <AssetSelect />
        </CardSelectModal>
    );
};
