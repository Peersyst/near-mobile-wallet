import { Dimensions, LayoutRectangle } from "react-native";
import { SlideDirection } from "module/common/component/base/util/Animated/Slide";

export default function getExitedPosition({ x, y, width, height }: LayoutRectangle, direction: SlideDirection): number {
    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
    if (direction === "right") return -x - width;
    else if (direction === "left") return screenWidth - x;
    else if (direction === "up") return screenHeight - y;
    else return -y - height;
}
