import { AppearanceProps, DirectionProps, DirectionType, SizeProps, SizeType } from "module/common/types";

type T = Record<SizeType, { logoSize: number; fontSize: number; gap: number }>;

export type SizeRelationType = Record<DirectionType, T>;

export type LogoProps = Partial<AppearanceProps> & SizeProps & DirectionProps & { showText?: boolean };

export type LogoRootProps = AppearanceProps & { fontSize: number };
