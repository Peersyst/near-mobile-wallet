import { NearIcon } from "icons";

export interface CardIconProps {
    Icon: typeof NearIcon;
    active: boolean;
    darkInactive?: boolean;
}

export type CardIconRootProps = Pick<CardIconProps, "active">;

export type InnerCardIconProps = Pick<CardIconProps, "active" | "darkInactive">;
