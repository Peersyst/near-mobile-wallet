import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function LaptopIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "LaptopIcon" }}
        >
            <Path d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V5ZM20 5H4V16H20V5Z" />
            <Path d="M22 20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20C2 19.4477 2.44772 19 3 19L21 19C21.5523 19 22 19.4477 22 20Z" />
        </SvgIcon>
    );
}
