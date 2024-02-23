import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Rect } from "react-native-svg";

export function SlashIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "SlashIcon" }}
        >
            <Rect x="6" y="22.5713" width="24" height="2" transform="rotate(-64 6 22.5713)" fillOpacity="0.12" />
        </SvgIcon>
    );
}
