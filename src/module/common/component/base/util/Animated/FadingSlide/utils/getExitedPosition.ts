import { SlideDirection } from "../../Slide";

export default function getExitedPosition(direction: SlideDirection): number {
    if (direction === "right" || direction === "down") return -20;
    else return 20;
}
