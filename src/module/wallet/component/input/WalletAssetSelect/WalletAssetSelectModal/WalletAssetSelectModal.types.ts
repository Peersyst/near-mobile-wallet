import { CardSelectModalProps } from "module/common/component/feedback/CardSelectModal/CardSelectModal";

export type WalletAssetSelectModalProps = Omit<CardSelectModalProps, "children" | "title">;
