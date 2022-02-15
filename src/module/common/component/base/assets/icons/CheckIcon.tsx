import React from "react";
import { SvgIcon, SvgIconProps } from "react-native-components";
import { Path } from "react-native-svg";

export function CheckIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "CheckIcon" }}
        >
            <Path d="M7.83738 16.8082L2.35438 11.3252L0 13.6796L7.83738 21.517L24 5.35438L21.6456 3L7.83738 16.8082Z" />
        </SvgIcon>
    );
}
