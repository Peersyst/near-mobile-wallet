import { AppearanceProps, DirectionProps, DirectionType, SizeProps, SizeTypes } from "module/common/types";

type T = Record<SizeTypes, { logoSize: number; fontSize: number; gap: number }>;

export type SizeRelationType = Record<DirectionType, T>;

export type LogoProps = Partial<AppearanceProps> & SizeProps & DirectionProps & { showText?: boolean };

export type LogoRootProps = AppearanceProps & { fontSize: number };
