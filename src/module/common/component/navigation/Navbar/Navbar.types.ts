import { AppearanceProps } from "module/common/types";
import { ReactNode } from "react";

export interface NavbarProps extends Partial<AppearanceProps> {
    back?: ReactNode;
    title?: string;
    withLogo?: boolean;
}
