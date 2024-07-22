import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function ArrowReceiveIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "ArrowReceiveIcon" }}
        >
            <Path d="M17.7188 6.29289C18.0937 6.68342 18.0937 7.31658 17.7188 7.70711L9.75763 16H15.12C15.6502 16 16.08 16.4477 16.08 17C16.08 17.5523 15.6502 18 15.12 18H7.44C6.90981 18 6.48 17.5523 6.48 17V9C6.48 8.44771 6.90981 8 7.44 8C7.97019 8 8.4 8.44771 8.4 9V14.5858L16.3612 6.29289C16.7361 5.90237 17.3439 5.90237 17.7188 6.29289Z" />
        </SvgIcon>
    );
}
