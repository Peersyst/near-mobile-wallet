import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { UseModalWrapperReturn } from "module/common/hook/useModalWrapper";
import { AssetSelectProps } from "./AssetSelect/AssetSelect.types";

export type WalletAssetSelectModalProps = Omit<CardNavigatorModalProps, "children" | "navbar" | "defaultOpen"> & {
    assetSelectProps: AssetSelectProps;
    hideModal: UseModalWrapperReturn["hideModal"];
};

export type WalletAssetSelectProps = AssetSelectProps;
