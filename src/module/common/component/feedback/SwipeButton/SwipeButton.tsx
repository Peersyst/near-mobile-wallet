import { ChevronRightIcon } from "icons";
import { SwipeButtonRoot } from "./SwipeButton.styles";
import { SwipeButtonProps } from "./SwipeButton.types";

const SwipeButton = (props: SwipeButtonProps) => {
    return <SwipeButtonRoot thumbContent={<ChevronRightIcon fontSize={24} />} {...props} />;
};
export default SwipeButton;
