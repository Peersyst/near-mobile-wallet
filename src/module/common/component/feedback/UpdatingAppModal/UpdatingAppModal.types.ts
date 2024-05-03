import { LoadingModalProps } from "../LoadingModal/LoadingModal.types";

export interface UpdatingAppModalProps extends Omit<LoadingModalProps, "processingMessage" | "processingDescriptionMessage"> {}
