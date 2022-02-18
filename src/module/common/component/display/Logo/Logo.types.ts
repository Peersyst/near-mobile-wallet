import { AppearanceProps, DirectionProps, DirectionType, SizeProps, SizeTypes } from "module/common/types";

export type sizeRelationProps = Record<DirectionType,Record<SizeTypes, {logoSize: number, fontSize: number, gap: number}>>

export type LogoProps = Partial<AppearanceProps> & SizeProps & DirectionProps & {
    showText?: boolean;
};

export type LogoRootProps = AppearanceProps & { fontSize: number }