import { UseModalStateReturn } from "module/common/hook/useModalState";

export interface ChangeNetworkModalProps {
    children: (props: Omit<UseModalStateReturn, "open">) => JSX.Element;
}
