import { Dimensions, LayoutRectangle } from "react-native";
import { SlideDirection } from "module/common/component/base/util/Animated/Slide";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function getExitedPosition(
    { x, y, width, height }: LayoutRectangle | undefined = { x: 0, y: 0, width: screenWidth, height: screenHeight },
    direction: SlideDirection,
): number {
    if (direction === "right") return -x - width;
    else if (direction === "left") return screenWidth - x;
    else if (direction === "up") return screenHeight - y;
    else return -y - height;
}
