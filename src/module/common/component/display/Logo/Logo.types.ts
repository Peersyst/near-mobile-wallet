import { AppearanceProps, DirectionProps, DirectionType, SizeType } from "module/common/types";

type T = Record<LogoSizeTypes, { logoSize: number; gap: number }>;

export type SizeRelationType = Record<DirectionType, T>;

export type LogoSizeTypes = SizeType | "xl";

export interface LogoSizeProps {
    size: LogoSizeTypes;
}

export type LogoProps = Partial<AppearanceProps> & LogoSizeProps & DirectionProps & { showText?: boolean };

export type LogoRootProps = AppearanceProps & { fontSize: number };
