import { SwipeButtonProps } from "module/common/component/feedback/SwipeButton/SwipeButton.types";
import { PropsWithChildren } from "react";

type SignatureScaffoldButtonProps = Omit<SwipeButtonProps, "children" | "onSwipe" | "fullWidth">;

export interface SignatureScaffoldProps extends PropsWithChildren {
    onSign: () => void;
    onReject: () => void;
    sign?: SignatureScaffoldButtonProps;
    reject?: SignatureScaffoldButtonProps;
}
