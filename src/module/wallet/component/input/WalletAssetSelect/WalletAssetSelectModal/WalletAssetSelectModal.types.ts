import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { UseModalStateReturn } from "module/common/hook/useModalState";

export type WalletAssetSelectModalProps = Omit<CardNavigatorModalProps, "children" | "navbar" | "defaultOpen"> & {
    hideModal: UseModalStateReturn["hideModal"];
};
