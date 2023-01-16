import { ReactNode } from "react";
import { StepsProps } from "module/common/component/display/Steps/Steps";

export interface NavbarProps {
    back?: ReactNode;
    onBack?: () => unknown;
    title?: string;
    steps?: StepsProps;
}
