import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export interface ConfirmPinModalWrapperPropsRenderProps {
    showModal: () => void;
    hideModal: () => void;
}

export type WalletAssetSelectModalProps = Omit<CardNavigatorModalProps, "open" | "children"> & {
    children: (props: ConfirmPinModalWrapperPropsRenderProps) => JSX.Element;
};
