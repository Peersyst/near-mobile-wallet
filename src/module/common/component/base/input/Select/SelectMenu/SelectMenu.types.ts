import { ReactElement, ReactNode } from "react";
import { SelectItem } from "../SelectItem";
import { ViewStyle } from "react-native";

export interface SelectMenuProps {
    /**
     * Menu is open
     */
    open: boolean;
    /**
     * Menu style
     */
    style?: ViewStyle;
    /**
     * Header element
     */
    header?: ReactNode;
    /**
     * Footer element
     */
    footer?: ReactNode;
    /**
     * Menu options and mask
     */
    children: ReactElement<typeof SelectItem> | ReactElement<typeof SelectItem>[] | undefined;
}

export interface SelectItemsViewProps {
    itemCount: number;
}
