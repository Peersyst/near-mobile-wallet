export type Appearance = "light" | "dark";

export type DirectionType = "horizontal" | "vertical";

export type SizeType = "sm" | "md" | "lg";

export interface AppearanceProps {
    appearance: Appearance;
}

export interface DirectionProps {
    direction: DirectionType;
}

export interface SizeProps {
    size: SizeType;
}
