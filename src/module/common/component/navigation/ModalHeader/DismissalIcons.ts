import { ChevronDownIcon, ChevronUpIcon, CrossIcon } from "icons";
import { ModalHeaderDismissal } from "./ModalHeader.types";

export const DISMISSAL_ICONS: Record<ModalHeaderDismissal, typeof ChevronDownIcon> = {
    hide: ChevronUpIcon,
    close: CrossIcon,
};
