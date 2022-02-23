import { AppearanceProps, SizeType } from "module/common/types";
import { IsotipSizeType } from "../Isotip/Isotip.types";

export type LogoColSizeType = "md" | "lg";

export interface LogoColProps extends Partial<AppearanceProps> {
    size: LogoColSizeType;
}

export type LogoColRelationsType = Record<LogoColSizeType, { gap: number; isotipSize: IsotipSizeType; logotipSize: SizeType }>;
