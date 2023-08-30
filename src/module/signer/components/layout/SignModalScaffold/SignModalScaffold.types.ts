import { SwipeButtonProps } from "module/common/component/feedback/SwipeButton/SwipeButton.types";
import { PropsWithChildren } from "react";

type SignModalScaffoldButtonProps = Omit<SwipeButtonProps, "children" | "onSwipe" | "fullWidth">;

export interface SignModalScaffoldProps extends PropsWithChildren {
    onSign: () => void;
    onReject: () => void;
    sign?: SignModalScaffoldButtonProps;
    reject?: SignModalScaffoldButtonProps;
}
