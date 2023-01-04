import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { UseModalWrapperReturn } from "module/common/hook/useModalWrapper";

export type WalletAssetSelectModalProps = Omit<CardNavigatorModalProps, "children" | "navbar" | "defaultOpen"> & {
    hideModal: UseModalWrapperReturn["hideModal"];
};
